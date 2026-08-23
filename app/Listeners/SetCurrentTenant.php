<?php

namespace App\Listeners;

use App\Models\User;
use App\Support\CurrentTenant;
use Illuminate\Auth\Events\Authenticated;

class SetCurrentTenant
{
    public function __construct(private CurrentTenant $currentTenant) {}

    public function handle(Authenticated $event): void
    {
        if ($event->user instanceof User) {
            $this->currentTenant->set($event->user->tenant_id);
        }
    }
}
