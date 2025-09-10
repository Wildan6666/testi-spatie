<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VerifikasiDataController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/verifikasi-data/Index");
    }
}