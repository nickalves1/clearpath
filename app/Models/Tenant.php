<?php

namespace App\Models;

use App\Casts\AsPhone;
use Database\Factories\TenantFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable(['name', 'npi', 'phone', 'address_line', 'city', 'state', 'postal_code'])]
class Tenant extends Model
{
    /** @use HasFactory<TenantFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'phone' => AsPhone::class,
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Tenant $tenant): void {
            if (blank($tenant->slug)) {
                $tenant->slug = static::generateUniqueSlug($tenant->name);
            }
        });
    }

    protected static function generateUniqueSlug(string $name): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $suffix = 2;

        while (static::query()->where('slug', $slug)->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
