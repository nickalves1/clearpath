<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('patients', fn () => inertia('patients/index'))
    ->middleware(['auth', 'verified']) // copie o middleware que a rota dashboard já usa
    ->name('patients.index');

require __DIR__.'/settings.php';
