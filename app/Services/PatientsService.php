<?php

namespace App\Services;

use App\Models\Patient;
use App\Services\Contracts\PatientsServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedSort;

class PatientsService implements PatientsServiceInterface
{
    public function store(array $data): Patient
    {
        return Patient::create($data);
    }

    public function index(array $data): LengthAwarePaginator
    {
        return QueryBuilder::for(Patient::class)
            ->allowedSorts('medical_record_number', 'first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email')
            ->paginate(5);
    }

    public function update(Patient $patient, array $data): Patient
    {
        $patient->update($data);

        return $patient;
    }

    public function destroy(Patient $patient): void
    {
        $patient->delete();
    }
}
