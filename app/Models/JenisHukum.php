<?php

// app/Models/JenisProdukHukum.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisHukum extends Model
{
    protected $table = 'jenis_hukum';
      protected $fillable = ['nama', 'keterangan', 'singkatan', 'kode'];
}
