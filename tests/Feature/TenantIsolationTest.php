<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_cannot_list_another_tenants_patients(): void
    {
        $tenantA = Tenant::factory()->create();
        $tenantB = Tenant::factory()->create();

        $userA = User::factory()->create(['role' => 'radiologist', 'tenant_id' => $tenantA->id]);
        Patient::factory()->create(['tenant_id' => $tenantA->id]);
        $patientB = Patient::factory()->create(['tenant_id' => $tenantB->id]);

        $response = $this->actingAs($userA)->getJson('/api/v1/patients');

        $response->assertOk();
        $response->assertJsonMissing(['id' => $patientB->id]);
    }

    public function test_a_user_cannot_fetch_another_tenants_patient_by_id(): void
    {
        $tenantA = Tenant::factory()->create();
        $tenantB = Tenant::factory()->create();

        $userA = User::factory()->create(['role' => 'radiologist', 'tenant_id' => $tenantA->id]);
        $patientB = Patient::factory()->create(['tenant_id' => $tenantB->id]);

        $response = $this->actingAs($userA)->putJson("/api/v1/patients/{$patientB->id}", [
            'first_name' => 'Hacked',
            'last_name' => $patientB->last_name,
            'birth_date' => $patientB->birth_date,
            'gender' => $patientB->gender,
            'email' => $patientB->email,
            'phone' => $patientB->phone,
            'medical_record_number' => $patientB->medical_record_number,
        ]);

        $response->assertNotFound();
    }

    public function test_creating_a_patient_assigns_the_authenticated_users_tenant(): void
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['role' => 'radiologist', 'tenant_id' => $tenant->id]);

        $response = $this->actingAs($user)->postJson('/api/v1/patients', [
            'first_name' => 'Ana',
            'last_name' => 'Silva',
            'birth_date' => '1990-01-01',
            'gender' => 'Female',
            'email' => 'ana.silva@gmail.com',
            'phone' => '11999999999',
            'medical_record_number' => 'MRN-12345',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('patients', [
            'medical_record_number' => 'MRN-12345',
            'tenant_id' => $tenant->id,
        ]);
    }

    public function test_two_tenants_can_reuse_the_same_medical_record_number(): void
    {
        $tenantA = Tenant::factory()->create();
        $tenantB = Tenant::factory()->create();

        Patient::factory()->create(['tenant_id' => $tenantA->id, 'medical_record_number' => 'MRN-001']);
        $userB = User::factory()->create(['role' => 'radiologist', 'tenant_id' => $tenantB->id]);

        $response = $this->actingAs($userB)->postJson('/api/v1/patients', [
            'first_name' => 'Carlos',
            'last_name' => 'Souza',
            'birth_date' => '1985-05-05',
            'gender' => 'Male',
            'email' => 'carlos.souza@gmail.com',
            'phone' => '11988888888',
            'medical_record_number' => 'MRN-001',
        ]);

        $response->assertCreated();
    }
}
