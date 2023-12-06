<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Fillable attributes for mass assignment
    protected $fillable = [
        'user_id',
        'restaurant_id',
        'total_price',
        'status',
        'notes'
    ];

    // Define the relationship with User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function deliveryUser()
    {
        return $this->belongsTo(User::class, 'delivery_user_id');
    }


    // Define the relationship with Restaurant
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    // Relationship with OrderDetail
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

}
