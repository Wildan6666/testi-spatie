<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;


class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relasi ke instansi melalui pivot
    public function instansis()
    {
        return $this->belongsToMany(Instansi::class, 'verifikator_instansi', 'user_id', 'instansi_id')
                    ->withPivot('role')
                    ->withTimestamps();
    }

    // Scope khusus untuk ambil instansi di mana user sebagai verifikator
 public function verifikatorInstansis()
{
    $roleId = Role::where('name', 'verifikator')->value('id');

    return $this->belongsToMany(Instansi::class, 'verifikator_instansi', 'user_id', 'instansi_id')
                ->wherePivot('role_id', $roleId);
}

    // Scope khusus untuk ambil instansi di mana user sebagai viewer
    public function viewerInstansis()
    {
        return $this->instansis()->wherePivot('role', 'viewer');
    }
}
