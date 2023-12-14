<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\DailySpecial;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function viewSpecials()
    {
        $specials = DailySpecial::all();
        return response()->json($specials);
    }


    public function subscribe(Request $request)
    {
        $validatedData = $request->validate([
            'daily_special_id' => 'required|exists:daily_specials,id',
            // Additional validation fields if necessary
        ]);

        $subscription = Subscription::create([
            'user_id' => auth()->id(),
            'daily_special_id' => $validatedData['daily_special_id'],
            // Other fields as required
        ]);

        return response()->json($subscription, 201);
    }


    public function userSubscriptions()
    {
        $userId = auth()->id();
        $subscriptions = Subscription::where('user_id', $userId)->get();
        return response()->json($subscriptions);
    }


    public function unsubscribe($id)
    {
        $subscription = Subscription::where('id', $id)
                                     ->where('user_id', auth()->id())
                                     ->firstOrFail();
        $subscription->delete();
        return response()->json(['message' => 'Unsubscribed successfully']);
    }

}
