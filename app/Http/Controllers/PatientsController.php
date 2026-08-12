<?php

namespace App\Http\Controllers;

use App\Models\patients;
use App\Http\Requests\StorepatientsRequest;
use App\Http\Requests\UpdatepatientsRequest;
use App\Services\Contracts\PatientsServiceInterface;

class PatientsController extends Controller
{
    public function __construct(
        protected PatientsServiceInterface $patientsService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patient = $this->patientsService->index([]);

        return response()->json($patient, 200);
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
    public function store(StorepatientsRequest $request)
    {
        $patient = $this->patientsService->store($request->validated());

        return response()->json($patient, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(patients $patients)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(patients $patients)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatepatientsRequest $request, patients $patients)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(patients $patients)
    {
        //
    }
}
