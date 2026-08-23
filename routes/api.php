<?php

use App\Http\Controllers\ImagingOrdersController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\ReportsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('patients', PatientsController::class);
        Route::apiResource('imaging-orders', ImagingOrdersController::class);
    });

    Route::middleware(['auth:sanctum', 'can:sign-reports'])->group(function () {
        Route::post('imaging-reports/{report}/sign', [ReportsController::class, 'sign']);
    });
});
