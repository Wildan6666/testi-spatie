<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instansi extends Model
{
    use HasFactory;

    protected $table = 'instansi'; // pastikan sesuai dengan nama tabelmu

    protected $fillable = [
        'nama',
        'singkatan',
        'alamat',
        'kontak',
    ];

public function verifikatorUsers()
{
    return $this->belongsToMany(
        \App\Models\User::class,
        'verifikator_instansi',
        'instansi_id',   // FK di pivot ke instansi
        'user_id'        // FK di pivot ke users
    )->withPivot('role');
}

public function userRoles()
{
    return $this->belongsToMany(User::class, 'verifikator_instansi', 'instansi_id', 'user_id')
                ->withPivot('role')
                ->withTimestamps();
}

}
