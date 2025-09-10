<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StatusVerifikasi extends Model
{
    use HasFactory;

        protected $table = 'masterstatus';
        protected $fillable = [
            
        'nama_status',
        'deskripsi',
        'kode',
    ];

}
