<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- laravel/sanctum (SANCTUM) - v4
- laravel/wayfinder (WAYFINDER) - v0
- larastan/larastan (LARASTAN) - v3
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/react (INERTIA_REACT) - v3
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- @laravel/vite-plugin-wayfinder (WAYFINDER_VITE) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Skills Activation

This project has domain-specific skills available in `**/skills/**`. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

## Tools

- Laravel Boost is an MCP server with tools designed specifically for this application. Prefer Boost tools over manual alternatives like shell commands or file reads.
- Use `database-query` to run read-only queries against the database instead of writing raw SQL in tinker.
- Use `database-schema` to inspect table structure before writing migrations or models.
- Use `get-absolute-url` to resolve the correct scheme, domain, and port for project URLs. Always use this before sharing a URL with the user.
- Use `browser-logs` to read browser logs, errors, and exceptions. Only recent logs are useful, ignore old entries.

## Searching Documentation (IMPORTANT)

- Always use `search-docs` before making code changes. Do not skip this step. It returns version-specific docs based on installed packages automatically.
- Pass a `packages` array to scope results when you know which packages are relevant.
- Use multiple broad, topic-based queries: `['rate limiting', 'routing rate limiting', 'routing']`. Expect the most relevant results first.
- Do not add package names to queries because package info is already shared. Use `test resource table`, not `filament 4 test resource table`.

### Search Syntax

1. Use words for auto-stemmed AND logic: `rate limit` matches both "rate" AND "limit".
2. Use `"quoted phrases"` for exact position matching: `"infinite scroll"` requires adjacent words in order.
3. Combine words and phrases for mixed queries: `middleware "rate limit"`.
4. Use multiple queries for OR logic: `queries=["authentication", "middleware"]`.

## Artisan

- Run Artisan commands directly via the command line (e.g., `php artisan route:list`). Use `php artisan list` to discover available commands and `php artisan [command] --help` to check parameters.
- Inspect routes with `php artisan route:list`. Filter with: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Read configuration values using dot notation: `php artisan config:show app.name`, `php artisan config:show database.default`. Or read config files directly from the `config/` directory.

## Tinker

- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: `php artisan tinker --execute 'Your::code();'`
  - Double quotes for PHP strings inside: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== php rules ===

# PHP

- Always use curly braces for control structures, even for single-line bodies.
- Use PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`. Do not leave empty zero-parameter `__construct()` methods unless the constructor is private.
- Use explicit return type declarations and type hints for all method parameters: `function isAccessible(User $user, ?string $path = null): bool`
- Use TitleCase for Enum keys: `FavoritePerson`, `BestLake`, `Monthly`.
- Prefer PHPDoc blocks over inline comments. Only add inline comments for exceptionally complex logic.
- Use array shape type definitions in PHPDoc blocks.

=== deployments rules ===

# Deployment

- Laravel can be deployed using [Laravel Cloud](https://cloud.laravel.com/), which is the fastest way to deploy and scale production Laravel applications.

=== tests rules ===

# Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test --compact` with a specific filename or filter.

=== inertia-laravel/core rules ===

# Inertia

- Inertia creates fully client-side rendered SPAs without modern SPA complexity, leveraging existing server-side patterns.
- Components live in `resources/js/pages` (unless specified in `vite.config.js`). Use `Inertia::render()` for server-side routing instead of Blade views.
- ALWAYS use `search-docs` tool for version-specific Inertia documentation and updated code examples.
- IMPORTANT: Activate `inertia-react-development` when working with Inertia client-side patterns.

# Inertia v3

- Use all Inertia features from v1, v2, and v3. Check the documentation before making changes to ensure the correct approach.
- New v3 features: standalone HTTP requests (`useHttp` hook), optimistic updates with automatic rollback, layout props (`useLayoutProps` hook), instant visits, simplified SSR via `@inertiajs/vite` plugin, custom exception handling for error pages.
- Carried over from v2: deferred props, infinite scroll, merging props, polling, prefetching, once props, flash data.
- When using deferred props, add an empty state with a pulsing or animated skeleton.
- Axios has been removed. Use the built-in XHR client with interceptors, or install Axios separately if needed.
- `Inertia::lazy()` / `LazyProp` has been removed. Use `Inertia::optional()` instead.
- Prop types (`Inertia::optional()`, `Inertia::defer()`, `Inertia::merge()`) work inside nested arrays with dot-notation paths.
- SSR works automatically in Vite dev mode with `@inertiajs/vite` - no separate Node.js server needed during development.
- Event renames: `invalid` is now `httpException`, `exception` is now `networkError`.
- `router.cancel()` replaced by `router.cancelAll()`.
- The `future` configuration namespace has been removed - all v2 future options are now always enabled.

=== laravel/core rules ===

# Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using `php artisan list` and check their parameters with `php artisan [command] --help`.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `php artisan make:model --help` to check the available options.

## APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

## URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

## Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

## Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.

=== wayfinder/core rules ===

# Laravel Wayfinder

Use Wayfinder to generate TypeScript functions for Laravel routes. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

=== pint/core rules ===

# Laravel Pint Code Formatter

- If you have modified any PHP files, you must run `vendor/bin/pint --dirty --format agent` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test --format agent`, simply run `vendor/bin/pint --format agent` to fix any formatting issues.

=== phpunit/core rules ===

# PHPUnit

- This application uses PHPUnit for testing. All tests must be written as PHPUnit classes. Use `php artisan make:test --phpunit {name}` to create a new test.
- If you see a test using "Pest", convert it to PHPUnit.
- Every time a test has been updated, run that singular test.
- When the tests relating to your feature are passing, ask the user if they would like to also run the entire test suite to make sure everything is still passing.
- Tests should cover all happy paths, failure paths, and edge cases.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files; these are core to the application.

## Running Tests

- Run the minimal number of tests, using an appropriate filter, before finalizing.
- To run all tests: `php artisan test --compact`.
- To run all tests in a file: `php artisan test --compact tests/Feature/ExampleTest.php`.
- To filter on a particular test name: `php artisan test --compact --filter=testName` (recommended after making a change to a related file).

=== inertia-react/core rules ===

# Inertia + React

- IMPORTANT: Activate `inertia-react-development` when working with Inertia React client-side patterns.

</laravel-boost-guidelines>

## Clean Code & Architecture

Follow SOLID and clean code principles in all PHP and TypeScript. Every new CRUD/resource
feature (backend and frontend) must mirror the structure already built for `patients` —
use those files as the literal reference implementation, not just inspiration.

### PHP documentation

Every public method (Service, Interface, Controller action) needs a PHPDoc block with:
a one-line description of what it does, `@param` for each parameter explaining what it
represents (not just repeating the type), and `@return` when the return type isn't
self-evident from the type declaration alone. See `PatientsServiceInterface.php` for the
expected level of detail. Inline comments stay reserved for non-obvious "why", per the
existing PHP rules above.

### Backend structure (per feature)

- `app/Models/{Model}.php`
- `database/migrations/..._create_{models}_table.php`, `database/factories/{Model}Factory.php`,
  and a `database/seeders/{Models}Seeder.php` — every new feature ships with all three,
  same as `create_patients_table.php` / `PatientFactory.php` / `PatientsSeeder.php`.
- `app/Services/Contracts/{Feature}ServiceInterface.php` — interface, bound to its
  implementation via `#[Bind({Feature}Service::class)]` (see `PatientsServiceInterface.php`).
  Controllers must depend on the interface, never the concrete service class.
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
- Don't register a ServiceProvider with empty `register()`/`boot()` just for the binding —
  the `#[Bind]` attribute on the interface is enough.

### Frontend structure (per feature), inside `resources/js/features/{feature}/`

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

### Additional required patterns

- **Repository Pattern** — only a Repository may write Eloquent queries. Each feature gets
  `app/Repositories/Contracts/{Feature}RepositoryInterface.php` (bound via `#[Bind]`, same
  pattern as the Service interfaces) and `app/Repositories/{Feature}Repository.php`.
  Services depend on the Repository interface, never on `{Model}::query()` directly.
- **Domain Events** — a Service dispatches an event for any state change other code should
  be able to react to (e.g. `app/Events/{Model}Created.php`). Never dispatched from the
  Controller. Don't create an event nobody listens to. Listeners live in `app/Listeners/`,
  implement `ShouldQueue` unless they must run synchronously.
- **Value Objects** — structured scalar fields (phone, email, medical record number, etc.)
  are a Value Object in `app/ValueObjects/`, not a raw string. The Value Object validates
  its own format in the constructor and exposes typed accessors; cast to/from it on the
  Eloquent model via a custom cast where practical.
- **API Versioning** — every API route lives under `/api/v1/...` in `routes/api.php`, never
  bare `/api/...`. Controllers/Resources don't need a `V1` suffix unless a second version is
  actually introduced.
- **Swagger / OpenAPI documentation** — every API endpoint carries OpenAPI annotations
  directly on the Controller action (summary, parameters, request body schema, every
  response status with its shape) via `darkaonline/l5-swagger`. No endpoint, new or
  modified, ships without this.
- **BFF (Backend for Frontend)** — each client type gets its own BFF, shaped around what
  that client needs, not one generic API shared as-is. The web app is served by the
  existing Controllers under `routes/api.php`/`routes/web.php`. A second client gets its
  own parallel set of routes/Controllers (e.g. under a `Mobile` namespace), never the same
  Controllers branching on client type. Every BFF calls into the same
  Services/Repositories — a BFF shapes input/output, it never reimplements business rules.

When in doubt about a pattern for a new feature, open the equivalent `patients` file first
and match it, rather than inventing a new approach.
