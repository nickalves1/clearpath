<?php

namespace App\ValueObjects;

use InvalidArgumentException;
use JsonSerializable;

final readonly class Email implements JsonSerializable
{
    private string $value;

    public function __construct(string $value)
    {
        if (filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
            throw new InvalidArgumentException("Invalid email address: [{$value}].");
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
