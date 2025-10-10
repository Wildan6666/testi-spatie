<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TipeDokumen;

class TipeDokumenController extends Controller
{
    public function index()
    {
        $tipeDokumens = TipeDokumen::orderBy('id', 'desc')->get();

        return Inertia::render("Admin/tipe-dokumen/Index", [
            "tipeDokumens" => $tipeDokumens
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode' => 'required|string|max:50|unique:tipe_dokumen,kode',
            'nama' => 'required|string|max:255|unique:tipe_dokumen,nama',
            'deskripsi' => 'nullable|string',
        ]);

        TipeDokumen::create([
            'kode' => strtoupper($request->kode),
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
        ]);

        return back()->with('success', 'Tipe dokumen berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kode' => 'required|string|max:50|unique:tipe_dokumen,kode,' . $id,
            'nama' => 'required|string|max:255|unique:tipe_dokumen,nama,' . $id,
            'deskripsi' => 'nullable|string',
        ]);

        $tipe = TipeDokumen::findOrFail($id);
        $tipe->update([
            'kode' => strtoupper($request->kode),
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
        ]);

        return back()->with('success', 'Tipe dokumen berhasil diperbarui');
    }

    public function destroy($id)
    {
        $tipe = TipeDokumen::findOrFail($id);
        $tipe->delete();

        return back()->with('success', 'Tipe dokumen berhasil dihapus');
    }
}
