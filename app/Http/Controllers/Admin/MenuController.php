<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menus = [
            ['id' => 1, 'name' => 'Dashboard', 'url' => '/dashboard'],
            ['id' => 2, 'name' => 'Users', 'url' => '/konfigurasi/users'],
        ];

        return Inertia::render('Konfigurasi/Menus', [
            'menus' => $menus,
        ]);
    }
}
