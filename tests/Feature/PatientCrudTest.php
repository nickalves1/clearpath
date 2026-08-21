<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_radiologist_can_create_a_patient_with_valid_data(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->postJson('/api/patients', [
            'first_name' => 'Ana',
            'last_name' => 'Silva',
            'birth_date' => '1990-01-01',
            'gender' => 'Female',
            'email' => 'ana.silva@gmail.com',
            'phone' => '11999999999',
            'medical_record_number' => 'MRN-12345',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('patients', ['medical_record_number' => 'MRN-12345']);
    }

    public function test_creating_a_patient_without_first_name_fails_validation(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->postJson('/api/patients', [
            'last_name' => 'Silva',
            'birth_date' => '1990-01-01',
            'gender' => 'Female',
            'email' => 'ana.silva@gmail.com',
            'phone' => '11999999999',
            'medical_record_number' => 'MRN-12345',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['first_name']);
    }

    public function test_creating_a_patient_with_a_duplicate_medical_record_number_fails_validation(): void
    {
        Patient::factory()->create(['medical_record_number' => 'MRN-DUPLICATE']);

        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->postJson('/api/patients', [
            'first_name' => 'Ana',
            'last_name' => 'Silva',
            'birth_date' => '1990-01-01',
            'gender' => 'Female',
            'email' => 'ana.silva@gmail.com',
            'phone' => '11999999999',
            'medical_record_number' => 'MRN-DUPLICATE',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['medical_record_number']);
    }

    public function test_radiologist_can_update_a_patient_with_valid_data(): void
    {
        $patient = Patient::factory()->create(['first_name' => 'Ana']);
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->putJson("/api/patients/{$patient->id}", [
            'first_name' => 'Ana Maria',
            'last_name' => $patient->last_name,
            'birth_date' => $patient->birth_date,
            'gender' => $patient->gender,
            'email' => 'ana.maria@gmail.com',
            'phone' => $patient->phone,
            'medical_record_number' => $patient->medical_record_number,
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('patients', ['id' => $patient->id, 'first_name' => 'Ana Maria']);
    }

    public function test_updating_a_patient_with_an_invalid_email_fails_validation(): void
    {
        $patient = Patient::factory()->create();
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->putJson("/api/patients/{$patient->id}", [
            'first_name' => $patient->first_name,
            'last_name' => $patient->last_name,
            'birth_date' => $patient->birth_date,
            'gender' => $patient->gender,
            'email' => 'not-an-email',
            'phone' => $patient->phone,
            'medical_record_number' => $patient->medical_record_number,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_radiologist_can_delete_a_patient(): void
    {
        $patient = Patient::factory()->create();
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->deleteJson("/api/patients/{$patient->id}");

        $response->assertNoContent();
        $this->assertSoftDeleted('patients', ['id' => $patient->id]);
    }

    public function test_deleted_patient_does_not_appear_in_the_default_listing(): void
    {
        $patient = Patient::factory()->create();
        $user = User::factory()->create(['role' => 'radiologist']);

        $this->actingAs($user)->deleteJson("/api/patients/{$patient->id}")->assertNoContent();

        $response = $this->actingAs($user)->getJson('/api/patients');

        $response->assertOk();
        $response->assertJsonMissing(['id' => $patient->id]);
    }
}
