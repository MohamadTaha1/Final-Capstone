<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dish;

class DishSeeder extends Seeder
{
    public function run(): void
    {
        Dish::factory(50)->create(); // Assuming each menu has 5 dishes
    }
}
