<?php
// app/Http/Controllers/MenuController.php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Restaurant;
use App\Models\Dish;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    // MenuController.php

    public function getOwnerMenu()
    {
        $ownerId = auth()->id();
        $restaurant = Restaurant::where('owner_id', $ownerId)->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $menu = Menu::where('restaurant_id', $restaurant->id)->with('dishes')->first();

        if (!$menu) {
            return response()->json(['message' => 'Menu not found'], 404);
        }

        return response()->json($menu);
    }

    // Display a listing of all menus
    public function index()
    {
        $menus = Menu::all();
        return response()->json($menus);
    }

    // Store a newly created menu in the database
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'title' => 'required|max:255',
            'description' => 'required',
        ]);

        $restaurant = Restaurant::find($validatedData['restaurant_id']);

        if ($restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $menu = Menu::create($validatedData);
        return response()->json(['message' => 'Menu created successfully', 'menu' => $menu]);
    }

    // Display the specified menu
    public function show($id)
    {
        $menu = Menu::with('dishes')->find($id);

        if (!$menu) {
            return response()->json(['message' => 'Menu not found'], 404);
        }

        return response()->json($menu);
    }

    // Update the specified menu in the database
    public function update(Request $request, $id)
    {
        $menu = Menu::with('restaurant')->find($id);

        if (!$menu) {
            return response()->json(['message' => 'Menu not found'], 404);
        }

        if ($menu->restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
        ]);

        $menu->update($validatedData);
        return response()->json($menu);
    }


    // Remove the specified menu from the database
    public function destroy($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json(['message' => 'Menu not found'], 404);
        }

        // Directly compare owner ID
        if ($menu->restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $menu->delete();
        return response()->json(['message' => 'Menu deleted successfully']);
    }

}
