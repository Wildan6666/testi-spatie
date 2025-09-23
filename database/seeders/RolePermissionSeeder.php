<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User; // <-- Tambahkan ini

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // list semua permissions
        $permissions = [
            'manage users',
            'manage roles',
            'manage permissions',
            'verify document',
            'view report',
            'upload document',
            'view document',
            'view public docs',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // buat roles
        $roles = [
            'superadmin',
            'admin',
            'verifikator',
            'pimpinan',
            'pegawai',
            'mahasiswa',
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
        }

        // assign permissions ke masing-masing role
        Role::where('name', 'superadmin')->first()
            ->syncPermissions(Permission::all());

        Role::where('name', 'admin')->first()
            ->syncPermissions(['manage users', 'manage roles']);

        Role::where('name', 'verifikator')->first()
            ->syncPermissions(['verify document']);

        Role::where('name', 'pimpinan')->first()
            ->syncPermissions(['view report']);

        Role::where('name', 'pegawai')->first()
            ->syncPermissions(['upload document']);

        Role::where('name', 'mahasiswa')->first()
            ->syncPermissions(['view document']);

  
    }
    }

