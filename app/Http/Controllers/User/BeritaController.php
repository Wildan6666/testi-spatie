<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        $mainNews = Berita::where('status', 'published')
            ->orderByDesc('published_at')
            ->first();

        $popularNews = Berita::where('status', 'published')
            ->orderByDesc('published_at')
            ->skip(1)
            ->take(5)
            ->get();

        return Inertia::render('User/Berita', [
            'mainNews' => $mainNews,
            'popularNews' => $popularNews,
        ]);
    }

    public function show(Berita $berita)
    {
        return Inertia::render('User/Berita', [
            'berita' => $berita,
        ]);
    }
}
