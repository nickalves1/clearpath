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
        Schema::create('physicians', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', length: 100);
            $table->string('last_name', length: 100);
            $table->string('specialty', length: 100);
            $table->string('license_number', length: 30)->unique();
            $table->string('phone', length: 20);
            $table->string('email', length: 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('physicians');
    }
};
