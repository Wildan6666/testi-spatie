<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisHukumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jenis_hukum')->insert([
            [
                'nama' => 'Undang-Undang',
                'singkatan'  => 'UU',
                'kode'       => 'UU',
                'keterangan'  => 'Produk hukum setingkat Undang-Undang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Peraturan Pemerintah',
                'singkatan'  => 'PP',
                'kode'       => 'PP',
                'keterangan'  => 'Peraturan pelaksana undang-undang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Peraturan Rektor',
                'singkatan'  => 'PerRek',
                'kode'       => 'PRR',
                'keterangan'  => 'Produk hukum internal universitas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Keputusan Rektor',
                'singkatan'  => 'KepRek',
                'kode'       => 'KPR',
                'keterangan'  => 'Keputusan resmi Rektor',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Surat Edaran Rektor',
                'singkatan'  => 'SE',
                'kode'       => 'SER',
                'keterangan'  => 'Surat edaran resmi Rektor',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
