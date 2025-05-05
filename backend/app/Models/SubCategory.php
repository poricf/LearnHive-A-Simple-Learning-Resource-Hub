<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $fillable = ['name', 'category_id'];

    // Disable timestamps
    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}