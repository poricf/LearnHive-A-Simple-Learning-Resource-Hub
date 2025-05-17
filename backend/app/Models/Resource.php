<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function ratings(): HasMany
    {
        return $this->hasMany(ResourceRating::class);
    }


    public function updateRating(): void // void is a good return type hint here
    {
        // Calculate the average rating. If no ratings, default to 0.0
        // The 'rating' here is the column name in the 'resource_ratings' table
        $this->rating = $this->ratings()->avg('rating') ?? 0.0;

        // Count the number of ratings
        $this->ratingCount = $this->ratings()->count();

        // Save the changes to the resource model without triggering events (like 'updated')
        // which could cause loops if you have observers listening for resource updates
        // to then update ratings again.
        $this->saveQuietly();
        // If you don't have specific concerns about event loops, $this->save(); is also fine.
    }

    // ... other relationships or methods in your Resource model
}
