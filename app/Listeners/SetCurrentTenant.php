<?php

namespace App\Listeners;

use App\Models\User;
use App\Support\CurrentTenant;
use Illuminate\Auth\Events\Authenticated;

class SetCurrentTenant
{
    public function __construct(private CurrentTenant $currentTenant) {}

    /**
     * Fires as soon as any guard resolves who's authenticated — reliably
     * before route-model binding runs, so the tenant is set before any
     * tenant-scoped query for this request has a chance to execute.
     */
    public function handle(Authenticated $event): void
    {
        if ($event->user instanceof User) {
            $this->currentTenant->set($event->user->tenant_id);
        }
    }
}
