<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->string('slug', 160)->unique()->after('name');
            $table->string('npi', 10)->nullable()->after('slug');
            $table->string('phone', 20)->nullable()->after('npi');
            $table->string('address_line', 255)->nullable()->after('phone');
            $table->string('city', 100)->nullable()->after('address_line');
            $table->string('state', 100)->nullable()->after('city');
            $table->string('postal_code', 20)->nullable()->after('state');
        });
    }

    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['slug', 'npi', 'phone', 'address_line', 'city', 'state', 'postal_code']);
        });
    }
};
