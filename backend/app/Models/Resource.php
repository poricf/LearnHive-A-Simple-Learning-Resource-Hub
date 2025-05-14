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

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }

        if (isset($filters['type'])) {
            $query->where('type_id', $filters['type']);
        }

        return $query;
    }

    public function bookmarkedByUsers()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
