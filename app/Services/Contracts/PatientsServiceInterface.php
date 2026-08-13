<?php

namespace App\Services\Contracts;

use App\Models\Patient;
use App\Services\PatientsService;
use Illuminate\Container\Attributes\Bind;
use Illuminate\Database\Eloquent\Collection;

#[Bind(PatientsService::class)]
interface PatientsServiceInterface
{
    public function store(array $data): Patient;

    public function index(array $data): Collection;

    public function update(Patient $patient, array $data): Patient;
}
