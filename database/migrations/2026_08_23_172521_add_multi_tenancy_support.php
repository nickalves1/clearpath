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
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('tenant_id')->nullable()->after('id')->constrained();
        });

        Schema::table('patients', function (Blueprint $table) {
            $table->foreignId('tenant_id')->after('id')->constrained();
            $table->dropUnique(['medical_record_number']);
            $table->unique(['tenant_id', 'medical_record_number']);
        });

        Schema::table('physicians', function (Blueprint $table) {
            $table->foreignId('tenant_id')->after('id')->constrained();
        });

        Schema::table('imaging_orders', function (Blueprint $table) {
            $table->foreignId('tenant_id')->after('id')->constrained();
        });

        Schema::table('studies', function (Blueprint $table) {
            $table->foreignId('tenant_id')->after('id')->constrained();
        });

        Schema::table('reports', function (Blueprint $table) {
            $table->foreignId('tenant_id')->after('id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', fn (Blueprint $table) => $table->dropConstrainedForeignId('tenant_id'));
        Schema::table('studies', fn (Blueprint $table) => $table->dropConstrainedForeignId('tenant_id'));
        Schema::table('imaging_orders', fn (Blueprint $table) => $table->dropConstrainedForeignId('tenant_id'));
        Schema::table('physicians', fn (Blueprint $table) => $table->dropConstrainedForeignId('tenant_id'));
        Schema::table('patients', function (Blueprint $table) {
            $table->dropUnique(['tenant_id', 'medical_record_number']);
            $table->dropConstrainedForeignId('tenant_id');
            $table->unique('medical_record_number');
        });
        Schema::table('users', fn (Blueprint $table) => $table->dropConstrainedForeignId('tenant_id'));
        Schema::dropIfExists('tenants');
    }
};
