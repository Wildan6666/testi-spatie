<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InstansiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('instansi')->insert([
            [
                'nama'       => 'Universitas Jambi',
                'singkatan'  => 'UNJA',
                'alamat'     => 'Jl. Jambi - Muara Bulian KM. 15, Mendalo Darat, Jambi',
                'kontak'     => 'info@unja.ac.id | (0741) 123456',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama'       => 'Fakultas Hukum Universitas Jambi',
                'singkatan'  => 'FH UNJA',
                'alamat'     => 'Jl. Jambi - Muara Bulian KM. 15, Mendalo Darat, Jambi',
                'kontak'     => 'fh@unja.ac.id | (0741) 234567',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama'       => 'Rektorat Universitas Jambi',
                'singkatan'  => 'Rektorat UNJA',
                'alamat'     => 'Jl. Jambi - Muara Bulian KM. 15, Mendalo Darat, Jambi',
                'kontak'     => 'rektorat@unja.ac.id | (0741) 345678',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
