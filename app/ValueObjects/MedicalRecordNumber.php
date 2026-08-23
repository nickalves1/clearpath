<?php

namespace App\ValueObjects;

use InvalidArgumentException;
use JsonSerializable;

final readonly class MedicalRecordNumber implements JsonSerializable
{
    private string $value;

    public function __construct(string $value)
    {
        if ($value === '' || mb_strlen($value) > 30) {
            throw new InvalidArgumentException("Invalid medical record number: [{$value}]. Must be 1 to 30 characters.");
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
