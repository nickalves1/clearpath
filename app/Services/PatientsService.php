<?php

namespace App\Services;

use App\Models\Patient;
use App\Services\Contracts\PatientsServiceInterface;
use Illuminate\Database\Eloquent\Collection;

class PatientsService implements PatientsServiceInterface
{
    public function store(array $data): Patient
    {
        return Patient::create($data);
    }

    public function index(array $data): Collection
    {
        return Patient::all();
    }

    public function update(Patient $patient, array $data): Patient
    {
        $patient->update($data);

        return $patient;
    }
}
