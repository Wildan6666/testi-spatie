<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ProdukHukum;
use App\Models\RiwayatVerifikasi;
use App\Models\Instansi;
use Spatie\Permission\Models\Role;

class VerifikasiDataController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = ProdukHukum::with(['instansi', 'statusVerifikasi', 'verifikator']);

        // cari role_id verifikator dari tabel roles
        $verifikatorRoleId = Role::where('name', 'verifikator')->value('id');

        // ambil semua instansi_id di mana user ini menjadi verifikator
        $instansiIds = $user->instansis()
            ->wherePivot('role_id', $verifikatorRoleId)
            ->pluck('instansi_id')
            ->toArray();

        // filter otomatis: hanya dokumen dari instansi yg dia pegang
        if (!empty($instansiIds)) {
            $query->whereIn('instansi_id', $instansiIds);
        } else {
            // kalau user tidak punya instansi sebagai verifikator → kosong
            $query->whereRaw('0=1');
        }

        // filter status (opsional dari request)
        if ($request->filled('status_id')) {
            $query->where('status_id', $request->status_id);
        }

        // ambil data dengan pagination
        $produkHukums = $query->orderBy('created_at', 'desc')->paginate(20);

        // ambil instansi untuk dropdown filter di frontend
        $instansis = Instansi::select('id', 'nama')->get();

        return Inertia::render("Admin/verifikasi-data/Index", [
            "produkHukums" => $produkHukums,
            "filters" => $request->only(['status_id']),
            "instansis" => $instansis,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            "status_id" => "required|exists:masterstatus,id",
            "catatan_verifikasi" => "nullable|string|max:500",
        ]);

        $produk = ProdukHukum::findOrFail($id);

        // update status terakhir
        $produk->status_id = $validated["status_id"];
        $produk->catatan_verifikasi = $validated["catatan_verifikasi"] ?? null;
        $produk->verified_by = auth()->id();
        $produk->verified_at = now();
        $produk->save();

        // simpan ke riwayat verifikasi
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
        $produk = ProdukHukum::with([
            'instansi',
            'statusVerifikasi',
            'verifikator',
            'riwayatVerifikasi.user',
            'riwayatVerifikasi.status'
        ])->findOrFail($id);

        $user = auth()->user();
        $verifikatorRoleId = Role::where('name', 'verifikator')->value('id');

        // cek apakah user boleh verifikasi dokumen ini
        $isVerifikator = $user->instansis()
            ->wherePivot('role_id', $verifikatorRoleId)
            ->where('instansi.id', $produk->instansi_id)
            ->exists();

        if (!$isVerifikator) {
            abort(403, 'Anda tidak berhak memverifikasi dokumen ini.');
        }

        return Inertia::render("Admin/verifikasi-data/Show", [
            "produk" => $produk
        ]);
    }
}
