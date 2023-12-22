<?php
// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function profile()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        // Validation
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'location' => 'required|string|max:255',
        ]);

        // Update user's information
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'location' => $request->location,
        ]);

        return response()->json(['message' => 'Profile updated successfully.', 'user' => $user]);
    }
}
