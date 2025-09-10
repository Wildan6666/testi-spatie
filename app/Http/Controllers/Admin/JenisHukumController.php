<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\JenisHukum;

class JenisHukumController extends Controller
{
    public function index()
    {
                $jenis = JenisHukum::all();

        return Inertia::render("Admin/jenis-hukum/Index",[
              'jenis' => $jenis,
        ]);
    }
}