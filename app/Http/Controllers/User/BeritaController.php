<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Inertia\Inertia;
use App\Models\Pengumuman;
use Illuminate\Http\Request;

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
            'mainNews'    => $mainNews,
            'popularNews' => $popularNews,
        ]);
    }

    public function show(Berita $berita)
    {
        $popularNews = Berita::where('status', 'published')
            ->orderByDesc('published_at')
            ->where('id', '!=', $berita->id)
            ->take(5)
            ->get();

        return Inertia::render('User/DetailBerita', [
            'mainNews'    => $berita,
            'popularNews' => $popularNews,
        ]);
    }


public function updateStatus(Request $request, $id)
{
    $berita = Berita::findOrFail($id);
    $statusBaru = $request->input('status'); // 'draft' atau 'published'

    $berita->update(['status' => $statusBaru]);

    if ($statusBaru === 'published') {
        // Cek apakah sudah pernah dibuat
        $cek = Pengumuman::where('related_id', $berita->id)
            ->where('type', 'berita')
            ->first();

        if (!$cek) {
            Pengumuman::create([
                'title' => 'Berita Baru: ' . $berita->title,
                'type' => 'berita',
                'related_id' => $berita->id,
                'published_at' => now(),
            ]);
        }
    } else {
        Pengumuman::where('related_id', $berita->id)
            ->where('type', 'berita')
            ->update(['is_active' => false]);
    }

    return redirect()->back()->with('message', 'Status berita diperbarui.');
}

}
