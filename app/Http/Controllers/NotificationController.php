<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProdukHukum;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->hasRole('verifikator')) {

            // Ambil semua instansi yang menjadi tanggung jawab verifikator ini
            $instansiIds = DB::table('verifikator_instansi')
                ->where('user_id', $user->id)
                ->pluck('instansi_id')
                ->toArray();

            // Kalau tidak ada instansi yang terkait, return kosong
            if (empty($instansiIds)) {
                return response()->json([]);
            }

            // Ambil dokumen dengan status pending (1) dari instansi tersebut
            $notifications = ProdukHukum::whereIn('instansi_id', $instansiIds)
                ->where('status_id', 1) // pending
                ->with('instansi')
                ->orderByDesc('updated_at')
                ->take(5)
                ->get()
                ->map(fn($item) => [
                    'id'         => $item->id,
                    'judul'      => $item->judul,
                    'pesan'      => "Dokumen \"{$item->judul}\" dari instansi {$item->instansi?->nama} menunggu verifikasi.",
                    'status'     => 'pending',
                    'link'       => route('produk-hukum.index'),
                    'updated_at' => $item->updated_at?->diffForHumans(),
                ]);

            return response()->json($notifications);
        }
        else {
            $notifications = ProdukHukum::where('user_id', $user->id)
                ->whereIn('status_id', [2, 3]) // 2 = disetujui, 3 = ditolak
                ->whereColumn('updated_at', '!=', 'created_at')
                ->orderByDesc('updated_at')
                ->take(5)
                ->get()
                ->map(function ($item) {
                    $statusText = $item->status_id == 2 ? 'disetujui' : 'ditolak';
                    $statusType = $item->status_id == 2 ? 'approved' : 'rejected';

                    return [
                        'id'         => $item->id,
                        'judul'      => $item->judul,
                        'pesan'      => "Dokumen \"{$item->judul}\" telah {$statusText}.",
                        'status'     => $statusType,
                        'link'       => route('produk-hukum.index'),
                        'updated_at' => $item->updated_at?->diffForHumans(),
                    ];
                });

            return response()->json($notifications);
        }
    }
}
