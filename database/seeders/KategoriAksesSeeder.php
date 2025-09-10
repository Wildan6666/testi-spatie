<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriAksesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kategori_akses')->insert([
            [
                'nama'       => 'Publik',
                'kode'       => 'PUB',
                'deskripsi'  => 'Dapat diakses oleh semua orang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama'       => 'Internal',
                'kode'       => 'INT',
                'deskripsi'  => 'Hanya dapat diakses oleh civitas akademika/universitas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama'       => 'Rahasia',
                'kode'       => 'RAH',
                'deskripsi'  => 'Hanya dapat diakses oleh pihak berwenang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
