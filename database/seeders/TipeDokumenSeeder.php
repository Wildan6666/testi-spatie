<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TipeDokumenSeeder extends Seeder
{
    public function run()
    {
        DB::table('tipe_dokumen')->insert([
            [
                'nama' => 'Kepegawaian',
                'kode' => 'KEP',
                'deskripsi' => 'Dokumen yang berhubungan dengan data dan administrasi pegawai',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama' => 'Keuangan',
                'kode' => 'KEU',
                'deskripsi' => 'Dokumen yang berhubungan dengan laporan, anggaran, dan transaksi keuangan',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama' => 'Kepanitiaan',
                'kode' => 'PAN',
                'deskripsi' => 'Dokumen yang berhubungan dengan kepanitiaan kegiatan dan organisasi',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama' => 'Akademik',
                'kode' => 'AKD',
                'deskripsi' => 'Dokumen yang berhubungan dengan kegiatan akademik, kurikulum, dan pendidikan',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama' => 'Umum',
                'kode' => 'UMM',
                'deskripsi' => 'Dokumen umum yang tidak termasuk kategori khusus',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
