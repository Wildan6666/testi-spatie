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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProdukHukumController extends Controller
{
  public function index(Request $request)
{
    $user = auth()->user();

    $query = ProdukHukum::with(['instansi', 'statusVerifikasi', 'statusPeraturan', 'tipeDokumen', 'jenisHukum']);

    // 🔍 Filter instansi untuk verifikator
    if ($user->hasRole('Verifikator')) {
        $query->where('instansi_id', $user->instansi_id);
    }

    // 🔍 Search query
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('judul', 'like', "%{$search}%")
              ->orWhere('nomor', 'like', "%{$search}%")
              ->orWhere('tahun', 'like', "%{$search}%")
              ->orWhere('kata_kunci', 'like', "%{$search}%")
              ->orWhereHas('instansi', function($q) use ($search) {
                  $q->where('nama', 'like', "%{$search}%");
              });
        });
    }

    $produkHukums = $query->orderBy('created_at', 'desc')->get();

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
        ]);

        $pendingStatus = StatusVerifikasi::where('nama_status', 'Pending')->first();
        $validated['status_id'] = $pendingStatus ? $pendingStatus->id : null;

        $kategori = KategoriAkses::find($request->kategori_akses_id);
        $folder = $kategori ? strtolower($kategori->nama) : 'lainnya';

        if ($request->hasFile('berkas')) {
            $file = $request->file('berkas');
            $filename = time().'_'.preg_replace('/[^a-zA-Z0-9_\.-]/','_', $file->getClientOriginalName());
            $validated['berkas'] = $file->storeAs("produk_hukum/{$folder}", $filename, 'public');
        }

        ProdukHukum::create($validated);

        return redirect()->route('produk-hukum.index')->with('success', 'Produk hukum berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $produk = ProdukHukum::findOrFail($id);

        return Inertia::render('Admin/produk-hukum/Edit', [
            'produk' => $produk,
            'instansis' => Instansi::all(),
            'statusPeraturans' => StatusPeraturan::all(),
            'tipeDokumens' => TipeDokumen::all(),
            'jenisHukums' => JenisHukum::all(),
            'kategoriAkses' => KategoriAkses::all(),
        ]);
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
        ]);

        $kategori = KategoriAkses::find($request->kategori_akses_id);
        $folder = $kategori ? strtolower($kategori->nama) : 'lainnya';

        if ($request->hasFile('berkas')) {
            if ($produk->berkas && Storage::disk('public')->exists($produk->berkas)) {
                Storage::disk('public')->delete($produk->berkas);
            }
            $file = $request->file('berkas');
            $filename = time().'_'.preg_replace('/[^a-zA-Z0-9_\.-]/','_', $file->getClientOriginalName());
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
}
