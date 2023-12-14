<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'description',
        'address',
        'phone_number',
        'email',
        'image',
        'owner_id',
    ];

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

        public function dailySpecials()
    {
        return $this->hasMany(DailySpecial::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }


}
