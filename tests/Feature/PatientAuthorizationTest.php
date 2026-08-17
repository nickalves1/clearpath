<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_radiologist_can_list_patients(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients');

        $response->assertOk();
    }

    public function test_non_radiologist_cannot_list_patients(): void
    {
        $user = User::factory()->create(['role' => 'receptionist']);

        $response = $this->actingAs($user)->getJson('/api/patients');

        $response->assertForbidden();
    }

    public function test_radiologist_can_create_patient(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->postJson('/api/patients', [
            'first_name' => 'Ana',
            'last_name' => 'Silva',
            'birth_date' => '1990-01-01',
            'gender' => 'Female',
            'email' => 'ana.silva@gmail.com',
            'phone' => '11999999999',
            'medical_record_number' => 'MRN-001',
        ]);

        $response->assertCreated();
    }

    public function test_non_radiologist_cannot_create_patient(): void
    {
        $user = User::factory()->create(['role' => 'receptionist']);

        $response = $this->actingAs($user)->postJson('/api/patients', [
            'first_name' => 'Ana',
            'last_name' => 'Silva',
            'birth_date' => '1990-01-01',
            'gender' => 'Female',
            'email' => 'ana.silva@gmail.com',
            'phone' => '11999999999',
            'medical_record_number' => 'MRN-001',
        ]);

        $response->assertForbidden();
    }

    public function test_non_radiologist_cannot_update_patient(): void
    {
        $user = User::factory()->create(['role' => 'receptionist']);
        $patient = Patient::factory()->create();

        $response = $this->actingAs($user)->putJson("/api/patients/{$patient->id}", [
            'first_name' => 'New Name',
            'last_name' => $patient->last_name,
            'birth_date' => $patient->birth_date,
            'gender' => $patient->gender,
            'email' => $patient->email,
            'phone' => $patient->phone,
            'medical_record_number' => $patient->medical_record_number,
        ]);

        $response->assertForbidden();
    }

    public function test_non_radiologist_is_blocked_from_the_patients_page(): void
    {
        $user = User::factory()->create(['role' => 'receptionist']);

        $response = $this->actingAs($user)->get('/patients');

        $response->assertForbidden();
    }

    public function test_radiologist_can_visit_the_patients_page(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->get('/patients');

        $response->assertOk();
    }
}
