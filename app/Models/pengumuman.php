<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    use HasFactory;
     protected $table = 'pengumuman';

    protected $fillable = [
        'title',
        'type',
        'related_id',
        'published_at',
        'is_active',
    ];

    // Relasi dinamis: ke ProdukHukum atau Berita
    public function related()
    {
        return $this->morphTo();
    }

    public function produkHukum()
    {
        return $this->belongsTo(ProdukHukum::class, 'related_id');
    }

    public function berita()
    {
        return $this->belongsTo(Berita::class, 'related_id');
    }
}

