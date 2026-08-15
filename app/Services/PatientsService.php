<?php

namespace App\Services;

use App\Models\Patient;
use App\Services\Contracts\PatientsServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PatientsService implements PatientsServiceInterface
{
    public function store(array $data): Patient
    {
        return Patient::create($data);
    }

    public function index(array $data): LengthAwarePaginator
    {
        return Patient::paginate(5);
    }

    public function update(Patient $patient, array $data): Patient
    {
        $patient->update($data);

        return $patient;
    }
}
