<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class PatientAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_radiologist_can_list_patients(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/v1/patients');

        $response->assertOk();
    }

    public function test_non_radiologist_cannot_list_patients(): void
    {
        $user = User::factory()->receptionist()->create();

        $response = $this->actingAs($user)->getJson('/api/v1/patients');

        $response->assertForbidden();
    }

    public function test_radiologist_can_create_patient(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/patients', [
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
        $user = User::factory()->receptionist()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/patients', [
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
        $user = User::factory()->receptionist()->create();
        $patient = Patient::factory()->create();

        $response = $this->actingAs($user)->putJson("/api/v1/patients/{$patient->id}", [
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

    public function test_denied_action_is_logged_with_user_ability_and_resource_but_no_patient_data(): void
    {
        Log::spy();
        $user = User::factory()->receptionist()->create();
        $patient = Patient::factory()->create();

        $this->actingAs($user)->putJson("/api/v1/patients/{$patient->id}", [
            'first_name' => 'New Name',
            'last_name' => $patient->last_name,
            'birth_date' => $patient->birth_date,
            'gender' => $patient->gender,
            'email' => $patient->email,
            'phone' => $patient->phone,
            'medical_record_number' => $patient->medical_record_number,
        ])->assertForbidden();

        Log::shouldHaveReceived('warning')->once()->with('Authorization denied', [
            'user_id' => $user->id,
            'ability' => 'update',
            'resource' => 'Patient',
            'resource_id' => $patient->id,
            'ip' => '127.0.0.1',
        ]);
    }

    public function test_denied_action_still_returns_403_when_the_logging_backend_is_unreachable(): void
    {
        Log::shouldReceive('warning')->once()->andThrow(new \RuntimeException('Elasticsearch unreachable'));
        $user = User::factory()->receptionist()->create();
        $patient = Patient::factory()->create();

        $response = $this->actingAs($user)->putJson("/api/v1/patients/{$patient->id}", [
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
        $user = User::factory()->receptionist()->create();

        $response = $this->actingAs($user)->get('/patients');

        $response->assertForbidden();
    }

    public function test_radiologist_can_visit_the_patients_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/patients');

        $response->assertOk();
    }
}
