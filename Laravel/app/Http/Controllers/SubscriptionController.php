<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\Restaurant;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
{
    Log::info('Subscribe request received', ['request' => $request->all()]);

    $validatedData = $request->validate([
        'restaurantId' => 'required|exists:restaurants,id',
        'planType' => 'required|string',
    ]);

    $userId = Auth::id();
    $startDate = Carbon::now();
    $endDate = $this->calculateEndDate($validatedData['planType'], $startDate);

    // Check if the user is already subscribed to the restaurant
    $existingSubscription = Subscription::where('user_id', $userId)
                                        ->where('restaurant_id', $validatedData['restaurantId'])
                                        ->first();

    if ($existingSubscription) {
        // Update the existing subscription
        $existingSubscription->update([
            'subscription_type' => $validatedData['planType'],
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);
        Log::info('Subscription updated', ['subscription' => $existingSubscription]);
        return response()->json($existingSubscription, 200);
    } else {
        // Create a new subscription
        $subscription = Subscription::create([
            'user_id' => $userId,
            'restaurant_id' => $validatedData['restaurantId'],
            'subscription_type' => $validatedData['planType'],
            'start_date' => $startDate,
            'end_date' => $endDate,
            // other fields as needed
        ]);
        Log::info('Subscription created', ['subscription' => $subscription]);
        return response()->json($subscription, 201);
    }
}

    private function calculateEndDate($planType, $startDate)
    {
        if ($planType == 'Basic Plan') {
            return $startDate->copy()->addDays(7);
        } else if ($planType == 'Premium Plan') {
            return $startDate->copy()->addDays(30);
        }

        // Fallback if plan type doesn't match
        return $startDate->copy()->addDays(30); // Default to 30 days
    }

    public function getUserSubscriptionDetails()
{
    $userId = Auth::id(); // Get the logged-in user's ID
    $subscriptions = Subscription::with('restaurant')
                                 ->where('user_id', $userId)
                                 ->get();

    if ($subscriptions->isEmpty()) {
        return response()->json(['message' => 'No subscriptions found'], 404);
    }

    return response()->json($subscriptions);
}


public function getActiveSubscriptionsForOwner()
    {
        $ownerId = Auth::id(); // Get the logged-in owner's ID

        // Assuming each owner has one restaurant, for simplicity
        // If an owner can have multiple restaurants, you might need to adjust the query
        $restaurantId = Restaurant::where('owner_id', $ownerId)->pluck('id')->first();

        if (!$restaurantId) {
            return response()->json(['message' => 'Restaurant not found for owner'], 404);
        }

        $subscriptions = Subscription::where('restaurant_id', $restaurantId)
                                     ->where('end_date', '>', Carbon::now()) // Only active subscriptions
                                     ->orderBy('start_date', 'asc') // Sorted by start date
                                     ->get(['user_id', 'subscription_type', 'start_date', 'end_date']);

        return response()->json(['subscriptions' => $subscriptions]);
    }


    // ... other methods
}
