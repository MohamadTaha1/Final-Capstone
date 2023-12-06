<?php

namespace Database\Factories;

// database/factories/DishFactory.php
use App\Models\Dish;
use Illuminate\Database\Eloquent\Factories\Factory;

class DishFactory extends Factory
{
    protected $model = Dish::class;

    public function definition(): array
    {
        return [
            'menu_id' => \App\Models\Menu::factory(),
            'name' => $this->faker->word,
            'description' => $this->faker->text,
            'price' => $this->faker->randomFloat(2, 5, 100),
            'image' => $this->faker->imageUrl,
            'available' => $this->faker->boolean,
        ];
    }
}

