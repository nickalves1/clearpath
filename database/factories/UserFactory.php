<?php

namespace Database\Factories;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
            'tenant_id' => Tenant::query()->value('id') ?? Tenant::factory(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the model has two-factor authentication configured.
     */
    public function withTwoFactor(): static
    {
        return $this->state(fn (array $attributes) => [
            'two_factor_secret' => encrypt('secret'),
            'two_factor_recovery_codes' => encrypt(json_encode(['recovery-code-1'])),
            'two_factor_confirmed_at' => now(),
        ]);
    }

    /**
     * Hook Laravel calls automatically whenever this factory is used.
     * Defaults every created user to the radiologist role, unless a state
     * (like receptionist()) already assigned one.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            if ($user->roles->isEmpty()) {
                $user->assignRole('radiologist');
            }
        });
    }

    /**
     * Indicate that the model should have the receptionist role instead of
     * the default radiologist one.
     */
    public function receptionist(): static
    {
        return $this->afterCreating(fn (User $user) => $user->syncRoles(['receptionist']));
    }
}
