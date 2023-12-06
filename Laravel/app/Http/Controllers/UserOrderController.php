<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // Import the Log facade

class UserOrderController extends Controller
{
    public function store(Request $request)
    {
        // Log the incoming request data
        Log::info('Order placement request received:', $request->all());

        $user = Auth::user();
        $cartItems = $request->input('cartItems');
        $restaurantId = $request->input('restaurant_id');

        // Before calculating the total price, check if cartItems is an array
        if (!is_array($cartItems)) {
            Log::error('cartItems is not an array', [
                'user_id' => $user->id,
                'cartItems' => $cartItems
            ]);
            return response()->json(['error' => 'Invalid cart items provided'], 422);
        }

        // Calculate total price
        $totalPrice = array_sum(array_map(function($item) {
            return $item['price'] * $item['quantity'];
        }, $cartItems));

        // Create Order
        $order = Order::create([
            'user_id' => $user->id,
            'restaurant_id' => $restaurantId,
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        // Create Order Details
        foreach ($cartItems as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'dish_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json(['message' => 'Order placed successfully', 'order' => $order]);
    }

    public function getUserOrders() {
        $user = Auth::user();
        $orders = $user->orders()->with('orderDetails')->get();

        return response()->json($orders);
    }
}

