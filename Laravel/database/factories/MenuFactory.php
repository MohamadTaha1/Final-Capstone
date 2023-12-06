<?php

namespace Database\Factories;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;

class MenuFactory extends Factory
{
    protected $model = Menu::class;

    public function definition(): array
    {
        return [
            'restaurant_id' => \App\Models\Restaurant::factory(),
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->sentence,
        ];
    }
}
