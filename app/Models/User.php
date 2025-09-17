<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // app/Models/User.php
// app/Models/User.php
public function verifikatorInstansi()
{
    return $this->belongsToMany(
        \App\Models\Instansi::class,   // model tujuan
        'verifikator_instansi',        // nama tabel pivot
        'user_id',                     // FK di pivot ke users
        'instansi_id'                  // FK di pivot ke instansi
    )->withPivot('role','verifikator');
}
public function instansiRoles()
{
    return $this->belongsToMany(Instansi::class, 'verifikator_instansi', 'user_id', 'instansi_id')
                ->withPivot('role')
                ->withTimestamps();
}

// Ambil hanya instansi di mana user adalah verifikator

// Ambil hanya instansi di mana user adalah viewer
public function viewerInstansi()
{
    return $this->instansiRoles()->wherePivot('role', 'viewer');
}


}
