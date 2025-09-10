<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StatusPeraturan;

class StatusPeraturanController extends Controller
{
    public function index()
    {
           $status = StatusPeraturan::all();

        return Inertia::render("Admin/status-peraturan/Index",[
            'status' => $status
        ]);
    }
}