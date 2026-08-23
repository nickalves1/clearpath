<?php

namespace App\Support;

/**
 * Holds which tenant the current request belongs to. Bound as a singleton
 * (see AppServiceProvider), so the same instance is shared for the whole
 * request — whoever sets it (SetCurrentTenant) and whoever reads it
 * (BelongsToTenant) see the same value.
 */
class CurrentTenant
{
    private ?int $tenantId = null;

    /**
     * @param  int|null  $tenantId  The authenticated user's tenant, or null
     *                              outside of an authenticated request (e.g.
     *                              a queue worker), in which case tenant
     *                              scoping is skipped rather than applied.
     */
    public function set(?int $tenantId): void
    {
        $this->tenantId = $tenantId;
    }

    /**
     * The current tenant's id, or null if none has been set yet.
     */
    public function id(): ?int
    {
        return $this->tenantId;
    }
}
