<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class Navigations extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $menus = [
            // Dashboard
            [
                'name' => 'Dashboard',
                'url' => '/dashboard',
                'permissions' => 'read dashboard',
                'parent_id' => null,
                'sort' => 1,
                'icon' => 'home',
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Konfigurasi
            [
                'name' => 'Konfigurasi',
                'url' => null,
                'permissions' => null,
                'parent_id' => null,
                'sort' => 2,
                'icon' => 'settings',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Users',
                'url' => '/konfigurasi/users',
                'permissions' => 'read users',
                'parent_id' => 2,
                'sort' => 1,
                'icon' => 'users',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Roles',
                'url' => '/konfigurasi/roles',
                'permissions' => 'read roles',
                'parent_id' => 2,
                'sort' => 2,
                'icon' => 'shield',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Permissions',
                'url' => '/konfigurasi/permissions',
                'permissions' => 'read permissions',
                'parent_id' => 2,
                'sort' => 3,
                'icon' => 'lock',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Menu',
                'url' => '/konfigurasi/menus',
                'permissions' => 'read menu',
                'parent_id' => 2,
                'sort' => 4,
                'icon' => 'list',
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Modul lainnya
            [
                'name' => 'Dokumen',
                'url' => '/dokumen',
                'permissions' => 'read dokumen',
                'parent_id' => null,
                'sort' => 3,
                'icon' => 'file-text',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Jenis Hukum',
                'url' => '/jenis-hukum',
                'permissions' => 'read jenis hukum',
                'parent_id' => null,
                'sort' => 4,
                'icon' => 'book',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Status Peraturan',
                'url' => '/status-peraturan',
                'permissions' => 'read status peraturan',
                'parent_id' => null,
                'sort' => 5,
                'icon' => 'check-circle',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Produk Hukum',
                'url' => '/produk-hukum',
                'permissions' => 'read produk hukum',
                'parent_id' => null,
                'sort' => 6,
                'icon' => 'package',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Instansi',
                'url' => '/instansi',
                'permissions' => 'read instansi',
                'parent_id' => null,
                'sort' => 7,
                'icon' => 'building',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Tipe Dokumen',
                'url' => '/tipe-dokumen',
                'permissions' => 'read tipe dokumen',
                'parent_id' => null,
                'sort' => 8,
                'icon' => 'file',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Verifikasi Data',
                'url' => '/verifikasi-data',
                'permissions' => 'read verifikasi data',
                'parent_id' => null,
                'sort' => 9,
                'icon' => 'check-square',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Validasi Dokumen',
                'url' => '/validasi-dokumen',
                'permissions' => 'read validasi dokumen',
                'parent_id' => null,
                'sort' => 10,
                'icon' => 'file-check',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Master Status',
                'url' => '/master-status',
                'permissions' => 'read master status',
                'parent_id' => null,
                'sort' => 11,
                'icon' => 'layers',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('navigations')->insert($menus);
    }
}
