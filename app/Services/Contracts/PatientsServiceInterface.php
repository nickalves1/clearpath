<?php

namespace App\Services\Contracts;

use App\Models\Patient;
use App\Services\PatientsService;
use Illuminate\Container\Attributes\Bind;
use Illuminate\Pagination\LengthAwarePaginator;

#[Bind(PatientsService::class)]
interface PatientsServiceInterface
{
    /**
     * Create a new patient.
     *
     * @param  array<string, mixed>  $data
     */
    public function store(array $data): Patient;

    /**
     * Get a paginated, sortable listing of patients.
     *
     * @param  array<string, mixed>  $data
     */
    public function index(array $data): LengthAwarePaginator;

    /**
     * Update an existing patient.
     *
     * @param  array<string, mixed>  $data
     */
    public function update(Patient $patient, array $data): Patient;

    /**
     * Delete a patient.
     */
    public function destroy(Patient $patient): void;
}
