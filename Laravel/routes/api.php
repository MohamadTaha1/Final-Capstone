<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\UserOrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\DailySpecialController;
use App\Http\Controllers\RatingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/user/profile', [UserController::class, 'profile']);

// Authentication Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dishes', [DishController::class, 'index']); // List all dishes
    Route::get('/dishes/{id}', [DishController::class, 'show']); // Get a single dish
    Route::post('/submitReview', [RatingController::class, 'submitReview']);
});
Route::get('/feedbacks', [RatingController::class, 'getFeedbacks']);

// Protected Dish Routes for Restaurant Owners
Route::middleware(['auth:sanctum', 'isOwner'])->group(function () {
    Route::apiResource('/dishes', DishController::class);
    Route::post('/dishes', [DishController::class, 'store']); // Create a new dish
    Route::put('/dishes/{dish}', [DishController::class, 'update']); // Update an existing dish
    Route::delete('/dishes/{dish}', [DishController::class, 'destroy']); // Delete a dish
});


Route::middleware('auth:sanctum', 'isDelivery')->group(function () {
    Route::get('/delivery/current-order', [DeliveryController::class, 'getCurrentAssignedOrder']);
    Route::patch('/delivery/mark-delivered/{id}', [DeliveryController::class, 'markOrderAsDelivered']);
    Route::get('/delivery/past-orders', [DeliveryController::class, 'getPastDeliveredOrders']);
    Route::get('/delivery/availability', [DeliveryController::class, 'getAvailability']);

});


Route::patch('/delivery/toggle-availability', [DeliveryController::class, 'toggleAvailability'])->middleware(['auth:sanctum', 'isDelivery']);



// Restaurant Routes
Route::get('/restaurants/search', [RestaurantController::class, 'search']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
Route::get('/restaurants', [RestaurantController::class, 'index']);
// Protected routes for restaurant owners
Route::middleware(['auth:sanctum', 'isOwner'])->group(function () {
    Route::get('/owner-restaurants', [RestaurantController::class, 'getOwnerRestaurants'])->middleware('auth:api');
    Route::post('/restaurants', [RestaurantController::class, 'create']);
    Route::put('/restaurants/{restaurant}', [RestaurantController::class, 'update']);
    Route::delete('/restaurants/{restaurant}', [RestaurantController::class, 'destroy']);
});

// Menu Routes
Route::middleware(['auth:sanctum', 'isOwner'])->group(function () {
    Route::apiResource('/menus', MenuController::class);
    Route::get('/owner-menu', [MenuController::class, 'getOwnerMenu'])->middleware('auth:api');

});

// Dish Routes
// Assuming that only owners should manage dishes



Route::middleware(['auth:sanctum', 'isOwner'])->group(function () {
    Route::get('/restaurant/orders', [OrderController::class, 'getRestaurantOrders']);
    Route::post('/restaurant/orders/{id}/confirm', [OrderController::class, 'confirmOrder']);
    Route::get('/owner/subscriptions', [SubscriptionController::class, 'getActiveSubscriptionsForOwner']);




});


Route::post('/subscribe', [SubscriptionController::class, 'subscribe'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/user/subscription', [SubscriptionController::class, 'getUserSubscription']);


// User Orders Routes
// Add these inside your routes/api.php file

// Protected routes for handling orders
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']); // List all orders for logged-in user
    Route::get('/orders/{order}', [OrderController::class, 'show']); // Get a single order
    Route::put('/orders/{order}', [OrderController::class, 'update']); // Update an order
    Route::delete('/orders/{order}', [OrderController::class, 'destroy']); // Delete an order
    //SubscriptionPlans

    // Routes for DailySpecialController

    Route::post('/daily-specials', [DailySpecialController::class, 'store']);
    Route::get('/restaurants/{restaurantId}/daily-specials', [DailySpecialController::class, 'showByRestaurant']);
    Route::patch('/daily-specials/{id}', [DailySpecialController::class, 'update']);

    Route::get('/user/subscription-details', [SubscriptionController::class, 'getUserSubscriptionDetails']);
    Route::get('/restaurant/{restaurantId}/daily-specials', [DailySpecialController::class, 'getDailySpecialsForRestaurant']);


});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/place-order', [UserOrderController::class, 'store']);
    Route::get('/user/orders', [UserOrderController::class, 'getUserOrders']);
});


