<?php

// app/Http/Controllers/RestaurantController.php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Dish;
use App\Models\Menu;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{


    public function index()
    {
        $restaurants = Restaurant::all(); 
        return response()->json($restaurants);
    }

    public function getOwnerRestaurants()
    {
        $ownerId = auth()->id(); // Get the logged-in user's ID
        $restaurants = Restaurant::where('owner_id', $ownerId)->get(); // Fetch restaurants owned by the user

        return response()->json($restaurants);
    }

    public function show($id)
    {
        $restaurant = Restaurant::with('menus.dishes')->find($id); // Include menus and their dishes

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        return response()->json($restaurant);
    }
    public function search(Request $request)
    {
        $query = $request->input('query');

        $restaurants = Restaurant::where('name', 'LIKE', "%{$query}%")
                         ->orWhere('description', 'LIKE', "%{$query}%")
                         ->get();

        return response()->json($restaurants);
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'email' => 'required|email',
            'image' => 'required|url',
        ]);

        $validatedData['owner_id'] = auth()->id();

        $restaurant = Restaurant::create($validatedData);

        return response()->json(['message' => 'Restaurant created successfully', 'restaurant' => $restaurant]);
    }

    public function update(Request $request, $id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        if ($restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|max:255',
            'description' => 'sometimes',
            'address' => 'sometimes',
            'phone_number' => 'sometimes',
            'email' => 'sometimes|email',
            'image' => 'sometimes|url',
        ]);

        $restaurant->update($validatedData);

        return response()->json(['message' => 'Restaurant updated successfully', 'restaurant' => $restaurant]);
    }


    public function destroy($id)
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        if ($restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $restaurant->delete();

        return response()->json(['message' => 'Restaurant deleted successfully']);
    }

}
