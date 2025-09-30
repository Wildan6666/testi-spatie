<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProdukHukum;
use App\Models\Berita; // tambahkan model berita
use Illuminate\Support\Str;
class BerandaController extends Controller
{
    public function index()
    {
        // Produk hukum terbaru
        $latest = ProdukHukum::orderByDesc('created_at')
            ->take(6)
            ->get()
            ->map(function ($row) {
                return [
                    'id'        => $row->id,
                    'judul'     => $row->judul,
                    'kategori'  => $row->subjek,
                    'deskripsi' => $row->ringkasan ?? '-',
                    'views'     => 0,
                    'downloads' => 0,
                ];
            });

        // Produk hukum populer (sementara berdasarkan created_at)
        $popular = ProdukHukum::orderByDesc('created_at')
            ->take(6)
            ->get()
            ->map(function ($row) {
                return [
                    'id'        => $row->id,
                    'judul'     => $row->judul,
                    'kategori'  => $row->subjek,
                    'deskripsi' => $row->ringkasan ?? '-',
                    'views'     => 0,
                    'downloads' => 0,
                ];
            });

        // Statistik distribusi jenis dokumen
        $pieData = ProdukHukum::selectRaw('jenis_hukum_id, COUNT(*) as total')
            ->groupBy('jenis_hukum_id')
            ->with('jenisHukum')
            ->get()
            ->map(function ($row) {
                return [
                    'name'  => optional($row->jenisHukum)->nama ?? 'Lainnya',
                    'value' => $row->total,
                    'color' => '#f97316',
                ];
            });

        // Statistik per tahun
        $yearlyData = ProdukHukum::selectRaw('tahun, COUNT(*) as documents')
            ->groupBy('tahun')
            ->orderBy('tahun')
            ->get();

        // Statistik bulanan (6 bulan terakhir)
        $monthlyData = ProdukHukum::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Berita terkini
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

            $totalDocs = ProdukHukum::count();
$monthlyDocs = ProdukHukum::whereMonth('created_at', now()->month)->count();
$latestYear = ProdukHukum::max('tahun');

        return Inertia::render('Welcome', [
            'terbaruData'   => $latest,
            'populerData'   => $popular,
            'pieData'       => $pieData,
            'yearlyData'    => $yearlyData,
            'monthlyData'   => $monthlyData,
            'beritaTerkini' => $berita,
             'summary' => [
        'total'   => $totalDocs,
        'active'  => 0, // dummy, karena belum ada field status aktif
        'monthly' => $monthlyDocs,
        'year'    => $latestYear,
    ]
        ]);
    }

    public function dashboard()
    {
        $total = ProdukHukum::count();

        $yearlyData = ProdukHukum::selectRaw('tahun, COUNT(*) as documents')
            ->groupBy('tahun')
            ->orderBy('tahun')
            ->get();

        $monthlyData = ProdukHukum::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $pieData = ProdukHukum::selectRaw('jenis_hukum_id, COUNT(*) as total')
            ->groupBy('jenis_hukum_id')
            ->with('jenisHukum')
            ->get()
            ->map(fn($row) => [
                'name'  => optional($row->jenisHukum)->nama ?? 'Lainnya',
                'value' => $row->total,
            ]);

        // Berita terkini untuk dashboard juga
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

        return Inertia::render('Dashboard', [
            'stats' => [
                'total'   => $total,
                'yearly'  => $yearlyData,
                'monthly' => $monthlyData,
                'pie'     => $pieData,
            ],
            'beritaTerkini' => $berita,
        ]);
    }
}
