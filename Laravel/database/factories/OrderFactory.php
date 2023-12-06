<?php

namespace Database\Factories;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'restaurant_id' => \App\Models\Restaurant::factory(),
            'total_price' => $this->faker->randomFloat(2, 10, 500),
            'status' => $this->faker->randomElement(['pending', 'accepted', 'preparing', 'on_the_way', 'delivered', 'cancelled']),
            'notes' => $this->faker->text(200),
        ];
    }
}
