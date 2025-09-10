<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProdukHukumController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/produk-hukum/Index");
    }
}