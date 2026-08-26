<?php

namespace App\Concerns;

use Illuminate\Contracts\Validation\ValidationRule;

trait CompanyValidationRules
{
    /**
     * Get the validation rules used to validate companies.
     *
     * @return array<string, array<int, ValidationRule|array<mixed>|string>>
     */
    protected function companyRules(): array
    {
        return [
            'company_name' => ['required', 'string', 'max:150'],
            'npi' => ['nullable', 'digits:10'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address_line' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
        ];
    }
}
