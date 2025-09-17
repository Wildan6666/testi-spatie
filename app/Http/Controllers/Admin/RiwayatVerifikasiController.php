<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RiwayatVerifikasi;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RiwayatVerifikasiController extends Controller
{
    public function index(Request $request)
{
    $query = RiwayatVerifikasi::with(['produkHukum.instansi', 'user', 'status'])
        ->orderBy('created_at', 'desc');

    // Filter status
    if ($request->filled('status_id')) {
        $query->where('status_id', $request->status_id);
    }

    // Filter instansi (lewat produk_hukum)
    if ($request->filled('instansi_id')) {
        $query->whereHas('produkHukum', function ($q) use ($request) {
            $q->where('instansi_id', $request->instansi_id);
        });
    }

    // Search by judul dokumen / nama verifikator
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->whereHas('produkHukum', fn($sub) => $sub->where('judul', 'like', "%$search%"))
              ->orWhereHas('user', fn($sub) => $sub->where('name', 'like', "%$search%"));
        });
    }

    $riwayats = $query->paginate(10); // pagination biar ringan

    return Inertia::render('Admin/riwayat-verifikasi/Index', [
        'riwayats' => $riwayats,
        'filters' => $request->only(['status_id', 'instansi_id', 'search']),
        'instansis' => \App\Models\Instansi::all(),
    ]);
}

}
