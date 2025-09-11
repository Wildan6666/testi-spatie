<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DokumenController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/dokumen/Index");
    }
}