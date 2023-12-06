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
Route::apiResource('/dishes', DishController::class);


Route::middleware(['auth:sanctum', 'isOwner'])->group(function () {
    Route::get('/restaurant/orders', [OrderController::class, 'getRestaurantOrders']);
    Route::post('/restaurant/orders/{id}/confirm', [OrderController::class, 'confirmOrder']);
});

// User Orders Routes
// Add these inside your routes/api.php file

// Protected routes for handling orders
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']); // List all orders for logged-in user
    Route::get('/orders/{order}', [OrderController::class, 'show']); // Get a single order
    Route::put('/orders/{order}', [OrderController::class, 'update']); // Update an order
    Route::delete('/orders/{order}', [OrderController::class, 'destroy']); // Delete an order
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/place-order', [UserOrderController::class, 'store']);
    Route::get('/user/orders', [UserOrderController::class, 'getUserOrders']);
});


Route::middleware(['auth:sanctum', 'role:delivery'])->group(function () {
    Route::get('/orders/available-for-delivery', [OrderController::class, 'availableForDelivery']);
    Route::post('/orders/take-for-delivery/{orderId}', [OrderController::class, 'takeOrderForDelivery']);
});


