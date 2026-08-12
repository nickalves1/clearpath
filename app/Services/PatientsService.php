<?php

namespace App\Services;

use App\Models\patients;
use App\Services\Contracts\PatientsServiceInterface;
use Illuminate\Database\Eloquent\Collection;

class PatientsService implements PatientsServiceInterface
{
    public function store(array $data): patients
    {
        return patients::create($data);
    }

    public function index(array $data): Collection
    {
        return patients::all();
    }
}

