<?php

namespace Tests\Unit;

use App\Models\Patient;
use App\Services\PatientsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientsServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_filters_patients_by_gender(): void
    {
        $male = Patient::factory()->create(['gender' => 'Male']);
        $female = Patient::factory()->create(['gender' => 'Female']);

        $result = (new PatientsService)->index(['filters' => ['gender' => 'Male']]);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($male->id));
        $this->assertFalse($ids->contains($female->id));
    }

    public function test_index_filters_patients_by_active_status(): void
    {
        $active = Patient::factory()->create();
        $inactive = Patient::factory()->create();
        $inactive->delete();

        $result = (new PatientsService)->index(['filters' => ['is_active' => 'true']]);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($active->id));
        $this->assertFalse($ids->contains($inactive->id));
    }

    public function test_index_filters_patients_by_inactive_status(): void
    {
        $active = Patient::factory()->create();
        $inactive = Patient::factory()->create();
        $inactive->delete();

        $result = (new PatientsService)->index(['filters' => ['is_active' => 'false']]);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($inactive->id));
        $this->assertFalse($ids->contains($active->id));
    }

    public function test_index_hides_deleted_patients_by_default(): void
    {
        $active = Patient::factory()->create();
        $deleted = Patient::factory()->create();
        $deleted->delete();

        $result = (new PatientsService)->index([]);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($active->id));
        $this->assertFalse($ids->contains($deleted->id));
    }

    public function test_index_filters_patients_by_created_at_custom_range(): void
    {
        $inRange = Patient::factory()->create(['created_at' => now()->subDays(2)]);
        $outOfRange = Patient::factory()->create(['created_at' => now()->subDays(20)]);

        $result = (new PatientsService)->index([
            'filters' => [
                'created_at' => 'custom',
                'created_at_from' => now()->subDays(5)->toDateString(),
                'created_at_to' => now()->toDateString(),
            ],
        ]);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($inRange->id));
        $this->assertFalse($ids->contains($outOfRange->id));
    }

    public function test_index_filters_patients_deleted_today(): void
    {
        $deletedToday = Patient::factory()->create();
        $deletedToday->delete();
        $notDeleted = Patient::factory()->create();

        $result = (new PatientsService)->index([
            'filters' => ['is_active' => 'all', 'deleted_at' => 'today'],
        ]);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($deletedToday->id));
        $this->assertFalse($ids->contains($notDeleted->id));
    }

    public function test_index_searches_patients_by_name(): void
    {
        $match = Patient::factory()->create(['first_name' => 'Nicolas']);
        $noMatch = Patient::factory()->create(['first_name' => 'Ana']);

        $result = (new PatientsService)->index(['search' => 'nicolas']);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($match->id));
        $this->assertFalse($ids->contains($noMatch->id));
    }

    public function test_index_searches_patients_by_medical_record_number(): void
    {
        $match = Patient::factory()->create(['medical_record_number' => 'MRN-99999']);
        $noMatch = Patient::factory()->create(['medical_record_number' => 'MRN-11111']);

        $result = (new PatientsService)->index(['search' => '99999']);
        $ids = $result->pluck('id');

        $this->assertTrue($ids->contains($match->id));
        $this->assertFalse($ids->contains($noMatch->id));
    }
}
