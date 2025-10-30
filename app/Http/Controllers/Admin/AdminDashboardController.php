<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProdukHukum;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Navigation;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminDashboardController extends Controller
{
     public function index()
    {
        $user = Auth::user();

        // Hitung total dokumen
        $total = ProdukHukum::count();

        $approved = ProdukHukum::whereHas('statusverifikasi', function ($q) {
            $q->where('nama_status', 'Approved');
        })->count();

        
        $pending = ProdukHukum::whereHas('statusverifikasi', function ($q) {
            $q->where('nama_status', 'Pending');
        })->count();

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

        // 🔹 Filter menu sesuai permission user
        $menus = Navigation::with('children')
            ->whereNull('parent_id')
            ->orderBy('sort')
            ->get()
            ->filter(function ($menu) use ($user) {
                // parent boleh null permission (folder menu)
                if (is_null($menu->parent_id)) {
                    return true;
                }
                return $menu->permissions && $user->can($menu->permissions);
            })
            ->map(function ($menu) use ($user) {
                $menu->children = $menu->children
                    ->filter(function ($child) use ($user) {
                        return $child->permissions && $user->can($child->permissions);
                    })
                    ->values();

                return $menu;
            })
            ->values();

        return Inertia::render('Admin/AdminDashboard', [
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name'), 
            ],
            'menus' => $menus,
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
