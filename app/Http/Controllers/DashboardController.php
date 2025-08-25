<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        return Inertia::render('Admin/Dashboard', [
            'roles' => $user ? $user->getRoleNames() : [],
            'user' => $user
        ]);
        
    }
}
