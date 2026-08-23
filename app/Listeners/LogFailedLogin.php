<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Failed;
use Illuminate\Support\Facades\Log;

class LogFailedLogin
{
    /**
     * Logged synchronously (not queued) so a security event is visible
     * immediately, even if the queue is backed up or unavailable.
     *
     * The submitted credentials (including the attempted password) live
     * on the event but are never logged.
     */
    public function handle(Failed $event): void
    {
        // A logging backend being unreachable (e.g. Elasticsearch down)
        // must never turn a failed login into a 500 for the user.
        try {
            Log::warning('Failed login attempt', [
                'guard' => $event->guard,
                'ip' => request()->ip(),
            ]);
        } catch (\Throwable) {
            //
        }
    }
}
