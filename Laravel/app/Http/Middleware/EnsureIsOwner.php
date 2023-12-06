<?php

namespace App\Http\Middleware;

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureIsOwner
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->role === 'Owner') {
            return $next($request);
        }

        return response()->json(['message' => 'Access denied'], 403);
    }
}

