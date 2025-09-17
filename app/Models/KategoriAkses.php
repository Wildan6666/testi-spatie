<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriAkses extends Model
{
    //
    use HasFactory;

       protected $table = 'kategori_akses';

        protected $fillable = [
            
        'nama',
        'deskripsi',
        'kode',
        ];
}
