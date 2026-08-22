<?php

namespace App\Repositories\Contracts;

use App\Models\Patient;
use App\Repositories\PatientsRepository;
use Illuminate\Container\Attributes\Bind;
use Illuminate\Pagination\LengthAwarePaginator;

#[Bind(PatientsRepository::class)]
interface PatientsRepositoryInterface
{
    /**
     * Persist a new patient.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Patient;

    /**
     * Get a paginated, sortable, filterable, searchable listing of patients.
     *
     * @param  array<string, mixed>  $data
     * @return LengthAwarePaginator<int, Patient>
     */
    public function paginate(array $data): LengthAwarePaginator;

    /**
     * Persist changes to an existing patient.
     *
     * @param  array<string, mixed>  $data
     */
    public function update(Patient $patient, array $data): Patient;

    /**
     * Soft-delete a patient.
     */
    public function delete(Patient $patient): void;
}
