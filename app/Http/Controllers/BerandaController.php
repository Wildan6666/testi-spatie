<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ProdukHukum;
use App\Models\Berita;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class BerandaController extends Controller
{
    private function getProdukData()
    {
        $user = auth()->user();
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


        $baseQuery = ProdukHukum::with(['kategoriAkses'])
            ->whereHas('kategoriAkses', function ($q) use ($allowedAkses) {
                $q->whereIn('nama', $allowedAkses);
            });


        $latest = (clone $baseQuery)
            ->orderByDesc('created_at')
            ->take(6)
            ->get()
            ->map(fn($row) => [
                'id'        => $row->id,
                'judul'     => $row->judul,
                'kategori'  => optional($row->kategoriAkses)->nama ?? '-',
                'deskripsi' => $row->ringkasan ?? '-',
                'views'     => $row->views,
                'downloads' => $row->downloads,
            ]);


        $popular = (clone $baseQuery)
            ->orderByDesc('downloads')
            ->take(6)
            ->get()
            ->map(fn($row) => [
                'id'        => $row->id,
                'judul'     => $row->judul,
                'kategori'  => optional($row->kategoriAkses)->nama ?? '-',
                'deskripsi' => $row->ringkasan ?? '-',
                'views'     => $row->views,
                'downloads' => $row->downloads,
            ]);


        $pieData = (clone $baseQuery)
            ->selectRaw('jenis_hukum_id, COUNT(*) as total')
            ->groupBy('jenis_hukum_id')
            ->with('jenisHukum')
            ->get()
            ->map(fn($row) => [
                'name'  => optional($row->jenisHukum)->nama ?? 'Lainnya',
                'value' => $row->total,
                'color' => '#f97316',
            ]);


        $yearlyData = (clone $baseQuery)
            ->selectRaw('tahun, COUNT(*) as documents')
            ->groupBy('tahun')
            ->orderBy('tahun')
            ->get();

        $monthlyData = (clone $baseQuery)
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();


        $berita = Berita::where('status', 'published')
            ->latest('published_at')
            ->take(6)
            ->get()
            ->map(fn($row) => [
                'id'          => $row->id,
                'title'       => $row->title,
                'description' => Str::limit(strip_tags($row->content), 120),
                'image'       => $row->image ? asset('storage/'.$row->image) : '/default-news.jpg',
                'date'        => $row->published_at ? $row->published_at->format('d M Y') : null,
            ]);

        return [
            'latest'      => $latest,
            'popular'     => $popular,
            'pieData'     => $pieData,
            'yearlyData'  => $yearlyData,
            'monthlyData' => $monthlyData,
            'berita'      => $berita,
            'allowedAkses' => $allowedAkses,
            'summary'     => [
                'total'   => $baseQuery->count(),
                'monthly' => $baseQuery->whereMonth('created_at', now()->month)->count(),
                'year'    => $baseQuery->max('tahun'),
            ],
        ];
    }

 public function index()
{
    $data = $this->getProdukData();

    // 🔐 Enkripsi ID
    $latest = collect($data['latest'])->map(function ($row) {
        return [
            'id'          => $row['id'],
            'judul'       => $row['judul'],
            'kategori'    => $row['kategori'],
            'deskripsi'   => $row['deskripsi'],
            'views'       => $row['views'],
            'downloads'   => $row['downloads'],
            'encrypted_id'=> Crypt::encryptString($row['id']),
        ];
    });

    $popular = collect($data['popular'])->map(function ($row) {
        return [
            'id'          => $row['id'],
            'judul'       => $row['judul'],
            'kategori'    => $row['kategori'],
            'deskripsi'   => $row['deskripsi'],
            'views'       => $row['views'],
            'downloads'   => $row['downloads'],
            'encrypted_id'=> Crypt::encryptString($row['id']),
        ];
    });

    return Inertia::render('Welcome', [
        'terbaruData'   => $latest,
        'populerData'   => $popular,
        'pieData'       => $data['pieData'],
        'yearlyData'    => $data['yearlyData'],
        'monthlyData'   => $data['monthlyData'],
        'beritaTerkini' => $data['berita'],
        'summary'       => $data['summary'],
        'allowedAkses'  => $data['allowedAkses'],
    ]);
}



    public function dashboard()
    {
        $data = $this->getProdukData();

        return Inertia::render('Dashboard', [
            'terbaruData'   => $data['latest'],
            'populerData'   => $data['popular'],
            'stats' => [
                'total'   => $data['summary']['total'],
                'yearly'  => $data['yearlyData'],
                'monthly' => $data['monthlyData'],
                'pie'     => $data['pieData'],
            ],
            'beritaTerkini' => $data['berita'],
            'allowedAkses'  => $data['allowedAkses'], 
        ]);
    }

    public function pengumuman()
    {
$data = $this->getProdukData();

    $dokumenTerverifikasi = DB::table('produk_hukum')
        ->where('status_id', 2)
        ->orderByDesc('updated_at')
        ->take(5)
        ->get(['id', 'judul', 'updated_at']);

    // 🔹 Ambil berita yang status = published (tanpa ubah model)
    $beritaPublished = DB::table('beritas')
        ->where('status', 'published')
        ->orderByDesc('created_at') // karena published_at belum pasti diisi
        ->take(5)
        ->get(['id', 'title', 'created_at']);

    // 🔹 Gabungkan keduanya
    $pengumuman = collect()
        ->merge($dokumenTerverifikasi->map(fn($d) => [
            'id' => $d->id,
            'title' => 'Dokumen Terverifikasi: ' . $d->judul,
            'type' => 'dokumen',
            'published_at' => $d->updated_at,
             'link' => url('/produkhukum/' . Crypt::encryptString($d->id)),
        ]))
        ->merge($beritaPublished->map(fn($b) => [
            'id' => $b->id, 
            'title' => 'Berita Baru: ' . $b->title,
            'type' => 'berita',
            'published_at' => $b->created_at,
            'link' => url('/berita/' . $b->id), // ✅ aman juga
        ]))
        ->sortByDesc('published_at')
        ->values();

         return Inertia::render('User/Pengumuman', [
        'pengumuman'    => $pengumuman,
    ]);
    }

    
}
