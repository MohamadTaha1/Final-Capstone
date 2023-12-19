<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
use App\Models\RestaurantRating;
use App\Models\Order;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    public function submitReview(Request $request) {
        try {
            \Log::info('submitReview API called with order_id: ' . $request->input('order_id'));

            $validatedData = $request->validate([
                'review_text' => 'required|string',
                'order_id' => 'required|integer|exists:orders,id'
            ]);

            $order = Order::find($validatedData['order_id']);
            \Log::info('Fetched order: ', ['order' => $order]);

            if (!$order) {
                \Log::error('Order not found with ID: ' . $validatedData['order_id']);
                return response()->json(['error' => 'Order not found'], 404);
            }

            $user = $request->user();
            \Log::info('User object: ', ['user' => $user]);

            if (!$user) {
                \Log::error('User not authenticated or not found');
                return response()->json(['error' => 'User not authenticated or not found'], 401);
            }

            $userId = auth()->id();
            $restaurantId = $order->restaurant_id;
            $reviewText = $validatedData['review_text']; // Define $reviewText here

            \Log::info('Executing Python script with reviewText: ' . $reviewText);

            // Python script path and command
            $scriptPath = base_path('App/PythonScripts/sentiment_analysis.py');
            $command = escapeshellcmd("python $scriptPath " . escapeshellarg($reviewText));
            $output = shell_exec($command);
            $sentimentResult = json_decode($output, true);
        $sentimentResult = json_decode($output, true);

        // Calculate the star rating based on the sentiment result
        $starRating = $this->calculateStarRating($sentimentResult);

        // Return the star rating
        $rating = Rating::create([
            'restaurant_id' => $restaurantId,
            'user_id' => $userId,
            'text' => $validatedData['review_text'],
            'rating' => $this->calculateStarRating($sentimentResult)
        ]);
        $restaurantRating = RestaurantRating::updateOrCreate(
            ['restaurant_id' => $restaurantId],
            ['number_of_ratings' => DB::raw('number_of_ratings + 1'), 'total_rating' => DB::raw('total_rating + ' . $starRating)]
        );

            \Log::info('Review submitted successfully');
            return response()->json(['message' => 'Review submitted successfully']);
        } catch (\Exception $e) {
            \Log::error('Error in submitReview: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }

    private function calculateStarRating($sentimentResult) {
        if (!empty($sentimentResult)) {
            $label = $sentimentResult[0]['label'];
            $score = $sentimentResult[0]['score'];

            if ($label === 'POSITIVE') {
                if ($score > 0.99) {
                    return 5;
                } elseif ($score > 0.95) {
                    return 4;
                } else {
                    return 3;
                }
            } elseif ($label === 'NEGATIVE') {
                if ($score > 0.99) {
                    return 1;
                } elseif ($score > 0.95) {
                    return 2;
                } else {
                    return 3;
                }
            }
        }
        return null;
    }

    public function getFeedbacks()
    {
        $restaurantsWithFeedback = Restaurant::has('ratings')
            ->with(['ratings' => function ($query) {
                $query->latest()->take(10);
            }])
            ->take(5)
            ->get();

        $feedbacks = $restaurantsWithFeedback->map(function ($restaurant) {
            return [
                'restaurant_id' => $restaurant->id,
                'restaurant_name' => $restaurant->name,
                'feedbacks' => $restaurant->ratings->map(function ($rating) {
                    return [
                        'text' => $rating->text,
                        'star_rating' => $rating->rating,
                    ];
                })
            ];
        });

        return response()->json($feedbacks);
    }
}
