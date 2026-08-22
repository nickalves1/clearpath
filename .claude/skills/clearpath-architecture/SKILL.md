---
name: clearpath-architecture
description: "Apply this skill whenever building or modifying a CRUD/resource feature in the Clearpath project — backend (Controller, Service, Repository, Model, migration, Form Request, Policy) or frontend (React components, hooks, services under resources/js/features). Also apply when adding or changing an API endpoint, when a state change should fire a domain event, when a structured scalar field (phone, email, medical record number) needs a Value Object, or when documenting an endpoint for Swagger/OpenAPI. These are Clearpath-specific conventions layered on top of general Laravel best practices — use alongside laravel-best-practices, not instead of it."
license: MIT
metadata:
  author: clearpath
---

# Clearpath Architecture

Project-specific conventions for Clearpath, stricter or more specific than the general
`laravel-best-practices` skill. Every new CRUD/resource feature (backend and frontend) must
mirror the structure already built for `patients` — use those files as the literal reference
implementation, not just inspiration. When in doubt, open the equivalent `patients` file
first and match it, rather than inventing a new approach.

## PHP documentation

Every public method (Service, Interface, Controller action) needs a PHPDoc block with:
a one-line description of what it does, `@param` for each parameter explaining what it
represents (not just repeating the type), and `@return` when the return type isn't
self-evident from the type declaration alone. See `PatientsServiceInterface.php` for the
expected level of detail. Inline comments stay reserved for non-obvious "why".

## Backend structure (per feature)

- `app/Models/{Model}.php`
- `database/migrations/..._create_{models}_table.php`, `database/factories/{Model}Factory.php`,
  and a `database/seeders/{Models}Seeder.php` — every new feature ships with all three,
  same as `create_patients_table.php` / `PatientFactory.php` / `PatientsSeeder.php`.
- `app/Repositories/Contracts/{Feature}RepositoryInterface.php` (bound via `#[Bind]`) and
  `app/Repositories/{Feature}Repository.php` — only a Repository may write Eloquent queries.
- `app/Services/Contracts/{Feature}ServiceInterface.php` — interface, bound to its
  implementation via `#[Bind({Feature}Service::class)]` (see `PatientsServiceInterface.php`).
  Services depend on the Repository interface, never on `{Model}::query()` directly.
  Controllers depend on the Service interface, never the concrete Service class.
- `app/Services/{Feature}Service.php` — business logic.
- `app/Http/Controllers/{Feature}Controller.php` — thin: only calls the service and returns
  a Resource/JsonResponse. Authorization via `implements HasMiddleware` + `can:` middleware
  (see `PatientsController.php`), never checked manually inside the action.
- `app/Http/Requests/Store{Model}Request.php`, `Update{Model}Request.php`,
  `Index{Model}Request.php` (or equivalent for listing/filtering/search).
- `app/Http/Resources/{Model}Resource.php` — response shape lives here, never hand-built
  in the controller.
- `app/Policies/{Model}Policy.php`.
- Tests: a Feature test per CRUD flow, plus a Unit test for the Service
  (see `tests/Feature/PatientCrudTest.php`, `tests/Unit/PatientsServiceTest.php`).
- Don't register a ServiceProvider with empty `register()`/`boot()` just for a binding —
  the `#[Bind]` attribute on the interface is enough.

## Frontend structure (per feature), inside `resources/js/features/{feature}/`

- `types/{model}.ts` — types plus any shared domain constants (e.g. `GENDER_OPTIONS` pattern:
  a single source of truth, never duplicated string literals across components).
- `services/{feature}.service.ts` — the only file that knows the raw HTTP/response shape.
  Reuse the shared `request()` wrapper pattern and throw `ValidationError`
  (`@/lib/http/errors/validation-error.ts`) on 422, same as `patients.service.ts`.
- `hooks/use-{feature}.ts`, `use-{model}-dialog.ts`, `use-{model}-delete-dialog.ts`,
  `use-{model}-filters-dialog.ts` — one hook per concern, not one hook that does everything.
  Reuse the existing pagination/debounced-search pattern from `use-patients.ts`.
- `components/` — isolated, single-purpose components (table, form, form dialog, delete
  dialog, filters dialog/form), same split as the `patient-*` components.
- User feedback on mutations via the existing `sonner` toast setup, not ad-hoc alerts.
- `index.ts` — barrel file exporting the feature's public API only.
- Tests alongside each hook/component (`.test.ts`/`.test.tsx`), same coverage bar as
  `patients`: happy path, validation failure, edge cases.
- Document non-obvious logic with short comments (why, not what) — no multi-line doc blocks.

## Domain Events

A Service dispatches an event for any state change other code should be able to react to
(e.g. `app/Events/{Model}Created.php`). Never dispatched from the Controller. Don't create
an event nobody listens to. Listeners live in `app/Listeners/`, implement `ShouldQueue`
unless they must run synchronously.

## Value Objects

Structured scalar fields (phone, email, medical record number, etc.) are a Value Object in
`app/ValueObjects/`, not a raw string. The Value Object validates its own format in the
constructor and exposes typed accessors; cast to/from it on the Eloquent model via a custom
cast where practical.

## API Versioning

Every API route lives under `/api/v1/...` in `routes/api.php`, never bare `/api/...`.
Controllers/Resources don't need a `V1` suffix unless a second version is actually
introduced.

## Swagger / OpenAPI documentation

Every API endpoint carries OpenAPI annotations directly on the Controller action (summary,
parameters, request body schema, every response status with its shape) via
`darkaonline/l5-swagger`. No endpoint, new or modified, ships without this.

## BFF (Backend for Frontend)

Each client type gets its own BFF, shaped around what that client needs, not one generic API
shared as-is. The web app is served by the existing Controllers under
`routes/api.php`/`routes/web.php`. A second client gets its own parallel set of
routes/Controllers (e.g. under a `Mobile` namespace), never the same Controllers branching
on client type. Every BFF calls into the same Services/Repositories — a BFF shapes
input/output, it never reimplements business rules.
