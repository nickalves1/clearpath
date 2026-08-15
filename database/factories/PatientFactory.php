<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'medical_record_number' => fake()->unique()->numerify('MRN-#####'),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'birth_date' => fake()->date(),
            'gender' => fake()->randomElement(['female', 'male']),
            'phone' => fake()->numerify('###########'),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
