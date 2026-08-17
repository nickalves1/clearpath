<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class IndexPatientRequest extends FormRequest
{
public function rules(): array
{
    return [
        'column' => ['sometimes', Rule::in(['medical_record_number', 'first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email'])],
        'direction' => ['sometimes', Rule::in(['asc', 'desc'])],
    ];
}
}
