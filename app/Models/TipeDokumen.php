<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TipeDokumen extends Model
{
     use HasFactory;

      protected $table = 'Tipe_Dokumen';

       protected $fillable = [
            
        'nama',
        'deskripsi',
        'kode',
        ];

}
