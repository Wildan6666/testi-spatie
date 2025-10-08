<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProdukHukum;
use App\Models\Berita;
use App\Models\KategoriAkses;
use Illuminate\Support\Str;

class BerandaController extends Controller
{
    private function getProdukData()
    {
        $user = auth()->user();

        // ====================================================
        // 🎯 Filter berdasarkan peran pengguna (Role-based access)
        // ====================================================
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

        // ====================================================
        // 🔍 Query produk hukum hanya yang sesuai kategori akses
        // ====================================================
        $baseQuery = ProdukHukum::with(['kategoriAkses'])
            ->whereHas('kategoriAkses', function ($q) use ($allowedAkses) {
                $q->whereIn('nama', $allowedAkses);
            });

        // ====================================================
        // 📦 Data Terbaru
        // ====================================================
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

        // ====================================================
        // 📊 Data Populer (berdasarkan downloads)
        // ====================================================
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

        // ====================================================
        // 🥧 Data Pie Chart (per jenis dokumen)
        // ====================================================
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

        // ====================================================
        // 📈 Data Tahunan & Bulanan
        // ====================================================
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

        // ====================================================
        // 📰 Berita
        // ====================================================
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

        return Inertia::render('Welcome', [
            'terbaruData'   => $data['latest'],
            'populerData'   => $data['popular'],
            'pieData'       => $data['pieData'],
            'yearlyData'    => $data['yearlyData'],
            'monthlyData'   => $data['monthlyData'],
            'beritaTerkini' => $data['berita'],
            'summary'       => $data['summary'],
            'allowedAkses'  => $data['allowedAkses'], // ✅ kirim juga ke front-end
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
            'allowedAkses'  => $data['allowedAkses'], // ✅ penting untuk ProdukHukum.jsx
        ]);
    }
}
