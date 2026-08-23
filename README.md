# Clearpath

## About this project

A technical case study built as a portfolio/interview piece modeled on [Clearpath](https://www.myclearpath.com/), a multi-tenant SaaS platform for medical imaging and records sharing used by 1,000+ health systems and imaging centers. The application (patient management, imaging orders, radiologist-signed reports) and the surrounding infrastructure are built to reflect decisions a team in that domain would actually have to make — patient data in transit, background processing, audit trails, and observability, all with HIPAA in mind.

### Backend

- **Laravel 13** / PHP 8.4, layered architecture per feature: `Controller → Service → Repository`, each layer depending on the one below through an interface bound via `#[Bind]` (dependency inversion, no manual service provider wiring)
- **API versioning**: every API route lives under `/api/v1/...` — the clinic-facing web app and a future patient-facing client can evolve independently once a `v2` is ever needed, without a breaking change to whoever's already integrated
- **Authorization**: Policy classes + route middleware (`can:` gates), role-based (e.g. radiologist-only actions)
- **Validation & responses**: Form Requests for input validation, API Resources for response shaping — no ad-hoc array building in controllers
- **Domain Events**: `PatientCreated` / `PatientUpdated` / `PatientDeleted`, dispatched from the Service layer and consumed by queued Listeners — audit logging is fully decoupled from the request/response cycle. Events carry a lightweight model reference (`SerializesModels`), not the serialized patient record, so PHI isn't duplicated into the queue payload
- **Value Objects**: structured PII fields (`phone`, `email`, `medical_record_number`) are never a raw string — each is a `App\ValueObjects` class that validates its own format in the constructor, wired to the model via a custom Eloquent cast (`App\Casts`). Invalid data can't reach the database through any code path, not just the HTTP layer
- **Multi-tenancy**: every clinical model (`Patient`, `Physician`, `ImagingOrder`, `Study`, `Report`) is scoped to a `Tenant` via a shared `BelongsToTenant` trait — a global Eloquent scope filters every query, and a `creating` hook stamps new records, both driven by a request-scoped `CurrentTenant` singleton set from Laravel's own `Authenticated` event. No Controller, Service, or Repository has to remember to filter by tenant; cross-tenant record access resolves to a 404, not a 403, so it doesn't confirm another tenant's data even exists
- **Testing**: PHPUnit (unit + feature, factories, both happy and failure paths) with the queue and log channels forced to safe, isolated drivers in CI — tests never touch a real external service
- **Static analysis & security scanning**: self-hosted SonarQube (Community Edition), scanning PHP and TypeScript for bugs, vulnerabilities, and code smells; Larastan for type-level static analysis

### Frontend

- **React 19** + **TypeScript**, via **Inertia.js v3** — no separate API layer for the web client
- Per-feature structure: isolated components, hooks, and a thin HTTP service layer that's the only place aware of raw response shape (centralized `ValidationError` handling for 422s)
- Vitest + Testing Library, mirroring the backend's happy/failure/edge-case coverage bar

### Audit trail: same architecture, two backing implementations

Every patient mutation produces an auditable event. Where that event ends up is swapped entirely through environment variables — the application code never changes:

| | Production | Local / open-source equivalent |
|---|---|---|
| Queue | Amazon SQS (FIFO, per-patient message grouping) | Redis |
| Log storage & search | AWS CloudWatch Logs | Elasticsearch + Kibana |

The AWS side isn't a toy integration: the SQS queue and its dead-letter queue are FIFO with content-based deduplication, encrypted at rest via a KMS key, and the IAM policy is scoped to exactly the actions and resource ARNs the application uses — nothing broader. Redis/Elasticsearch exist so the same architecture can be evaluated without an AWS account, since this is a portfolio project, not a funded product.

Two categories of events feed this trail, with different delivery guarantees on purpose:

- **Data mutations** (patient created/updated/deleted) go through Domain Events consumed by queued Listeners, decoupled from the request/response cycle. Updates log *which fields changed* (names only, never values) plus the actor's user id and IP — enough to answer "who touched this record and what did they change" without a value ever leaving the database. If the queue backend is down, the job simply retries — audit-trail delivery failures stay visible instead of being silently dropped.
- **Security events** (authorization denials via a `Gate::after` hook, failed login attempts via Laravel's own `Auth\Events\Failed`) are logged synchronously, in the request itself — an active attack shouldn't wait on a queue worker to become visible. To keep that synchronous path from taking the app down if the log backend is unreachable, these writes are wrapped so a logging failure degrades to "this one event wasn't recorded," never to a 500 for the user.

Both categories land in the same place — same `LOG_STACK` switch, same Kibana/CloudWatch views — the difference is only in how the write gets there.

### Roadmap

Repository Pattern, Domain Events, Value Objects, API versioning, and multi-tenant data isolation are implemented; the following build on the same conventions and are planned next: self-service **company registration** (a public sign-up creates a `Tenant` and its first admin `User` together) and **team invitations** (an admin invites teammates by email with a role attached to the invite, rather than the registrant self-selecting one), **Swagger/OpenAPI** documentation, and a **BFF** layer for a second client — a patient-facing app consuming the clinic's API, matching Clearpath's real business model where each health system/imaging center is a tenant with its own patients and staff.

---

## Running the project

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running. Redis and Elasticsearch run in Docker and are required for the app to work — see [Day-to-day development](#day-to-day-development)
- **At least 6GB of memory allocated to Docker Desktop.** Elasticsearch runs alongside Postgres and Redis at all times now, and SonarQube/Kibana add more on top of that when you run them. Check/change this under Docker Desktop → **Settings → Resources → Memory**
- **Windows:** Docker Desktop requires the WSL2 backend (set up automatically on install). Run the setup command below from a **WSL2 terminal** or **Git Bash** — it's a bash script and won't run directly from PowerShell or cmd.exe

### Quick start

```bash
./bin/setup.sh
```

This single command:

1. Creates your `.env` file
2. Builds and starts the app, queue worker, Postgres, Redis, and Elasticsearch containers
3. Installs PHP and JS dependencies, generates the app key, runs migrations, builds frontend assets
4. Starts SonarQube just long enough to generate a token and run one full analysis, then stops it again

When it finishes: **http://localhost:8000**

### Day-to-day development

Two ways to run the app day-to-day — pick whichever fits:

**Native**, if you have PHP, Composer, and Node installed:

```bash
composer run dev
```

Runs the server, queue worker, and bundler on your machine. **Docker still needs to be running** even in this mode, because that's where Redis and Elasticsearch live (`docker compose up -d` brings them up without rebuilding anything). Patient create/update/delete dispatches a Domain Event to a queued Listener, and *putting a job on the queue* happens synchronously, inside the request — so if Redis isn't reachable, editing a patient fails right there, not just the audit log. Elasticsearch runs by default for a softer reason: it's where the queued Listener actually writes the log once processed, and since Docker has to be up for Redis regardless, there's no upside to gating it behind a manual step too. Kibana is different — it's just a viewer on top of Elasticsearch, plays no part in whether logging works, and stays on demand (see the table below).

**Fully in Docker**, no local PHP/Node needed:

```bash
docker compose up -d
```

The `laravel.test` container serves the app, and a dedicated `queue` container (same image, running `queue:listen`) processes the audit-log Listeners — so this alone is a complete way to run the app, nothing else to start. Asset changes need `docker compose exec laravel.test npm run build` since there's no Vite dev server running this way.

**Don't run both modes at once** — `laravel.test` and `php artisan serve` both bind port 8000. If you switch from Docker back to native, stop the app/queue containers first: `docker compose stop laravel.test queue` (Redis and Elasticsearch can stay up either way).

Postgres is the one exception: `compose.yaml` includes a `pgsql` container so the project also works for people with no local Postgres, but if you already have one running natively (Homebrew, Postgres.app, whatever), just point `DB_HOST`/`DB_USERNAME`/`DB_PASSWORD` in your `.env` at that instead — you don't need two Postgres instances. In that case you can `docker compose stop pgsql` and skip it entirely; the app doesn't care which one it's talking to.

Neither mode starts SonarQube — that one really is optional, and stays a manual step.

### What runs automatically vs. on demand

| Service | Starts automatically? | Bring it up with |
|---|---|---|
| App + queue worker + Postgres + Redis | Yes (skip `pgsql` if you already run Postgres natively — see above) | `docker compose up -d` |
| Elasticsearch | Yes | `docker compose up -d` |
| Kibana | No (it's just a viewer, not needed for logging to work) | `docker compose --profile kibana up -d kibana` |
| SonarQube | No (only runs once during `bin/setup.sh`, then stops) | `docker compose --profile sonar up -d sonarqube sonarqube-db` |

### Running a SonarQube analysis manually

```bash
docker compose --profile sonar up -d sonarqube sonarqube-db
docker compose --profile sonar --profile scan run --rm sonar-scanner -Dsonar.token=$(cat .sonar-token)
```

Dashboard: http://localhost:9000 (`admin` / `admin`).

### Viewing patient audit logs locally (Redis + Elasticsearch/Kibana)

Redis and Elasticsearch run by default (`LOG_STACK=single,elasticsearch` out of the box) — logging itself needs nothing extra. Kibana is only for browsing what's already there:

1. Trigger a patient create/update/delete (through the app, or `php artisan queue:work redis --once`)
2. `docker compose --profile kibana up -d kibana`
3. Open http://localhost:5601 → **Discover** → create a Data View for the `clearpath-patients` index

### Testing the production path (SQS + CloudWatch) against your own AWS account

Not needed to run the project — for reference, or if you want to try it yourself:

1. Create an SQS FIFO queue plus a dead-letter queue, and a CloudWatch Log Group
2. Create an IAM user scoped only to those specific resources (see `config/queue.php` / `config/logging.php` for exactly which actions are used)
3. Fill in `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `SQS_PREFIX`, `SQS_QUEUE`, `CLOUDWATCH_LOG_GROUP` in your own `.env`
4. Set `QUEUE_CONNECTION=sqs` and `LOG_STACK=single,cloudwatch`

### Running tests

```bash
php artisan test --compact          # PHP (PHPUnit)
npm run test                        # JS/TS (Vitest)
composer run ci:check               # everything CI runs: lint, formatting, types, PHP tests, JS tests
```
