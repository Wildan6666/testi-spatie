<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'nomor',
        'tahun',
        'file',
        'jenis_dokumen_id',
        'jenis_hukum_id',
        'status_id',
        'verifikasi_id',
        'institution_id',
    ];

    public function documentType()
    {
        return $this->belongsTo(DocumentType::class);
    }

    public function lawType()
    {
        return $this->belongsTo(LawType::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function verifikasi()
    {
        return $this->belongsTo(Verifikasi::class);
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
}
