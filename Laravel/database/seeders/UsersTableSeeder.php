<?php

// database/seeders/UsersTableSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Make sure to hash passwords when creating users
        DB::table('users')->insert([
            [
                'name' => 'Customer User',
                'email' => 'customer@example.com',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chef User',
                'email' => 'chef@example.com',
                'password' => Hash::make('password'),
                'role' => 'chef',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Delivery User',
                'email' => 'delivery@example.com',
                'password' => Hash::make('password'),
                'role' => 'delivery',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
