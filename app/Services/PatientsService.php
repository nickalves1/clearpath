<?php

namespace App\Services;

use App\Models\Patient;
use App\Services\Contracts\PatientsServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\QueryBuilder;

class PatientsService implements PatientsServiceInterface
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function store(array $data): Patient
    {
        return Patient::create($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function index(array $data): LengthAwarePaginator
    {
        return QueryBuilder::for(Patient::class)
            ->allowedSorts('medical_record_number', 'first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email')
            ->paginate(5);
    }

    /**
     * @param  array<string, mixed>  $data
     */
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
