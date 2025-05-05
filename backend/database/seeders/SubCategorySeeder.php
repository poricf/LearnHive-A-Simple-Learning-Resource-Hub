<?php

namespace Database\Seeders;

use App\Models\SubCategory;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    public function run()
    {
        SubCategory::create(['name' => 'React', 'category_id' => 1]); // Web Development
        SubCategory::create(['name' => 'Flutter', 'category_id' => 2]); // Mobile Development
        SubCategory::create(['name' => 'Python', 'category_id' => 3]); // Data Science
    }
}