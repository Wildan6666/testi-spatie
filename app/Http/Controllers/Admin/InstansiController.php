<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Instansi;

class InstansiController extends Controller
{
    public function index()
    {
         $instansi = Instansi::select('id', 'nama', 'singkatan', 'alamat', 'kontak')->get();

        return Inertia::render('Admin/instansi/Index', [
            'instansi' => $instansi
        ]);
     
    }
}