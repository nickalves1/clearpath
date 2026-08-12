<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('medical_record_number', length: 30)->unique();
            $table->string('first_name', length: 100);
            $table->string('last_name', length: 100);
            $table->date('birth_date');
            $table->string('gender', length: 20);
            $table->string('phone', length: 20);
            $table->string('email', length: 255);
            $table->timestamps();     // cria created_at + updated_at automaticamente
            $table->softDeletes();    // cria deleted_at, já nullable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
