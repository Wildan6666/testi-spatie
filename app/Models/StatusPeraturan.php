<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusPeraturan extends Model
{
    use HasFactory;

    protected $table = 'status_peraturan';

    protected $fillable = [
        'nama',
        'keterangan',
        'color',
    ];
}
