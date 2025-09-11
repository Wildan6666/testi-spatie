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

        return Inertia::render("Admin/jenis-hukum/Index", [
            'jenis' => $jenis,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
            'singkatan' => 'nullable|string|max:50',
            'kode' => 'nullable|string|max:50',
        ]);

        JenisHukum::create($request->only(['nama', 'keterangan', 'singkatan', 'kode']));

        return redirect()->back()->with('success', 'Jenis produk hukum berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
            'singkatan' => 'nullable|string|max:50',
            'kode' => 'nullable|string|max:50',
        ]);

        $jenis = JenisHukum::findOrFail($id);
        $jenis->update($request->only(['nama', 'keterangan', 'singkatan', 'kode']));

        return redirect()->back()->with('success', 'Jenis produk hukum berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $jenis = JenisHukum::findOrFail($id);
        $jenis->delete();

        return redirect()->back()->with('success', 'Jenis produk hukum berhasil dihapus.');
    }
}
