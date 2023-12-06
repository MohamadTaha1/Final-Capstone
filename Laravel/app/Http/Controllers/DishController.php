<?php
namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Menu;
use Illuminate\Http\Request;

class DishController extends Controller
{
    // Display a listing of all dishes
    public function index()
    {
        $dishes = Dish::all();
        return response()->json($dishes);
    }

    // Store a newly created dish in the database
    public function store(Request $request)
    {
        \Log::info($request->all()); // Add this line to log request data
        try {
            $validatedData = $request->validate([
                'menu_id' => 'required|exists:menus,id',
                'name' => 'required|max:255',
                'description' => 'required',
                'price' => 'required|numeric',
                'image' => 'required|url',
                'available' => 'required|boolean'
            ]);

            $menu = Menu::with('restaurant')->find($validatedData['menu_id']);
            if (!$menu || $menu->restaurant->owner_id !== auth()->id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $dish = Dish::create($validatedData);
            return response()->json($dish, 201);
        } catch (\Exception $e) {
            // Log the exception for debugging
            \Log::error('Error in DishController@store: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }



    // Update the specified dish in the database
    public function update(Request $request, $id)
{
    $dish = Dish::with('menu.restaurant')->find($id);

    if (!$dish) {
        return response()->json(['message' => 'Dish not found'], 404);
    }

    if ($dish->menu->restaurant->owner_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $validatedData = $request->validate([
        'name' => 'required|max:255',
        'description' => 'required',
        'price' => 'required|numeric',
        'image' => 'required|url',
        'available' => 'required|boolean'
    ]);

    $dish->update($validatedData);
    return response()->json($dish);
}


    // Remove the specified dish from the database

    public function destroy(Dish $dish)
    {
        if ($dish->menu->restaurant->owner_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $dish->delete();
        return response()->json(['message' => 'Dish deleted successfully']);
    }

}
