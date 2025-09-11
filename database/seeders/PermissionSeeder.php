<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            // dashboard
            'read dashboard',

            // konfigurasi
            'read users',
            'read permissions',
            'read menu',
            'read roles',

            // modul lain
            'read dokumen',
            'read jenis hukum',
            'read status peraturan',
            'read produk hukum',
            'read instansi',
            'read tipe dokumen',
            'read verifikasi data',
            'read validasi dokumen',
            'read master status',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }
    }
}
