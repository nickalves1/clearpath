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
        $datePreset = ['all', 'today', 'last_7_days', 'last_30_days', 'custom'];

        return [
            'column' => ['sometimes', Rule::in(['medical_record_number', 'first_name', 'last_name', 'birth_date', 'gender', 'phone', 'email'])],
            'direction' => ['sometimes', Rule::in(['asc', 'desc'])],

            'filters' => ['sometimes', 'array'],
            'filters.is_active' => ['sometimes', Rule::in(['all', 'true', 'false'])],
            'filters.gender' => ['sometimes', Rule::in(['all', 'Male', 'Female', 'Other', 'Prefer not to say'])],
            'filters.created_at' => ['sometimes', Rule::in($datePreset)],
            'filters.created_at_from' => ['sometimes', 'nullable', 'date'],
            'filters.created_at_to' => ['sometimes', 'nullable', 'date', 'after_or_equal:filters.created_at_from'],
            'filters.deleted_at' => ['sometimes', Rule::in($datePreset)],
            'filters.deleted_at_from' => ['sometimes', 'nullable', 'date'],
            'filters.deleted_at_to' => ['sometimes', 'nullable', 'date', 'after_or_equal:filters.deleted_at_from'],
        ];
    }
}
