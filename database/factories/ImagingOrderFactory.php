<?php

namespace Database\Factories;

use App\Models\ImagingOrder;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ImagingOrder>
 */
class ImagingOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tenant_id' => fn () => Tenant::query()->value('id') ?? Tenant::factory(),
        ];
    }
}
