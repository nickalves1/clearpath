<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $hospitalA = Tenant::factory()->create(['name' => 'Saint Mary General Hospital']);
        $hospitalB = Tenant::factory()->create(['name' => 'Riverside Imaging Center']);

        User::factory()->create([
            'name' => 'Saint Mary Admin',
            'email' => 'test@example.com',
            'tenant_id' => $hospitalA->id,
        ]);

        User::factory()->create([
            'name' => 'Riverside Admin',
            'email' => 'test2@example.com',
            'tenant_id' => $hospitalB->id,
        ]);

        Patient::factory()->count(5)->create(['tenant_id' => $hospitalA->id]);
        Patient::factory()->count(5)->create(['tenant_id' => $hospitalB->id]);
    }
}
