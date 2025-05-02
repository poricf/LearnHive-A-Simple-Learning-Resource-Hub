<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResourceRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'resource_id',
        'rating',
    ];

    /**
     * Get the user who made the rating.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the resource that was rated.
     */
    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }
}