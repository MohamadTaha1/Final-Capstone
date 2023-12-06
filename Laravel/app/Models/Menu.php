<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function dishes()
    {
        return $this->hasMany(Dish::class);
    }


    protected $fillable = [
        'restaurant_id',
        'title',
        'description',

    ];


}
