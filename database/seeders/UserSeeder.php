<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(['name' => 'admin','email' => 'admin@gmail.com', 'role' => 'admin', 'password'=> 'admin','phone' => '083157157335']);
        User::create(['name' => 'vendor','email' => 'vendor@gmail.com',  'role' => 'vendor', 'password'=> 'vendor','phone' => '083157157330']);
        User::create(['name' => 'customer','email' => 'customer@gmail.com','role' => 'customer', 'password'=> 'customer','phone' => '083157157331']);
    }
}
