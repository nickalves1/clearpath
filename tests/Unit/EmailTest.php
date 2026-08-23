<?php

namespace Tests\Unit;

use App\ValueObjects\Email;
use InvalidArgumentException;
use Tests\TestCase;

class EmailTest extends TestCase
{
    public function test_accepts_a_valid_email(): void
    {
        $email = new Email('nicolas@example.com');

        $this->assertSame('nicolas@example.com', $email->value());
        $this->assertSame('nicolas@example.com', (string) $email);
        $this->assertSame('nicolas@example.com', $email->jsonSerialize());
    }

    public function test_rejects_a_string_without_an_at_sign(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new Email('not-an-email');
    }

    public function test_rejects_an_empty_string(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new Email('');
    }

    public function test_rejects_a_domain_without_a_dot(): void
    {
        $this->expectException(InvalidArgumentException::class);

        new Email('nicolas@localhost');
    }
}
