<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StatusVerifikasi;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MasterStatusController extends Controller
{
    public function index()
    {
        $statuses = StatusVerifikasi::all();

        return Inertia::render("Admin/master-status/Index", [
            'statuses' => $statuses,
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'nama_status' => 'required|string|max:255',
        'kode' => 'nullable|string|max:50',
        'deskripsi' => 'nullable|string',
    ]);

    StatusVerifikasi::create($validated);

    return redirect()->route('status-peraturan.index')
        ->with('success', 'Status berhasil ditambahkan.');
}

public function update(Request $request, $id)
{
    $validated = $request->validate([
        'nama_status' => 'required|string|max:255',
        'kode' => 'nullable|string|max:50',
        'deskripsi' => 'nullable|string',
    ]);

    $status = StatusVerifikasi::findOrFail($id);
    $status->update($validated);

    return redirect()->route('status-peraturan.index')
        ->with('success', 'Status berhasil diperbarui.');
}

    public function destroy($id)
    {
        $status = StatusVerifikasi::findOrFail($id);
        $status->delete();

        return redirect()->back()->with('success', 'Status berhasil dihapus.');
    }
}
