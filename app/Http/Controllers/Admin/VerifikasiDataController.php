<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ProdukHukum;
use App\Models\Riwayatverifikasi;

class VerifikasiDataController extends Controller
{
public function index(Request $request)
{
    $user = auth()->user();
    $query = ProdukHukum::with(['instansi', 'statusVerifikasi', 'verifikator']);

    $instansiIds = [];

    // Filter otomatis untuk Verifikator
    if ($user->hasRole('Verifikator') && !$user->hasRole('Admin')) {
        // ambil instansi yang terhubung lewat pivot (langsung dari kolom pivot)
        $instansiIds = $user->verifikatorInstansi()->pluck('instansi_id')->toArray();

        if (!empty($instansiIds)) {
            $query->whereIn('instansi_id', $instansiIds);
        } else {
            $query->whereRaw('0=1'); // tidak punya instansi → kosong
        }
    }

    // Filter status (opsional)
    if ($request->filled('status_id')) {
        $query->where('status_id', $request->status_id);
    }

    $produkHukums = $query->orderBy('created_at', 'desc')->get();

    return Inertia::render("Admin/verifikasi-data/Index", [
        "produkHukums" => $produkHukums,
        "filters" => $request->only(['status_id']),
    ]);
}


  public function update(Request $request, $id)
{
    $validated = $request->validate([
        "status_id" => "required|exists:masterstatus,id",
        "catatan_verifikasi" => "nullable|string|max:500",
    ]);

    $produk = ProdukHukum::findOrFail($id);

    // update status terakhir di produk_hukum
    $produk->status_id = $validated["status_id"];
    $produk->catatan_verifikasi = $validated["catatan_verifikasi"] ?? null;
    $produk->verified_by = auth()->id();
    $produk->verified_at = now();
    $produk->save();

    // simpan log riwayat
    RiwayatVerifikasi::create([
        'produk_hukum_id' => $produk->id,
        'user_id' => auth()->id(),
        'status_id' => $validated['status_id'],
        'catatan' => $validated['catatan_verifikasi'] ?? null,
    ]);

    return redirect()->back()->with("success", "Verifikasi berhasil diperbarui.");
}


    public function show($id)
{
    $produk = ProdukHukum::with(['instansi', 'statusVerifikasi', 'verifikator',  'riwayatVerifikasi.user',
    'riwayatVerifikasi.status'])
        ->findOrFail($id);

    // cek apakah user boleh verifikasi dokumen ini
    $user = auth()->user();
    if ($user->hasRole('Verifikator')) {
        $isVerifikator = $user->verifikatorInstansi()
            ->where('instansi_id', $produk->instansi_id)
            ->exists();

        if (!$isVerifikator) {
            abort(403, 'Anda tidak berhak memverifikasi dokumen ini.');
        }
    }

    return Inertia::render("Admin/verifikasi-data/Show", [
        "produk" => $produk
    ]);
}

}
