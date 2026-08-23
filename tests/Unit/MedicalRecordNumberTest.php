<?php

namespace Tests\Unit;

use App\ValueObjects\MedicalRecordNumber;
use InvalidArgumentException;
use Tests\TestCase;

class MedicalRecordNumberTest extends TestCase
{
    public function test_accepts_a_valid_medical_record_number(): void
    {
        $mrn = new MedicalRecordNumber('MRN-00042');

        $this->assertSame('MRN-00042', $mrn->value());
        $this->assertSame('MRN-00042', (string) $mrn);
        $this->assertSame('MRN-00042', $mrn->jsonSerialize());
    }

    public function test_accepts_exactly_30_characters(): void
    {
        $mrn = new MedicalRecordNumber(str_repeat('A', 30));

        $this->assertSame(30, mb_strlen($mrn->value()));
    }

    public function test_rejects_an_empty_string(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new MedicalRecordNumber('');
    }

    public function test_rejects_more_than_30_characters(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new MedicalRecordNumber(str_repeat('A', 31));
    }
}
