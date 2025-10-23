<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProdukHukum;
use App\Models\Instansi;
use App\Models\StatusVerifikasi;
use App\Models\StatusPeraturan;
use App\Models\TipeDokumen;
use App\Models\JenisHukum;
use App\Models\KategoriAkses;
use Illuminate\Support\Facades\Storage;

class ProdukHukumController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $query = ProdukHukum::with([
            'instansi',
            'statusVerifikasi',
            'statusPeraturan',
            'tipeDokumen',
            'jenisHukum',
            'parent',
            'children',
            'children.statusPeraturan',
            'childrenRecursive',
            'childrenRecursive.statusPeraturan',
            'childrenRecursive.instansi',
        ]);

            // 🔒 Role-based filtering
            if (!$user->hasAnyRole(['superadmin'])) {
                // User biasa hanya bisa lihat dokumen yang dia upload
                $query->where('user_id', $user->id);
            }

            // 🔍 Filter instansi untuk verifikator (kecuali superadmin)
            if ($user->hasRole('verifikator') && !$user->hasAnyRole(['superadmin', 'admin'])) {
                $query->where('instansi_id', $user->instansi_id);
            }

        // 🔍 Search query
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('nomor', 'like', "%{$search}%")
                    ->orWhere('tahun', 'like', "%{$search}%")
                    ->orWhere('kata_kunci', 'like', "%{$search}%")
                    ->orWhereHas('instansi', function ($q) use ($search) {
                        $q->where('nama', 'like', "%{$search}%");
                    });
            });
        }

        $produkHukums = $query->orderBy('created_at', 'desc')->get();
        $produkHukums->load('childrenRecursive',
            'childrenRecursive.statusPeraturan',
            'childrenRecursive.instansi',);

        // 🔁 Tambahkan rantai induk untuk setiap produk hukum (untuk modal React)
        $produkHukums->map(function ($item) {
            $item->parent_chain = $this->getParentChain($item);
            return $item;
        });

        // ✅ Tambahkan data dropdown untuk filter
    $instansis = Instansi::select('id', 'nama')->orderBy('nama')->get();
    $tipes = TipeDokumen::select('id', 'nama')->orderBy('nama')->get();

        return Inertia::render('Admin/produk-hukum/Index', [
            'produkHukums' => $produkHukums,
            'filters' => $request->only('search'),
             'instansis' => $instansis, // ✅ kirim ke React
          'tipes' => $tipes,         // ✅ kirim ke React
        ]);
    }

    public function create()
{
    return Inertia::render('Admin/produk-hukum/create', [
        'instansis' => Instansi::select('id', 'nama')->orderBy('nama')->get(),
        'statusPeraturans' => StatusPeraturan::select('id', 'nama')->orderBy('nama')->get(),
        'tipeDokumens' => TipeDokumen::select('id', 'nama')->orderBy('nama')->get(),
        'jenisHukums' => JenisHukum::select('id', 'nama')->orderBy('nama')->get(),
        'kategoriAkses' => KategoriAkses::select('id', 'nama')->orderBy('nama')->get(),
        'produkIndukList' => ProdukHukum::select(
            'id',
            'judul',
            'instansi_id',
            'status_peraturan_id',
            'tipe_dokumen_id',
            'jenis_hukum_id',
            'kategori_akses_id'
        )
        ->orderBy('judul')
        ->get(),
    ]);
}


    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'nomor' => 'nullable|string|max:100',
            'tahun' => 'nullable|digits:4|integer',
            'ringkasan' => 'nullable|string',
            'subjek' => 'nullable|string|max:150',
            'tanggal_penetapan' => 'nullable|date',
            'kata_kunci' => 'nullable|string',
            'instansi_id' => 'required|exists:instansi,id',
            'status_peraturan_id' => 'required|exists:status_peraturan,id',
            'tipe_dokumen_id' => 'required|exists:tipe_dokumen,id',
            'jenis_hukum_id' => 'required|exists:jenis_hukum,id',
            'berkas' => 'nullable|file|mimes:pdf,png|max:2048',
            'kategori_akses_id' => 'nullable|exists:kategori_akses,id',
            'parent_id' => 'nullable|exists:produk_hukum,id',
        ]);

        $validated['user_id'] = auth()->id();

        // Status default "Pending"
        $pendingStatus = StatusVerifikasi::where('nama_status', 'Pending')->first();
        $validated['status_id'] = $pendingStatus ? $pendingStatus->id : null;

        $kategori = KategoriAkses::find($request->kategori_akses_id);
        $folder = $kategori ? strtolower($kategori->nama) : 'lainnya';

        // Upload file jika ada
        if ($request->hasFile('berkas')) {
            $file = $request->file('berkas');
            $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $file->getClientOriginalName());
            $validated['berkas'] = $file->storeAs("produk_hukum/{$folder}", $filename, 'public');
        }

        ProdukHukum::create($validated);

        return redirect()->route('produk-hukum.index')->with('success', 'Produk hukum berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $produk = ProdukHukum::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'nomor' => 'nullable|string|max:100',
            'tahun' => 'nullable|digits:4|integer',
            'ringkasan' => 'nullable|string',
            'subjek' => 'nullable|string|max:150',
            'tanggal_penetapan' => 'nullable|date',
            'kata_kunci' => 'nullable|string',
            'instansi_id' => 'required|exists:instansi,id',
            'status_peraturan_id' => 'required|exists:status_peraturan,id',
            'tipe_dokumen_id' => 'required|exists:tipe_dokumen,id',
            'jenis_hukum_id' => 'required|exists:jenis_hukum,id',
            'berkas' => 'nullable|file|mimes:pdf,png|max:2048',
            'kategori_akses_id' => 'nullable|exists:kategori_akses,id',
            'parent_id' => 'nullable|exists:produk_hukum,id',
        ]);

        $kategori = KategoriAkses::find($request->kategori_akses_id);
        $folder = $kategori ? strtolower($kategori->nama) : 'lainnya';

        if ($request->hasFile('berkas')) {
            if ($produk->berkas && Storage::disk('public')->exists($produk->berkas)) {
                Storage::disk('public')->delete($produk->berkas);
            }

            $file = $request->file('berkas');
            $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $file->getClientOriginalName());
            $validated['berkas'] = $file->storeAs("produk_hukum/{$folder}", $filename, 'public');
        }

        $produk->update($validated);

        return redirect()->route('produk-hukum.index')->with('success', 'Produk hukum berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $produk = ProdukHukum::findOrFail($id);

        if ($produk->berkas && Storage::disk('public')->exists($produk->berkas)) {
            Storage::disk('public')->delete($produk->berkas);
        }

        $produk->delete();

        return redirect()->route('produk-hukum.index')->with('success', 'Produk hukum berhasil dihapus.');
    }
