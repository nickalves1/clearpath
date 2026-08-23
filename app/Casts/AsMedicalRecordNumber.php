<?php

namespace App\Casts;

use App\ValueObjects\MedicalRecordNumber;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

/**
 * @implements CastsAttributes<MedicalRecordNumber, MedicalRecordNumber|string>
 */
class AsMedicalRecordNumber implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): ?MedicalRecordNumber
    {
        return $value === null ? null : new MedicalRecordNumber($value);
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if ($value === null) {
            return null;
        }

        return ($value instanceof MedicalRecordNumber ? $value : new MedicalRecordNumber($value))->value();
    }
}
