<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::create(['name' => 'Web Development']);
        Category::create(['name' => 'Mobile Development']);
        Category::create(['name' => 'Data Science']);
    }
}