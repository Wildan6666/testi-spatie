<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProdukHukum;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->hasRole('verifikator')) {
            // 🔹 Verifikator → dokumen yang masih pending
            $notifications = ProdukHukum::where('status_id', 1)
                ->orderBy('updated_at', 'desc')
                ->take(5)
                ->get()
                ->map(fn($item) => [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'pesan' => "Dokumen \"{$item->judul}\" menunggu verifikasi",
                    'status' => 'pending',
                    'link' => route('produk-hukum.show', $item->id),
                    'updated_at' => $item->updated_at->diffForHumans(),
                ]);
        } else {
            // 🔹 User biasa → dokumen yang diverifikasi (disetujui / ditolak)
            $notifications = ProdukHukum::where('user_id', $user->id)
                ->whereIn('status_id', [2, 3])
                ->whereColumn('updated_at', '!=', 'created_at')
                ->orderBy('updated_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($item) {
                    $statusText = $item->status_id == 2 ? 'disetujui' : 'ditolak';
                    $statusType = $item->status_id == 2 ? 'approved' : 'rejected';

                    return [
                        'id' => $item->id,
                        'judul' => $item->judul,
                        'pesan' => "Dokumen \"{$item->judul}\" telah {$statusText}",
                        'status' => $statusType,
                        'link' => route('produk-hukum.show', $item->id),
                        'updated_at' => $item->updated_at->diffForHumans(),
                    ];
                });
        }

        return response()->json($notifications);
    }
}
