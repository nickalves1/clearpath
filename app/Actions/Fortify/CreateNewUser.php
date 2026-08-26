<?php

namespace App\Actions\Fortify;

use App\Concerns\CompanyValidationRules;
use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use CompanyValidationRules, PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            ...$this->companyRules(),
        ])->validate();

        return DB::transaction(function () use ($input): User {
            $tenant = Tenant::create([
                'name' => $input['company_name'],
                'npi' => $input['npi'] ?? null,
                'phone' => $input['phone'] ?? null,
                'address_line' => $input['address_line'] ?? null,
                'city' => $input['city'] ?? null,
                'state' => $input['state'] ?? null,
                'postal_code' => $input['postal_code'] ?? null,
            ]);

            return User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
                'tenant_id' => $tenant->id,
            ])->assignRole('admin');
        });
    }
}
