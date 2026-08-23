<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * These roles/permissions are reference data the application depends on
     * to function at all, not sample data — every environment (including a
     * freshly migrated test database) needs them, so they belong in a
     * migration, not a seeder that only some contexts remember to run.
     */
    public function up(): void
    {
        $managePatients = Permission::create(['name' => 'manage-patients']);
        $signReports = Permission::create(['name' => 'sign-reports']);

        Role::create(['name' => 'admin']);

        Role::create(['name' => 'radiologist'])->givePermissionTo([$managePatients, $signReports]);

        Role::create(['name' => 'receptionist']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Role::whereIn('name', ['admin', 'radiologist', 'receptionist'])->delete();
        Permission::whereIn('name', ['manage-patients', 'sign-reports'])->delete();
    }
};
