<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexPatientRequest;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Patient;
use App\Services\Contracts\PatientsServiceInterface;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PatientsController extends Controller implements HasMiddleware
{
    public function __construct(
        protected PatientsServiceInterface $patientsService
    ) {}

    /**
     * Authorization runs as middleware, ahead of the FormRequest and the service.
     *
     * @return array<int, Middleware>
     */
    public static function middleware(): array
    {
        return [
            new Middleware('can:viewAny,'.Patient::class, only: ['index']),
            new Middleware('can:view,patient', only: ['show']),
            new Middleware('can:create,'.Patient::class, only: ['store']),
            new Middleware('can:update,patient', only: ['update']),
            new Middleware('can:delete,patient', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(IndexPatientRequest $request)
    {
        $patients = $this->patientsService->index($request->query());

        return PatientResource::collection($patients);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $patient = $this->patientsService->store($request->validated());

        return PatientResource::make($patient)->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $patient = $this->patientsService->update($patient, $request->validated());

        return PatientResource::make($patient);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $this->patientsService->softDelete($patient);

        return response()->json(null, 204);
    }
}
