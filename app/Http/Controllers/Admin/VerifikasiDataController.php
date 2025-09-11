<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ProdukHukum;

class VerifikasiDataController extends Controller
{
    public function index()
    {
        // Ambil data produk hukum beserta relasi
        $produkHukums = ProdukHukum::with(['instansi', 'statusVerifikasi'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render("Admin/verifikasi-data/Index", [
            "produkHukums" => $produkHukums
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            "status_id" => "required|exists:masterstatus,id",
        ]);

        $produk = ProdukHukum::findOrFail($id);
        $produk->status_id = $validated["status_id"];
        $produk->save();

        return redirect()->back()->with("success", "Status verifikasi berhasil diperbarui.");
    }
}
