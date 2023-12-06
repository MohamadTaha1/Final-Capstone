<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Auth::user()->orders;
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'items' => 'required|array',
            'notes' => 'sometimes|string|max:255',
        ]);

        // Initialize total price
        $totalPrice = 0;

        // Start a transaction
        \DB::beginTransaction();

        try {
            $order = Order::create([
                'user_id' => Auth::id(),
                'restaurant_id' => $validatedData['restaurant_id'],
                'total_price' => 0, // Temporarily set to 0
                'status' => 'pending',
                'notes' => $validatedData['notes'] ?? null,
            ]);

            foreach ($validatedData['items'] as $item) {
                $dish = Dish::findOrFail($item['dish_id']);
                $itemTotal = $dish->price * $item['quantity'];
                $totalPrice += $itemTotal;

                OrderDetail::create([
                    'order_id' => $order->id,
                    'dish_id' => $dish->id,
                    'quantity' => $item['quantity'],
                    'price' => $dish->price,
                ]);
            }

            // Update the total price of the order
            $order->update(['total_price' => $totalPrice]);

            // Commit the transaction
            \DB::commit();

            return response()->json(['message' => 'Order placed successfully', 'order' => $order]);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            \DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
        $order = Auth::user()->orders()->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    public function getRestaurantOrders()
    {
        $ownerId = Auth::id();
        $restaurant = Restaurant::where('owner_id', $ownerId)->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $orders = Order::where('restaurant_id', $restaurant->id)
        ->with(['orderDetails.dish'])
        ->get();

        return response()->json($orders);
    }

    public function confirmOrder($id)
    {
        $ownerId = Auth::id();
        $order = Order::whereHas('restaurant', function($query) use ($ownerId) {
            $query->where('owner_id', $ownerId);
        })->findOrFail($id);

        // Change status to "Approved, preparing"
        $order->status = 'Approved, preparing';
        $order->save();

        return response()->json(['message' => 'Order status updated successfully', 'order' => $order]);
    }

    public function availableForDelivery()
    {
        if (Auth::user()->role !== 'delivery') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $orders = Order::whereNull('delivery_user_id')->with(['orderDetails.dish'])->get();
        return response()->json($orders);
    }
    public function takeOrderForDelivery($orderId)
    {
        if (Auth::user()->role !== 'delivery') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order = Order::findOrFail($orderId);

        if ($order->delivery_user_id) {
            return response()->json(['message' => 'Order already taken'], 400);
        }

        $order->delivery_user_id = Auth::id();
        $order->save();

        return response()->json(['message' => 'Order taken successfully', 'order' => $order]);
    }
    



}

