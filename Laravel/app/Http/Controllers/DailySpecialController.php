<?php

namespace App\Http\Controllers;

use App\Models\DailySpecial;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;


class DailySpecialController extends Controller
{

    public function store(Request $request)
    {
        $ownerId = auth()->id();

        // Validate each element of the array
        $data = collect($request->all());
        $data->each(function ($item) use ($ownerId) {
            $validator = Validator::make($item, [
                'restaurant_id' => ['required', 'exists:restaurants,id', Rule::in(Restaurant::where('owner_id', $ownerId)->pluck('id'))],
                'dish_id' => 'required|exists:dishes,id',
                'day_of_week' => 'required|integer|min:0|max:6',
                'price' => 'required|numeric'
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
        });

        // Now create each daily special
        $dailySpecials = $data->map(function ($item) use ($ownerId) {
            // Check if the restaurant belongs to the owner
            $restaurant = Restaurant::where('id', $item['restaurant_id'])
                                    ->where('owner_id', $ownerId)
                                    ->firstOrFail();

            return DailySpecial::create([
                'restaurant_id' => $restaurant->id,
                'dish_id' => $item['dish_id'],
                'day_of_week' => $item['day_of_week'],
                'price' => $item['price']
            ]);
        });

        return response()->json($dailySpecials, 201);
    }

    public function showByRestaurant($restaurantId)
    {
        $ownerId = auth()->id();
        $dailySpecials = DailySpecial::where('restaurant_id', $restaurantId)
            ->whereHas('restaurant', function ($query) use ($ownerId) {
                $query->where('owner_id', $ownerId);
            })->get();

        // Ensuring that the id is included in the response
        $dailySpecials = $dailySpecials->map(function ($special) {
            return [
                'id' => $special->id,
                'dish_id' => $special->dish_id,
                'day_of_week' => $special->day_of_week,
                'price' => $special->price
            ];
        });

        return response()->json($dailySpecials);
    }


    public function update(Request $request, $id)
    {
        $dailySpecial = DailySpecial::findOrFail($id);
        $ownerId = auth()->id();

        // Make sure the restaurant owner is updating their own special
        if ($dailySpecial->restaurant->owner_id !== $ownerId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'dish_id' => 'required|exists:dishes,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'price' => 'required|numeric'
        ]);

        $dailySpecial->update($validatedData);

        return response()->json($dailySpecial);
    }

    public function getDailySpecialsForRestaurant($restaurantId)
    {
        $dailySpecials = DailySpecial::with('dish')
                                    ->where('restaurant_id', $restaurantId)
                                    ->get();

        if ($dailySpecials->isEmpty()) {
            return response()->json(['message' => 'No daily specials found'], 404);
        }

        return response()->json($dailySpecials);
    }


}

