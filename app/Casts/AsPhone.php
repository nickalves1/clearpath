<?php

namespace App\Casts;

use App\ValueObjects\Phone;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

/**
 * @implements CastsAttributes<Phone, Phone|string>
 */
class AsPhone implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): ?Phone
    {
        return $value === null ? null : new Phone($value);
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if ($value === null) {
            return null;
        }

        return ($value instanceof Phone ? $value : new Phone($value))->value();
    }
}
