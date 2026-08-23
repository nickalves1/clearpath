<?php

namespace Tests\Unit;

use App\Models\Patient;
use App\ValueObjects\Email;
use App\ValueObjects\MedicalRecordNumber;
use App\ValueObjects\Phone;
use Illuminate\Foundation\Testing\RefreshDatabase;
use InvalidArgumentException;
use Tests\TestCase;

class PatientValueObjectCastingTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_phone_email_and_medical_record_number_are_cast_to_value_objects(): void
    {
        $patient = Patient::factory()->create([
            'phone' => '11999999999',
            'email' => 'nicolas@example.com',
            'medical_record_number' => 'MRN-00042',
        ]);

        $this->assertInstanceOf(Phone::class, $patient->phone);
        $this->assertInstanceOf(Email::class, $patient->email);
        $this->assertInstanceOf(MedicalRecordNumber::class, $patient->medical_record_number);

        $this->assertSame('11999999999', (string) $patient->phone);
        $this->assertSame('nicolas@example.com', (string) $patient->email);
        $this->assertSame('MRN-00042', (string) $patient->medical_record_number);
    }

    public function test_the_value_objects_survive_a_round_trip_through_the_database(): void
    {
        $patient = Patient::factory()->create(['phone' => '11988887777']);

        $fromDatabase = Patient::findOrFail($patient->id);

        $this->assertInstanceOf(Phone::class, $fromDatabase->phone);
        $this->assertSame('11988887777', (string) $fromDatabase->phone);
    }

    public function test_updating_with_an_invalid_phone_throws_before_reaching_the_database(): void
    {
        $patient = Patient::factory()->create();

        $this->expectException(InvalidArgumentException::class);

        $patient->update(['phone' => 'not-a-phone-number']);
    }

    public function test_updating_with_an_invalid_email_throws_before_reaching_the_database(): void
    {
        $patient = Patient::factory()->create();

        $this->expectException(InvalidArgumentException::class);

        $patient->update(['email' => 'not-an-email']);
    }

    public function test_assigning_a_value_object_directly_is_accepted_the_same_as_a_raw_string(): void
    {
        $patient = Patient::factory()->create();

        $patient->update(['phone' => new Phone('11977776666')]);

        $this->assertSame('11977776666', (string) $patient->fresh()->phone);
    }
}
