<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'number_of_ratings',
        'total_rating'
    ];

    public $timestamps = false; // Assuming you don't need timestamps for this model

    // Define the relationship to a Restaurant
    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
