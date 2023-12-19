<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\User;
use App\Models\Restaurant;
use App\Models\Dish;


class DeliveryController extends Controller
{
    /**
     * Toggle the availability status of the delivery user.
     *
     * @return \Illuminate\Http\JsonResponse
     */

     public function getAvailability()
     {
         $user = Auth::user();

         return response()->json([
             'is_available' => $user->is_available
         ]);
     }

    public function toggleAvailability()
    {
        $user = Auth::user();

        // Check if the user is a delivery person
        if ($user->role !== 'Delivery') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Toggle the availability status
        $user->is_available = !$user->is_available;
        $user->save();

        return response()->json([
            'message' => 'Availability status updated.',
            'is_available' => $user->is_available
        ]);
    }


    public function getCurrentAssignedOrder()
    {
        $order = Order::with(['restaurant', 'user'])
                    ->where('delivery_user_id', Auth::id())
                    ->where('status', 'On the way')
                    ->first();

        if (!$order) {
            return response()->json(['message' => 'No current order assigned'], 404);
        }

        return response()->json($order);
    }


    public function markOrderAsDelivered(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        // Check if the logged-in delivery user is assigned to this order
        if ($order->delivery_user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Change the order status to 'Delivered'
        $order->status = 'Delivered';
        $order->save();

        return response()->json(['message' => 'Order marked as delivered']);
}


    public function getPastDeliveredOrders()
    {
        $orders = Order::with(['restaurant', 'user'])
                    ->where('delivery_user_id', Auth::id())
                    ->where('status', 'Delivered')
                    ->orderBy('updated_at', 'desc') // Sorting by delivery time
                    ->get();

        return response()->json($orders);
    }

}

