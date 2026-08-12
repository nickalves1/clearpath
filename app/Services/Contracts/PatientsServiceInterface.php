<?php

namespace App\Services\Contracts;

use App\Models\patients;
use App\Services\PatientsService;
use Illuminate\Container\Attributes\Bind;
use Illuminate\Database\Eloquent\Collection;

#[Bind(PatientsService::class)]
interface PatientsServiceInterface
{
    public function store(array $data): patients;
    
    public function index(array $data): Collection;
}