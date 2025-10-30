<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StatusVerifikasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterStatusController extends Controller
{
    /**
     * Menampilkan daftar status verifikasi.
     */
    public function index()
    {
        $statuses = StatusVerifikasi::all();

        return Inertia::render('Admin/master-status/Index', [
            'statuses' => $statuses,
        ]);
    }

    /**
     * Menyimpan data status verifikasi baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_status' => 'required|string|max:255',
            'kode' => 'nullable|string|max:50',
            'deskripsi' => 'nullable|string',
        ]);

        StatusVerifikasi::create($validated);

        // Tetap di halaman ini (tidak redirect ke status-peraturan)
        return back()->with('success', 'Status berhasil ditambahkan.');
    }

    /**
     * Memperbarui data status verifikasi.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_status' => 'required|string|max:255',
            'kode' => 'nullable|string|max:50',
            'deskripsi' => 'nullable|string',
        ]);

        $status = StatusVerifikasi::findOrFail($id);
        $status->update($validated);

        // Tetap di halaman ini juga
        return back()->with('success', 'Status berhasil diperbarui.');
    }

    /**
     * Menghapus data status verifikasi.
     */
    public function destroy($id)
    {
        $status = StatusVerifikasi::findOrFail($id);
        $status->delete();

        return back()->with('success', 'Status berhasil dihapus.');
    }
}
