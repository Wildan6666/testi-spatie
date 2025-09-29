<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Berita;
use Illuminate\Support\Facades\Auth;

class KelolaBeritaController extends Controller
{
    public function index()
    {
        // ✅ kirim data berita ke Inertia
        return Inertia::render("Admin/kelola-berita/Index", [
            'berita' => Berita::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/kelola-berita/TambahBerita');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'published_at' => 'nullable|date',
            'status' => 'required|in:draft,published',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('berita', 'public');
        }

        // ✅ author otomatis user login
        $validated['author'] = Auth::user()->name;

        Berita::create($validated);
        

        return redirect()->route('kelola-berita.index')->with('success', 'Berita berhasil ditambahkan');
    }

    public function destroy(\App\Models\Berita $berita)
{
    $berita->delete();
    return redirect()->route('kelola-berita.index')->with('success', 'Berita berhasil dihapus');
}


}
