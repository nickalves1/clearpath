<?php

namespace App\Concerns;

use App\Support\CurrentTenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin Model
 */
trait BelongsToTenant
{
    /**
     * Applies a global scope so every query for this model is filtered to
     * the current tenant automatically, and stamps new records with it on
     * creation — no Controller, Service, or Repository has to remember to
     * filter or set the tenant manually.
     */
    protected static function bootBelongsToTenant(): void
    {
        static::addGlobalScope('tenant', function (Builder $builder) {
            $tenantId = app(CurrentTenant::class)->id();

            if ($tenantId !== null) {
                $builder->where($builder->getModel()->getTable().'.tenant_id', $tenantId);
            }
        });

        static::creating(function (Model $model) {
            if ($model->getAttribute('tenant_id') === null) {
                $model->setAttribute('tenant_id', app(CurrentTenant::class)->id());
            }
        });
    }
}
