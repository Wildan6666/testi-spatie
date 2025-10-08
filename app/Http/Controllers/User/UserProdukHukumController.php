<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\ProdukHukum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KategoriAkses;

class UserProdukHukumController extends Controller
{
    public function index(Request $request)
{
    $user = auth()->user();
    $search = $request->input('search');
    $tahun  = $request->input('tahun');
    $tipe   = $request->input('tipe');
    $jenis  = $request->input('jenis');
    $nomor  = $request->input('nomor'); 

    // Tambahkan relasi kategoriAkses supaya bisa difilter
    $query = ProdukHukum::with([
        'tipeDokumen', 'jenisHukum', 'instansi', 'statusVerifikasi', 'kategoriAkses'
    ]);

   $allowedAkses = []; // daftar kategori dokumen yang boleh dilihat user

if ($user) {
    // SUPERADMIN & PEMIMPIN → bisa lihat SEMUA dokumen
    if ($user->hasRole('superadmin') || $user->hasRole('pemimpin')) {
        $allowedAkses = ['Rahasia', 'Internal', 'Publik'];

    // PEGAWAI → hanya bisa lihat dokumen internal dan publik
    } elseif ($user->hasRole('pegawai')) {
        $allowedAkses = ['Internal', 'Publik'];

    // role lain (misal Mahasiswa, Tamu, dsb) → hanya publik
    } else {
        $allowedAkses = ['Publik'];
    }
} else {
    // Pengunjung belum login → hanya publik
    $allowedAkses = ['Publik'];
}

// ======================================================
// 🩹 Fallback keamanan (jaga-jaga kalau tidak punya role)
// ======================================================
if (empty($allowedAkses)) {
    $allowedAkses = ['Publik'];
}

    // terapkan ke query
    $query->whereHas('kategoriAkses', function ($q) use ($allowedAkses) {
        $q->whereIn('nama', $allowedAkses);
    });

    /*
    |--------------------------------------------------------------------------
    | 🔎 FILTER TAMBAHAN (SEARCH, TAHUN, JENIS, TIPE)
    |--------------------------------------------------------------------------
    */
    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('judul', 'like', "%{$search}%")
                ->orWhere('nomor', 'like', "%{$search}%")
                ->orWhere('subjek', 'like', "%{$search}%");
        });
    }

    if ($nomor) {
            $query->where('nomor',  $nomor);
        }

    if ($tahun) {
        $query->where('tahun', $tahun);
    }

    if ($tipe) {
        $query->whereHas('tipeDokumen', function ($q) use ($tipe) {
            $q->where('nama', 'like', "%{$tipe}%");
        });
    }

    if ($jenis) {
        $query->whereHas('jenisHukum', function ($q) use ($jenis) {
            $q->where('nama', 'like', "%{$jenis}%");
        });
    }

    /*
    |--------------------------------------------------------------------------
    | 📦 PENGAMBILAN DATA DENGAN PAGINATION
    |--------------------------------------------------------------------------
    */
    $dokumen = $query->orderByDesc('created_at')
        ->paginate(3)
        ->withQueryString()
        ->through(function ($row) {
            return [
                'id'        => $row->id,
                'title'     => $row->judul,
                'nomor'     => $row->nomor,
                'tahun'     => $row->tahun,
                'date'      => $row->tanggal_penetapan,
                'kategori'  => optional($row->kategoriAkses)->nama,
                'type'      => optional($row->tipeDokumen)->nama,
                'jenis'     => optional($row->jenisHukum)->nama,
                'status'    => optional($row->statusVerifikasi)->nama,
                'instansi'  => optional($row->instansi)->nama,
                'file'      => $row->berkas ? asset('storage/'.$row->berkas) : null,
                'published' => $row->created_at->format('Y-m-d'),
            ];
        });

        

    return Inertia::render('User/Dokumen', [
        'dokumen' => $dokumen,
        'filters' => $request->only(['nomor','search','tahun','tipe','jenis']),
        'jenisOptions' => \App\Models\JenisHukum::select('id','nama')->get(),
        'tipeOptions'  => \App\Models\TipeDokumen::select('id','nama')->get(),
        'allowedAkses' => $allowedAkses, // kirim ke frontend kalau mau tampilkan kategori aktif
    ]);
}

    /**
     * 🔎 Detail Dokumen
     */
    public function show($id)
    {
        $row = ProdukHukum::with(['tipeDokumen', 'jenisHukum', 'instansi', 'statusVerifikasi', 'KategoriAkses'])
            ->findOrFail($id);

        $row->increment('views');
        $row->refresh();

        $doc = [
            'id'        => $row->id,
            'title'     => $row->judul,
            'nomor'     => $row->nomor,
            'tahun'     => $row->tahun,
            'date'      => $row->tanggal_penetapan,
            'kategori'  => optional($row->KategoriAkses)->nama,
            'type'      => optional($row->tipeDokumen)->nama,
            'jenis'     => optional($row->jenisHukum)->nama,
            'status'    => optional($row->statusVerifikasi)->nama,
            'instansi'  => optional($row->instansi)->nama,
            'file'      => $row->berkas ? asset('storage/' . $row->berkas) : null,
            'published' => $row->created_at->format('Y-m-d'),
            'views'     => $row->views,
            'downloads' => $row->downloads,
        ];

        return Inertia::render('User/detailDokumen', ['doc' => $doc]);
    }

    /**
     * 💾 Download Dokumen
     */
    public function download($id)
    {
        $produk = ProdukHukum::findOrFail($id);

        if (!$produk->berkas) {
            abort(404, 'File tidak ditemukan');
        }

        $absPath = storage_path('app/public/' . $produk->berkas);
        if (!file_exists($absPath)) {
            abort(404, 'File tidak ditemukan di storage');
        }

        $produk->increment('downloads');
        $safeName = \Illuminate\Support\Str::slug($produk->judul, '-') . '.pdf';

        return response()->download($absPath, $safeName);
    }
}
