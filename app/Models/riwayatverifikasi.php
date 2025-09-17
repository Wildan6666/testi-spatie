<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Riwayatverifikasi extends Model
{
    use HasFactory;

     protected $table = 'riwayat_verifikasi';
    protected $fillable = [
        'produk_hukum_id',
        'user_id',
        'status_id',
        'catatan',
    ];

    public function produkHukum()
    {
        return $this->belongsTo(ProdukHukum::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(\App\Models\StatusVerifikasi::class, 'status_id');
    }
}
