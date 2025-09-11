<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('masterstatus')->insert([
            [
                'nama_status' => 'Pending',
                'kode'        => 'PND',
                'color'       => 'bg-yellow-500',
                'deskripsi'   => 'Menunggu verifikasi',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'nama_status' => 'Approved',
                'kode'        => 'APP',
                'color'       => 'bg-green-500',
                'deskripsi'   => 'Disetujui / diverifikasi',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'nama_status' => 'Rejected',
                'kode'        => 'REJ',
                'color'       => 'bg-red-500',
                'deskripsi'   => 'Ditolak saat verifikasi',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'nama_status' => 'Draft',
                'kode'        => 'DFT',
                'color'       => 'bg-gray-500',
                'deskripsi'   => 'Belum diajukan verifikasi',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}
