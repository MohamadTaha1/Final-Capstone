<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
        // Within your AuthController login method
        public function login(Request $request)
        {
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken;

                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => $user
                ], 200);
            }


            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        public function register(Request $request)
        {
            \Log::info('Register API called'); // Log when the method is called

            // Validate incoming request
            try {
                $validatedData = $request->validate([
                    'name' => 'required|max:255',
                    'email' => 'required|email|max:255|unique:users',
                    'password' => 'required|min:6|confirmed',
                    'role' => 'in:Customer,Owner,Delivery', // Include 'Delivery' if needed
                    'location' => 'required|string|max:255', // Validate the location
                ]);
            } catch (\Illuminate\Validation\ValidationException $e) {
                \Log::error('Validation failed: ' . $e->getMessage());
                return response()->json(['error' => 'Validation failed'], 422);
            }

            \Log::info('Validation passed, creating user...');

            // Create a new user
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'role' => $validatedData['role'] ?? 'Customer', // Default to 'Customer' if not provided
                'location' => $validatedData['location'], // Include the location
            ]);

            \Log::info('User created: ' . $user->id); // Log user ID

            // Create a token for the user
            $token = $user->createToken('authToken')->plainTextToken;
            \Log::info('Token created for user: ' . $user->id);

            // Return a response
            return response()->json([
                'message' => 'Registered successfully',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        }



        public function logout(Request $request)
        {
            // Just return a successful response as the token is not stored in the database
            return response()->json(['message' => 'Logged out successfully']);
        }







}
