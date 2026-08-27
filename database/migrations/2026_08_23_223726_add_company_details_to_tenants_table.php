<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->string('slug', 160)->nullable()->unique()->after('name');
            $table->string('npi', 10)->nullable()->after('slug');
            $table->string('phone', 20)->nullable()->after('npi');
            $table->string('address_line', 255)->nullable()->after('phone');
            $table->string('city', 100)->nullable()->after('address_line');
            $table->string('state', 100)->nullable()->after('city');
            $table->string('postal_code', 20)->nullable()->after('state');
        });

        // Backfill any tenants that already existed before this column did,
        // so the NOT NULL constraint below doesn't fail against them.
        DB::table('tenants')->whereNull('slug')->orderBy('id')->each(function ($tenant) {
            $base = Str::slug($tenant->name);
            $slug = $base;
            $suffix = 2;

            while (DB::table('tenants')->where('slug', $slug)->exists()) {
                $slug = "{$base}-{$suffix}";
                $suffix++;
            }

            DB::table('tenants')->where('id', $tenant->id)->update(['slug' => $slug]);
        });

        Schema::table('tenants', function (Blueprint $table) {
            $table->string('slug', 160)->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['slug', 'npi', 'phone', 'address_line', 'city', 'state', 'postal_code']);
        });
    }
};
