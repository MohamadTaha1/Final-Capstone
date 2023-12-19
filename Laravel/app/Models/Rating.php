<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'user_id',
        'text',
        'rating'
    ];

    // Define the relationship to a Restaurant
    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    // Define the relationship to a User
    public function user() {
        return $this->belongsTo(User::class);
    }
}
