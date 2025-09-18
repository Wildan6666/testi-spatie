<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class Instansi extends Model
{
    use HasFactory;

    protected $table = 'instansi';

    protected $fillable = [
        'nama',
        'singkatan',
        'alamat',
        'kontak',
    ];

    // Relasi umum ke semua user dengan role apapun di instansi ini
    public function users()
    {
        return $this->belongsToMany(User::class, 'verifikator_instansi', 'instansi_id', 'user_id')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    // Scope khusus untuk ambil hanya verifikator
   public function verifikatorUsers()
{
    $roleId = Role::where('name', 'verifikator')->value('id');

    return $this->users()->wherePivot('role_id', $roleId);
}

    // Scope khusus untuk ambil hanya viewer
    public function viewerUsers()
    {
        return $this->users()->wherePivot('role', 'viewer');
    }
}
