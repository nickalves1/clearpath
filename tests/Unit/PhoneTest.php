<?php

namespace Tests\Unit;

use App\ValueObjects\Phone;
use InvalidArgumentException;
use Tests\TestCase;

class PhoneTest extends TestCase
{
    public function test_accepts_a_valid_phone_number(): void
    {
        $phone = new Phone('11999999999');

        $this->assertSame('11999999999', $phone->value());
        $this->assertSame('11999999999', (string) $phone);
        $this->assertSame('11999999999', $phone->jsonSerialize());
    }

    public function test_accepts_a_single_digit(): void
    {
        $phone = new Phone('1');

        $this->assertSame('1', $phone->value());
    }

    public function test_accepts_the_maximum_of_15_digits(): void
    {
        $phone = new Phone('123456789012345');

        $this->assertSame('123456789012345', $phone->value());
    }

    public function test_rejects_an_empty_string(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new Phone('');
    }

    public function test_rejects_non_digit_characters(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new Phone('(11) 99999-9999');
    }

    public function test_rejects_more_than_15_digits(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new Phone('1234567890123456');
    }
}
