<?php

namespace App\Models;

use App\Casts\AsEmail;
use App\Casts\AsMedicalRecordNumber;
use App\Casts\AsPhone;
use Database\Factories\PatientFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email', 'medical_record_number'])]
class Patient extends Model
{
    /** @use HasFactory<PatientFactory> */
    use HasFactory;

    use SoftDeletes;

    /**
     * @return array<string, class-string>
     */
    protected function casts(): array
    {
        return [
            'phone' => AsPhone::class,
            'email' => AsEmail::class,
            'medical_record_number' => AsMedicalRecordNumber::class,
        ];
    }
}
