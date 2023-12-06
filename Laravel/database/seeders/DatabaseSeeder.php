<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    // database/seeders/DatabaseSeeder.php
    public function run(): void
    {
        $this->call([
            RestaurantSeeder::class,
            MenuSeeder::class,
            DishSeeder::class,
            OrderSeeder::class,
            OrderDetailSeeder::class,
        ]);
    }

}
