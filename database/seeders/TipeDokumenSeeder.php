<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipeDokumen;

class TipeDokumenSeeder extends Seeder
{
    public function run(): void
    {
        TipeDokumen::insert([
            [
                'nama' => 'Surat Menteri',
                'kode' => 'SM',
                'deskripsi' => 'Surat resmi yang dikeluarkan oleh Menteri',
                'kategori_akses_id' => 1, // Publik
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Surat Rektor',
                'kode' => 'SR',
                'deskripsi' => 'Surat resmi yang dikeluarkan oleh Rektor',
                'kategori_akses_id' => 2, // Internal
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Peraturan Menteri',
                'kode' => 'PERMEN',
                'deskripsi' => 'Peraturan yang dikeluarkan oleh Menteri',
                'kategori_akses_id' => 1, // Publik
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Keputusan Rektor',
                'kode' => 'KEPREK',
                'deskripsi' => 'Keputusan resmi yang dikeluarkan oleh Rektor',
                'kategori_akses_id' => 2, // Internal
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Instruksi Menteri',
                'kode' => 'INSMEN',
                'deskripsi' => 'Instruksi resmi dari Menteri',
                'kategori_akses_id' => 3, // Rahasia
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
