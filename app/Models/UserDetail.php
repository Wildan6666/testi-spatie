<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;

    // Kolom yang dapat diisi
    protected $fillable = [
        'user_id',
        'nip',
        'instansi_id',
        'nim',
        'fakultas_id',
        'prodi_id',
        'status_aktif',
    ];

    /**
     * Relasi ke User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
