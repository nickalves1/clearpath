<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePhysicianRequest;
use App\Http\Requests\UpdatePhysicianRequest;
use App\Models\Physician;

class PhysiciansController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorePhysicianRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Physician $physician)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Physician $physician)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePhysicianRequest $request, Physician $physician)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Physician $physician)
    {
        //
    }
}
