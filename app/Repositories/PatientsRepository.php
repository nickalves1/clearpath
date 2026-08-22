<?php

namespace App\Repositories;

use App\Models\Patient;
use App\Repositories\Contracts\PatientsRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\QueryBuilder;

class PatientsRepository implements PatientsRepositoryInterface
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): Patient
    {
        return Patient::create($data);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return LengthAwarePaginator<int, Patient>
     */
    public function paginate(array $data): LengthAwarePaginator
    {
        $query = QueryBuilder::for(Patient::class)
            ->allowedSorts('medical_record_number', 'first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email', 'created_at', 'deleted_at')
            ->withTrashed();

        $this->applyFilters($query, $data['filters'] ?? []);
        $this->applySearch($query, $data['search'] ?? '');

        return $query->paginate(10);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Patient $patient, array $data): Patient
    {
        $patient->update($data);

        return $patient;
    }

    public function delete(Patient $patient): void
    {
        $patient->delete();
    }

    /**
     * @param  QueryBuilder<Patient>  $query
     * @param  array<string, mixed>  $selectedFilters
     */
    private function applyFilters(QueryBuilder $query, array $selectedFilters): void
    {
        $isActive = $selectedFilters['is_active'] ?? 'true';
        $query
            ->when($isActive === 'true', fn ($query) => $query->whereNull('deleted_at'))
            ->when($isActive === 'false', fn ($query) => $query->whereNotNull('deleted_at'));

        $gender = $selectedFilters['gender'] ?? 'all';
        $query->when($gender !== 'all', fn ($query) => $query->where('gender', $gender));

        $this->applyDateFilter($query, 'created_at', $selectedFilters);
        $this->applyDateFilter($query, 'deleted_at', $selectedFilters);
    }

    /**
     * Applies the preset (or custom range) date filter for the given column.
     *
     * @param  QueryBuilder<Patient>  $query
     * @param  array<string, mixed>  $selectedFilters
     */
    private function applyDateFilter(QueryBuilder $query, string $column, array $selectedFilters): void
    {
        $preset = $selectedFilters[$column] ?? 'all';

        match ($preset) {
            'today' => $query->whereBetween($column, [Carbon::today(), Carbon::today()->endOfDay()]),
            'last_7_days' => $query->where($column, '>=', Carbon::now()->subDays(7)),
            'last_30_days' => $query->where($column, '>=', Carbon::now()->subDays(30)),
            'custom' => $query->whereBetween($column, [
                Carbon::parse($selectedFilters[$column.'_from'])->startOfDay(),
                Carbon::parse($selectedFilters[$column.'_to'])->endOfDay(),
            ]),
            default => null,
        };
    }

    /**
     * Applies the user's search.
     *
     * @param  QueryBuilder<Patient>  $query
     */
    private function applySearch(QueryBuilder $query, string $search): void
    {
        if (empty($search)) {
            return;
        }

        $query->where(fn ($q) => $q->whereLike('first_name', "%{$search}%")
            ->orWhereLike('last_name', "%{$search}%")
            ->orWhereLike('phone', "%{$search}%")
            ->orWhereLike('medical_record_number', "%{$search}%")
        );
    }
}
