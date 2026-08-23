<?php

namespace App\Providers;

use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->logAuthorizationDenials();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    /**
     * Logs every explicit policy/gate denial as a security-relevant event
     * (e.g. a user attempting to view or edit a patient they can't access).
     * Runs synchronously, not queued, so it's visible even if the queue
     * is backed up. Only the resource's type and id are logged, never
     * its attributes, so this never carries PHI.
     */
    protected function logAuthorizationDenials(): void
    {
        Gate::after(function (User $user, string $ability, ?bool $result, mixed $arguments) {
            if ($result !== false) {
                return;
            }

            $resource = is_array($arguments) ? ($arguments[0] ?? null) : $arguments;

            // A logging backend being unreachable (e.g. Elasticsearch down)
            // must never turn into a 500 for the user being denied access.
            try {
                Log::warning('Authorization denied', [
                    'user_id' => $user->id,
                    'ability' => $ability,
                    'resource' => is_object($resource) ? class_basename($resource) : $resource,
                    'resource_id' => $resource instanceof Model ? $resource->getKey() : null,
                    'ip' => request()->ip(),
                ]);
            } catch (\Throwable) {
                //
            }
        });
    }
}
