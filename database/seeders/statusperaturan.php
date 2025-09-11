<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Statusperaturan extends Seeder
{
    public function run(): void
    {
        DB::table('status_peraturan')->insert([
            [
                'nama' => 'Berlaku',
                'keterangan' => 'Peraturan masih berlaku penuh',
                'color' => 'green',
            ],
            [
                'nama' => 'Dicabut',
                'keterangan' => 'Peraturan sudah tidak berlaku karena dicabut oleh peraturan lain',
                'color' => 'red',
            ],
            [
                'nama' => 'Dicabut Sebagian',
                'keterangan' => 'Peraturan hanya berlaku sebagian karena ada pasal/ayat yang dicabut',
                'color' => 'orange',
            ],
            [
                'nama' => 'Diubah',
                'keterangan' => 'Peraturan telah mengalami perubahan oleh peraturan lain',
                'color' => 'blue',
            ],
            [
                'nama' => 'Mengubah',
                'keterangan' => 'Peraturan ini mengubah ketentuan dalam peraturan sebelumnya',
                'color' => 'purple',
            ],
        ]);
    }
}
