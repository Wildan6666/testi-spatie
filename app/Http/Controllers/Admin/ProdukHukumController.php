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

        // 🔍 Filter instansi untuk verifikator
        if ($user->hasRole('Verifikator')) {
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

        return Inertia::render('Admin/produk-hukum/Index', [
            'produkHukums' => $produkHukums,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/produk-hukum/Create', [
            'instansis' => Instansi::all(),
            'statusPeraturans' => StatusPeraturan::all(),
            'tipeDokumens' => TipeDokumen::all(),
            'jenisHukums' => JenisHukum::all(),
            'kategoriAkses' => KategoriAkses::all(),
            'produkIndukList' => ProdukHukum::select('id', 'judul')
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
    ]);
}


    /**
     * Helper rekursif untuk mendapatkan semua induk dokumen (parent chain)
     */
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
