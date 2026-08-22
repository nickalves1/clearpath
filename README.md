# Clearpath

A patient management application built with Laravel 13, Inertia.js v3, and React 19 — a portfolio project.

## Quick start (recommended for anyone cloning this repo)

**Prerequisites:**

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- **At least 6GB of memory allocated to Docker Desktop.** SonarQube (which runs an embedded Elasticsearch) needs headroom alongside the app and database containers — with less than ~4GB, the SonarQube container gets killed by an out-of-memory error mid-analysis.
  Check/change this under Docker Desktop → **Settings → Resources → Memory**.
- **Windows users:** Docker Desktop on Windows requires the WSL2 backend (Docker Desktop sets this up automatically on install). Run the setup command below from a **WSL2 terminal** or **Git Bash** — it's a bash script and won't run directly from PowerShell or cmd.exe.

**Setup:**

```bash
./bin/setup.sh
```

This single command will:

1. Create your `.env` file
2. Build and start all containers (app, database, SonarQube)
3. Install PHP and JS dependencies
4. Generate the app key and run migrations
5. Build frontend assets
6. Generate a SonarQube token and run a full code analysis

When it finishes:

- **App:** http://localhost:8000
- **SonarQube:** http://localhost:9000 (login `admin` / `admin`, with an analysis already available)

## Day-to-day development

If you already have PHP, Composer, and Node installed locally, you don't need Docker for daily development — it exists mainly so the project also works out of the box for people who don't. The `pgsql` container exposes its port to `localhost`, so your local tooling can reach the same database.

```bash
composer run dev
```

This starts the Laravel server, the queue worker, and Vite, same as before Docker was introduced. It does **not** start SonarQube (which only runs in Docker). To bring SonarQube up on its own:

```bash
docker compose up -d sonarqube sonarqube-db
```

## Running tests

```bash
php artisan test --compact          # PHP (PHPUnit)
npm run test                        # JS/TS (Vitest)
composer run ci:check               # everything CI runs: lint, formatting, types, PHP tests, JS tests
```

## Running a SonarQube analysis manually

`bin/setup.sh` already runs one analysis for you. To run another later (after making changes):

```bash
docker compose --profile scan run --rm sonar-scanner -Dsonar.token=$(cat .sonar-token)
```

Requires the `sonarqube` container to be up (see above).
