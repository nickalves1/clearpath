<?php

namespace App\Services;

use App\Models\Patient;
use App\Repositories\Contracts\PatientsRepositoryInterface;
use App\Services\Contracts\PatientsServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PatientsService implements PatientsServiceInterface
{
    public function __construct(
        private PatientsRepositoryInterface $repository
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public function store(array $data): Patient
    {
        return $this->repository->create($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function index(array $data): LengthAwarePaginator
    {
        return $this->repository->paginate($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Patient $patient, array $data): Patient
    {
        return $this->repository->update($patient, $data);
    }

    public function softDelete(Patient $patient): void
    {
        $this->repository->delete($patient);
    }
}
