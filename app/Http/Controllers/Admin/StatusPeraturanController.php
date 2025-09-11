<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StatusPeraturan;

class StatusPeraturanController extends Controller
{
    public function index()
    {
        $status = StatusPeraturan::all();

        return Inertia::render("Admin/status-peraturan/Index", [
            'status' => $status
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'color' => 'nullable|string|max:50',
            'keterangan' => 'nullable|string',
        ]);

        StatusPeraturan::create($request->only(['nama', 'color', 'keterangan']));

        return redirect()->back()->with('success', 'Status peraturan berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'color' => 'nullable|string|max:50',
            'keterangan' => 'nullable|string',
        ]);

        $status = StatusPeraturan::findOrFail($id);
        $status->update($request->only(['nama', 'color', 'keterangan']));

        return redirect()->back()->with('success', 'Status peraturan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $status = StatusPeraturan::findOrFail($id);
        $status->delete();

        return redirect()->back()->with('success', 'Status peraturan berhasil dihapus.');
    }
}
