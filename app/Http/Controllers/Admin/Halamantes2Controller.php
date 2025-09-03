<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class Halamantes2Controller extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/halamantes2/Index");
    }
}