<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ImagingOrdersController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');





Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('patients', PatientsController::class);
    Route::apiResource('imaging-orders', ImagingOrdersController::class);
});


// fiz só pra testar
//Route::apiResource('patients', PatientsController::class);

Route::middleware(['auth:sanctum', 'radiologist'])->group(function () {
    Route::post('imaging-reports/{report}/sign', [ReportsController::class, 'sign']);
});