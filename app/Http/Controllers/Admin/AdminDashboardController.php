<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProdukHukum;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Hitung total dokumen
        $total = ProdukHukum::count();

        // Hitung status approved (status_peraturan = "Berlaku")
        $approved = ProdukHukum::whereHas('statusperaturan', function ($q) {
            $q->where('nama', 'Berlaku');
        })->count();

        // Hitung status pending (status_verifikasi = "Pending")
        $pending = ProdukHukum::whereHas('statusverifikasi', function ($q) {
            $q->where('nama_status', 'Pending');
        })->count();

        // Hitung status rejected (status_verifikasi = "Rejected")
        $rejected = ProdukHukum::whereHas('statusverifikasi', function ($q) {
            $q->where('nama_status', 'Rejected');
        })->count();

        // Data per tahun
        $perTahun = ProdukHukum::selectRaw('tahun, COUNT(*) as jumlah')
            ->groupBy('tahun')
            ->orderBy('tahun', 'asc')
            ->get();

        // Activity log (sementara dummy, nanti bisa ambil dari tabel log aktivitas)
        $activities = [
            ['message' => 'Admin menambahkan dokumen baru', 'time' => '2 menit lalu'],
            ['message' => 'Verifikator menyetujui dokumen X', 'time' => '10 menit lalu'],
            ['message' => 'Pengguna mengunduh dokumen Y', 'time' => '1 jam lalu'],
        ];

        return Inertia::render('Admin/Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'stats' => [
                'total' => $total,
                'approved' => $approved,
                'pending' => $pending,
                'rejected' => $rejected,
                'perTahun' => $perTahun,
            ],
            'activities' => $activities,
        ]);
    }
}
