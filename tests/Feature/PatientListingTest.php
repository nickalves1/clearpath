<?php

namespace Tests\Feature;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientListingTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_first_page_returns_ten_patients(): void
    {
        Patient::factory()->count(13)->create();
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients');

        $response->assertOk();
        $response->assertJsonCount(10, 'data');
        $response->assertJsonPath('meta.total', 13);
    }

    public function test_the_second_page_returns_the_remaining_patients(): void
    {
        Patient::factory()->count(13)->create();
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?page=2');

        $response->assertOk();
        $response->assertJsonCount(3, 'data');
    }

    public function test_patients_can_be_sorted_by_first_name_ascending(): void
    {
        Patient::factory()->create(['first_name' => 'Zeca']);
        Patient::factory()->create(['first_name' => 'Ana']);
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?sort=first_name');

        $response->assertOk();
        $response->assertJsonPath('data.0.first_name', 'Ana');
        $response->assertJsonPath('data.1.first_name', 'Zeca');
    }

    public function test_patients_can_be_sorted_by_first_name_descending(): void
    {
        Patient::factory()->create(['first_name' => 'Zeca']);
        Patient::factory()->create(['first_name' => 'Ana']);
        $user = User::factory()->create(['role' => 'radiologist']);

        $response = $this->actingAs($user)->getJson('/api/patients?sort=-first_name');

        $response->assertOk();
        $response->assertJsonPath('data.0.first_name', 'Zeca');
        $response->assertJsonPath('data.1.first_name', 'Ana');
    }
}
