<?php

namespace App\ValueObjects;

use InvalidArgumentException;
use JsonSerializable;

final readonly class Phone implements JsonSerializable
{
    private string $value;

    public function __construct(string $value)
    {
        if (! preg_match('/^\d{1,15}$/', $value)) {
            throw new InvalidArgumentException("Invalid phone number: [{$value}]. Expected 1 to 15 digits.");
        }

        $this->value = $value;
    }

    public function value(): string
    {
        return $this->value;
    }

    public function __toString(): string
    {
        return $this->value;
    }

    public function jsonSerialize(): string
    {
        return $this->value;
    }
}
