<?php

namespace App\Services;

use App\Events\PatientCreated;
use App\Events\PatientDeleted;
use App\Events\PatientUpdated;
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
        $patient = $this->repository->create($data);

        PatientCreated::dispatch($patient, $this->causedByUserId(), $this->causedByIp());

        return $patient;
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
        $patient = $this->repository->update($patient, $data);

        PatientUpdated::dispatch($patient, $this->causedByUserId(), $this->causedByIp(), $this->changedFieldNames($patient));

        return $patient;
    }

    public function softDelete(Patient $patient): void
    {
        $this->repository->delete($patient);

        PatientDeleted::dispatch($patient, $this->causedByUserId(), $this->causedByIp());
    }

    /**
     * The authenticated user's id, for attribution on dispatched events.
     *
     * This app's users always have an integer id; auth()->id() is typed
     * int|string|null generically by the framework, so narrow it here.
     */
    private function causedByUserId(): ?int
    {
        $id = auth()->id();

        return $id !== null ? (int) $id : null;
    }

    /**
     * The requesting IP, for attribution on dispatched events.
     */
    private function causedByIp(): ?string
    {
        return request()->ip();
    }

    /**
     * The names of the fields changed by the update that just happened,
     * excluding timestamps. Only field names are logged, never values,
     * so audit logs never carry PHI.
     *
     * @return array<int, string>
     */
    private function changedFieldNames(Patient $patient): array
    {
        return array_values(array_diff(array_keys($patient->getChanges()), ['updated_at']));
    }
}
