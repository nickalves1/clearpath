<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexPatientRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'column' => ['sometimes', Rule::in(['medical_record_number', 'first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email'])],
            'direction' => ['sometimes', Rule::in(['asc', 'desc'])],
        ];
    }
}
