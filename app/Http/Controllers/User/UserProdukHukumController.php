<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\ProdukHukum;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserProdukHukumController extends Controller
{
   public function index(Request $request)
    {
        $search = $request->input('search');
        $tahun  = $request->input('tahun');
        $tipe   = $request->input('tipe');
        $jenis  = $request->input('jenis');

        $query = ProdukHukum::with(['tipeDokumen', 'jenisHukum', 'instansi', 'statusVerifikasi']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('nomor', 'like', "%{$search}%")
                  ->orWhere('subjek', 'like', "%{$search}%");
            });
        }

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

        $dokumen = $query->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($row) {
                return [
                    'id'        => $row->id,
                    'title'     => $row->judul,
                    'nomor'     => $row->nomor,
                    'tahun'     => $row->tahun,
                    'date'      => $row->tanggal_penetapan,
                    'kategori'  => $row->subjek,
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
            'filters' => $request->only(['search','tahun','tipe','jenis']),
        ]);
    }

    /**
     * Tampilkan detail satu dokumen
     */
    public function show($id)
    {
        $row = ProdukHukum::with(['tipeDokumen', 'jenisHukum', 'instansi', 'statusVerifikasi'])
            ->findOrFail($id);

        $doc = [
            'id'        => $row->id,
            'title'     => $row->judul,
            'nomor'     => $row->nomor,
            'tahun'     => $row->tahun,
            'date'      => $row->tanggal_penetapan,
            'kategori'  => $row->subjek,
            'type'      => optional($row->tipeDokumen)->nama,
            'jenis'     => optional($row->jenisHukum)->nama,
            'status'    => optional($row->statusVerifikasi)->nama,
            'instansi'  => optional($row->instansi)->nama,
            'file'      => $row->berkas ? asset('storage/'.$row->berkas) : null,
            'published' => $row->created_at->format('Y-m-d'),
        ];

        return Inertia::render('User/detailDokumen', [
            'doc' => $doc,
        ]);
    }
}