public function show($id)
{
    $produk = ProdukHukum::with([
        'parent',
        'instansi',
        'statusPeraturan',
        'tipeDokumen',
        'jenisHukum',
        'children.statusPeraturan',
        'children.instansi',
    ])->findOrFail($id);

    $parentChain = $this->getParentChain($produk);
    $childrenChain = $this->getChildrenChain($produk); // 🔥 tambahkan ini

    // Tambahkan hasil helper ke dalam produk
    $produk->children_recursive = $childrenChain;

    return Inertia::render('Admin/produk-hukum/Index', [
        'produk' => $produk,
        'parentChain' => $parentChain,
        'catatan_verifikasi' => $produk->catatan_verifikasi, 
    ]);
}

public function resend(Request $request, $id)
{
    $produk = ProdukHukum::findOrFail($id);
    $user = auth()->user();

    // Pastikan hanya pengunggah asli yang bisa kirim ulang
    if (
    $produk->user_id !== $user->id &&
    !$user->hasAnyRole(['Admin', 'Superadmin'])
) {
    abort(403, 'Anda tidak memiliki izin untuk mengirim ulang dokumen ini.');
}

    // Validasi input revisi
    $validated = $request->validate([
        'judul' => 'required|string|max:255',
        'nomor' => 'nullable|string|max:50',
        'tahun' => 'nullable|integer',
        'ringkasan' => 'nullable|string',
        'subjek' => 'nullable|string|max:255',
        'tanggal_penetapan' => 'nullable|date',
        'kata_kunci' => 'nullable|string|max:255',
        'instansi_id' => 'required|exists:instansi,id',
        'status_peraturan_id' => 'required|exists:status_peraturan,id',
        'tipe_dokumen_id' => 'required|exists:tipe_dokumen,id',
        'jenis_hukum_id' => 'required|exists:jenis_hukum,id',
        'kategori_akses_id' => 'required|exists:kategori_akses,id',
        'parent_id' => 'nullable|exists:produk_hukum,id',
        'berkas' => 'required|file|max:2048|mimes:pdf,png',
    ]);

    

    // Hapus file lama
    if ($produk->berkas && Storage::disk('public')->exists($produk->berkas)) {
        Storage::disk('public')->delete($produk->berkas);
    }

    // Upload file baru
    $file = $request->file('berkas');
    $folder = 'produk_hukum/revisi';
    $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $file->getClientOriginalName());
    $validated['berkas'] = $file->storeAs($folder, $filename, 'public');

    // Reset status jadi Pending
    $statusPending = StatusVerifikasi::where('nama_status', 'Pending')->first();

    $produk->update([
        ...$validated,
        'status_id' => $statusPending->id,
    ]);

    return redirect()->route('produk-hukum.index')->with('success', 'Dokumen revisi berhasil dikirim ulang untuk verifikasi.');
}
    public function resendView($id)
{
    $produk = ProdukHukum::with([
        'instansi', 'statusPeraturan', 'tipeDokumen', 'jenisHukum', 'kategoriAkses'
    ])->findOrFail($id);

    return Inertia::render('Admin/produk-hukum/Resend', [
        'produk' => $produk,
        'instansis' => Instansi::all(),
        'tipes' => TipeDokumen::all(),
        'kategoriAkses' => KategoriAkses::all(),
        'statusPeraturans' => StatusPeraturan::all(),
        'jenisHukums' => JenisHukum::all(),

        'produkIndukList' => ProdukHukum::select('id', 'judul')
            ->where('id', '!=', $id) // agar tidak bisa memilih dirinya sendiri
            ->orderBy('judul')
            ->get(),
    ]);
}

    private function getParentChain($produk)
    {
        $chain = [];
        $current = $produk;

        while ($current->parent) {
            $chain[] = $current->parent;
            $current = $current->parent;
        }

        return array_reverse($chain); // urut dari induk tertinggi ke bawah
    }

    /**
 * Helper rekursif untuk mendapatkan seluruh turunan (children chain)
 */
private function getChildrenChain($produk)
{
    $children = [];

    foreach ($produk->children as $child) {
        // Ambil data anak dan turunannya
        $childData = $child->toArray();
        $childData['children'] = $this->getChildrenChain($child); // rekursif
        $children[] = $childData;
    }

    return $children;
}

}
