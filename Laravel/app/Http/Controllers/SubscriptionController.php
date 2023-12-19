<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        Log::info('Subscribe request received', ['request' => $request->all()]);

        $validatedData = $request->validate([
            'restaurantId' => 'required|exists:restaurants,id',
            'planType' => 'required|string',
        ]);

        $startDate = Carbon::now();
        $endDate = $this->calculateEndDate($validatedData['planType'], $startDate);

        $subscription = Subscription::create([
            'user_id' => Auth::id(),
            'restaurant_id' => $validatedData['restaurantId'],
            'subscription_type' => $validatedData['planType'],
            'start_date' => $startDate,
            'end_date' => $endDate,
            // other fields as needed
        ]);

        Log::info('Subscription created', ['subscription' => $subscription]);

        return response()->json($subscription, 201);
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
    $subscription = Subscription::with('restaurant')
                                ->where('user_id', $userId)
                                ->latest()
                                ->first();

    if (!$subscription) {
        return response()->json(['message' => 'No subscription found'], 404);
    }

    return response()->json($subscription);
}


    // ... other methods
}
