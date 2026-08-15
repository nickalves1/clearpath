<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('patients', fn () => inertia('patients/index'))
    ->middleware(['auth', 'verified', 'can:viewAny,App\Models\Patient'])
    ->name('patients.index');

require __DIR__.'/settings.php';
