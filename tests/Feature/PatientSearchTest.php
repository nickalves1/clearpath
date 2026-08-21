<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientSearchTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_radiologist_can_filter_patients(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);
        $male = Patient::factory()->create(['gender' => 'Male']);
        $female = Patient::factory()->create(['gender' => 'Female']);

        $response = $this->actingAs($user)->getJson('/api/patients?filters[gender]=Male');

        $response->assertOk();
        $response->assertJsonFragment(['id' => $male->id]);
        $response->assertJsonMissing(['id' => $female->id]);
    }

    public function test_radiologist_receives_validation_error_for_invalid_gender_filter(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?filters[gender]=Invalid');

        $response->assertUnprocessable();
    }

    public function test_radiologist_can_filter_patients_by_active_status(): void
    {
        $active = Patient::factory()->create();
        $inactive = Patient::factory()->create();
        $inactive->delete();

        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?filters[is_active]=true');

        $response->assertOk();
        $response->assertJsonFragment(['id' => $active->id]);
        $response->assertJsonMissing(['id' => $inactive->id]);
    }

    public function test_radiologist_can_filter_patients_by_inactive_status(): void
    {
        $active = Patient::factory()->create();
        $inactive = Patient::factory()->create();
        $inactive->delete();

        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?filters[is_active]=false');

        $response->assertOk();
        $response->assertJsonFragment(['id' => $inactive->id]);
        $response->assertJsonMissing(['id' => $active->id]);
    }

    public function test_radiologist_can_filter_patients_by_created_at_custom_range(): void
    {
        $inRange = Patient::factory()->create(['created_at' => now()->subDays(2)]);
        $outOfRange = Patient::factory()->create(['created_at' => now()->subDays(20)]);

        $user = User::factory()->create(['role' => 'radiologist']);

        $from = now()->subDays(5)->toDateString();
        $to = now()->toDateString();

        $response = $this->actingAs($user)->getJson("/api/patients?filters[created_at]=custom&filters[created_at_from]={$from}&filters[created_at_to]={$to}");

        $response->assertOk();
        $response->assertJsonFragment(['id' => $inRange->id]);
        $response->assertJsonMissing(['id' => $outOfRange->id]);
    }

    public function test_radiologist_receives_validation_error_for_invalid_created_at_preset(): void
    {
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?filters[created_at]=not_a_real_preset');

        $response->assertUnprocessable();
    }

    public function test_radiologist_can_filter_patients_deleted_today(): void
    {
        $deletedToday = Patient::factory()->create();
        $deletedToday->delete();

        $notDeleted = Patient::factory()->create();

        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?filters[is_active]=all&filters[deleted_at]=today');

        $response->assertOk();
        $response->assertJsonFragment(['id' => $deletedToday->id]);
        $response->assertJsonMissing(['id' => $notDeleted->id]);
    }

    public function test_radiologist_can_search_patients_by_name(): void
    {
        $match = Patient::factory()->create(['first_name' => 'Nicolas']);
        $noMatch = Patient::factory()->create(['first_name' => 'Ana']);

        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?search=nicolas');

        $response->assertOk();
        $response->assertJsonFragment(['id' => $match->id]);
        $response->assertJsonMissing(['id' => $noMatch->id]);
    }

    public function test_radiologist_can_search_patients_by_medical_record_number(): void
    {
        $match = Patient::factory()->create(['medical_record_number' => 'MRN-99999']);
        $noMatch = Patient::factory()->create(['medical_record_number' => 'MRN-11111']);

        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?search=99999');

        $response->assertOk();
        $response->assertJsonFragment(['id' => $match->id]);
        $response->assertJsonMissing(['id' => $noMatch->id]);
    }
}
