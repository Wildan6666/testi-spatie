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
        'kategori_akses_id',
        'berkas',
        'views',
        'downloads',
        'parent_id',
         'user_id',
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
    // app/Models/ProdukHukum.php
public function verifikator()
{
    return $this->belongsTo(User::class, 'verified_by');
}
public function riwayatVerifikasi()
{
    return $this->hasMany(RiwayatVerifikasi::class, 'produk_hukum_id');
}

public function kategoriAkses()
{
    return $this->belongsTo(\App\Models\KategoriAkses::class, 'kategori_akses_id');
}

 public function parent()
    {
        return $this->belongsTo(ProdukHukum::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(ProdukHukum::class, 'parent_id');
    }


    public function parentRecursive()
{
    return $this->parent()->with('parentRecursive');
}

public function childrenRecursive()
{
    return $this->children()->with([
        'statusPeraturan',
        'instansi',
        'childrenRecursive', // ← inilah yang membuatnya benar-benar rekursif
    ]);
}
public function user()
{
    return $this->belongsTo(User::class);
}



}




