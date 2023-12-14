<?php

namespace App\Http\Controllers;

use App\Models\DailySpecial;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class DailySpecialController extends Controller
{
    public function index()
    {
        $ownerId = auth()->id();
        $dailySpecials = DailySpecial::whereHas('restaurant', function($query) use ($ownerId) {
            $query->where('owner_id', $ownerId);
        })->get();

        return response()->json($dailySpecials);
    }

    public function store(Request $request)
    {
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'day_of_week' => 'required|integer|min:0|max:6', // Assuming 0 is Sunday, 6 is Saturday
            'description' => 'required|string',
            'price' => 'required|numeric'
        ]);

        $restaurant = Restaurant::findOrFail($request->restaurant_id);
        if ($restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $dailySpecial = DailySpecial::create($request->all());
        return response()->json($dailySpecial, 201);
    }


    public function show($id)
    {
        $dailySpecial = DailySpecial::with('restaurant')->findOrFail($id);
        if ($dailySpecial->restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($dailySpecial);
    }


    public function update(Request $request, $id)
    {
        $dailySpecial = DailySpecial::with('restaurant')->findOrFail($id);
        if ($dailySpecial->restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'day_of_week' => 'required|integer|min:0|max:6',
            'description' => 'required|string',
            'price' => 'required|numeric'
        ]);

        $dailySpecial->update($request->only(['day_of_week', 'description', 'price']));
        return response()->json($dailySpecial);
    }


    public function destroy($id)
    {
        $dailySpecial = DailySpecial::with('restaurant')->findOrFail($id);
        if ($dailySpecial->restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $dailySpecial->delete();
        return response()->json(['message' => 'Daily Special deleted successfully']);
    }

}

