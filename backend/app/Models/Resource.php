<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $fillable = [
        'title', 'type_id', 'about', 'source', 'rating',
        'ratingCount', 'category_id', 'thumbnail',
        'difficulty_id', 'link'
    ];
}
