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
        $user  = auth()->user();
        $search = $request->input('search');
        $tahun  = $request->input('tahun');
        $tipe   = $request->input('tipe');
        $jenis  = $request->input('jenis');
        $nomor  = $request->input('nomor');

        // Relasi tambahan: parent & children
        $query = ProdukHukum::with([
            'tipeDokumen', 'jenisHukum', 'instansi',
            'statusVerifikasi', 'kategoriAkses',
            'parent:id,judul', 'children:id,judul,parent_id'
        ]);

 
        $allowedAkses = [];

        if ($user) {
            if ($user->hasRole('superadmin') || $user->hasRole('pemimpin')) {
                $allowedAkses = ['Rahasia', 'Internal', 'Publik'];
            } elseif ($user->hasRole('pegawai')) {
                $allowedAkses = ['Internal', 'Publik'];
            } else {
                $allowedAkses = ['Publik'];
            }
        } else {
            $allowedAkses = ['Publik'];
        }

        if (empty($allowedAkses)) {
            $allowedAkses = ['Publik'];
        }

        $query->whereHas('kategoriAkses', function ($q) use ($allowedAkses) {
            $q->whereIn('nama', $allowedAkses);
        });

        /*
        |--------------------------------------------------------------------------
        | 🔍 Filter tambahan
        |--------------------------------------------------------------------------
        */
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('nomor', 'like', "%{$search}%")
                    ->orWhere('subjek', 'like', "%{$search}%");
            });
        }

        if ($nomor) $query->where('nomor', $nomor);
        if ($tahun) $query->where('tahun', $tahun);

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
        | 📦 Pagination
        |--------------------------------------------------------------------------
        */
        $dokumen = $query->orderByDesc('created_at')
            ->paginate(5)
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
                    'parent'    => optional($row->parent)->judul,
                    'hasChildren' => $row->children->isNotEmpty(),
                ];
            });

        return Inertia::render('User/Dokumen', [
            'dokumen' => $dokumen,
            'filters' => $request->only(['nomor','search','tahun','tipe','jenis']),
            'jenisOptions' => \App\Models\JenisHukum::select('id','nama')->get(),
            'tipeOptions'  => \App\Models\TipeDokumen::select('id','nama')->get(),
            'allowedAkses' => $allowedAkses,
        ]);
    }

    /**
     * 🔎 Detail Dokumen
     */
   public function show($id)
{
    $row = ProdukHukum::with([
        'tipeDokumen', 'jenisHukum', 'instansi',
        'statusVerifikasi', 'kategoriAkses',
        'parentRecursive:id,judul,nomor,tahun,parent_id',
        'childrenRecursive:id,judul,nomor,tahun,parent_id'
    ])->findOrFail($id);

    $row->increment('views');

    // fungsi bantu: membuat tree anak-anak (rekursif)
    $mapChildren = function ($item) use (&$mapChildren) {
        return [
            'id' => $item->id,
            'judul' => $item->judul,
            'nomor' => $item->nomor,
            'tahun' => $item->tahun,
            'children' => $item->childrenRecursive->map(fn($c) => $mapChildren($c)),
        ];
    };

    // membuat rantai induk lengkap
    $ancestors = [];
    $parent = $row->parentRecursive;
    while ($parent) {
        $ancestors[] = [
            'id' => $parent->id,
            'judul' => $parent->judul,
            'nomor' => $parent->nomor,
            'tahun' => $parent->tahun,
        ];
        $parent = $parent->parentRecursive;
    }

    $doc = [
        'id' => $row->id,
        'title' => $row->judul,
        'nomor' => $row->nomor,
        'tahun' => $row->tahun,
        'date' => $row->tanggal_penetapan,
        'kategori' => optional($row->kategoriAkses)->nama,
        'type' => optional($row->tipeDokumen)->nama,
        'jenis' => optional($row->jenisHukum)->nama,
        'status' => optional($row->statusVerifikasi)->nama,
        'instansi' => optional($row->instansi)->nama,
        'file' => $row->berkas ? asset('storage/' . $row->berkas) : null,
        'published' => $row->created_at->format('Y-m-d'),
        'views' => $row->views,
        'downloads' => $row->downloads,
        'ancestors' => array_reverse($ancestors),
        'treeChildren' => $row->childrenRecursive->map(fn($c) => $mapChildren($c)),
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
