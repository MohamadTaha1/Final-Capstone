<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use App\Models\User;

class AssignDeliveryOrders extends Command
{
    protected $signature = 'app:assign-delivery-orders';
    protected $description = 'Assigns available orders to available delivery users';

    public function handle()
    {
        // Find orders that are approved and preparing and not yet taken by a delivery user
        $orders = Order::where('status', 'Approved, preparing')
                       ->whereNull('delivery_user_id')
                       ->get();

        // Find available delivery users
        $availableDeliveryUsers = User::where('is_available', true)
                                      ->whereDoesntHave('orders', function ($query) {
                                          $query->where('status', 'On the way');
                                      })
                                      ->get();

        // Assign orders to available delivery users
        foreach ($orders as $order) {
            if (!$availableDeliveryUsers->isEmpty()) {
                $deliveryUser = $availableDeliveryUsers->random();
                $order->delivery_user_id = $deliveryUser->id;
                $order->status = 'On the way';
                $order->save();

                // Remove the assigned user from the available list
                $availableDeliveryUsers = $availableDeliveryUsers->reject(function ($user) use ($deliveryUser) {
                    return $user->id === $deliveryUser->id;
                });
            }
        }

        $this->info('Assigned ' . $orders->count() . ' orders to delivery users.');
    }
}
