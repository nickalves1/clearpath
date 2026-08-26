<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tenant>
 */
class TenantFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->company(),
            'npi' => fake()->numerify('##########'),
            'phone' => fake()->numerify('###########'),
            'address_line' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state' => fake()->randomElement(['CA', 'FL', 'IL', 'NY', 'TX', 'WA']),
            'postal_code' => fake()->postcode(),
        ];
    }
}
