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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProdukHukumController extends Controller
{

    public function index() { $produkHukums = ProdukHukum::with([ 'instansi', 'statusVerifikasi', 'statusPeraturan', 'tipeDokumen', 'jenisHukum' ])->get(); return Inertia::render('Admin/produk-hukum/Index', [ 'produkHukums' => $produkHukums ]); }
    public function create()
    {
        return Inertia::render('Admin/produk-hukum/Create', [
            'instansis' => Instansi::all(),
            'statusPeraturans' => StatusPeraturan::all(),
            'tipeDokumens' => TipeDokumen::all(),
            'jenisHukums' => JenisHukum::all(),
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
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
        ]);

        // Set status_id selalu Pending
        $pendingStatus = StatusVerifikasi::where('nama_status', 'Pending')->first();
        $validated['status_id'] = $pendingStatus ? $pendingStatus->id : null;

        // Simpan file jika ada
        if ($request->hasFile('berkas')) {
            $file = $request->file('berkas');
            $filename = time().'_'.preg_replace('/[^a-zA-Z0-9_\.-]/','_',$file->getClientOriginalName());
            $validated['berkas'] = $file->storeAs('produk_hukum', $filename, 'public');
        }

        try {
            ProdukHukum::create($validated);
        } catch (\Exception $e) {
            Log::error('DB Error: ' . $e->getMessage());
            return back()->withErrors(['db_error' => 'Gagal menyimpan data: '.$e->getMessage()]);
        }

        return redirect()->route('produk-hukum.index')
                         ->with('success', 'Produk hukum berhasil ditambahkan.');
    }
}
