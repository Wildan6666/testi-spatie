<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdukHukum extends Model
{
    use HasFactory;

    protected $table = 'produk_hukum';

    protected $fillable = [
        'judul',
        'nomor',
        'tahun',
        'ringkasan',
        'subjek',
        'tanggal_penetapan',
        'kata_kunci',
        'instansi_id',
        'status_id',
        'status_peraturan_id',
        'tipe_dokumen_id',
        'jenis_hukum_id',
        'berkas',
    ];

    // Relasi ke instansi
    public function instansi()
    {
        return $this->belongsTo(Instansi::class);
    }

    // Relasi ke master status
    public function statusVerifikasi()
{
    return $this->belongsTo(StatusVerifikasi::class, 'status_id', 'id');
}


    // Relasi ke status peraturan
    public function statusPeraturan()
    {
        return $this->belongsTo(StatusPeraturan::class);
    }

    // Relasi ke tipe dokumen
    public function tipeDokumen()
    {
        return $this->belongsTo(TipeDokumen::class);
    }

    // Relasi ke jenis hukum
    public function jenisHukum()
    {
        return $this->belongsTo(JenisHukum::class);
    }
}
