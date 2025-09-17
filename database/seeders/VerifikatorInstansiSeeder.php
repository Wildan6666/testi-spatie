<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Instansi;
use Illuminate\Support\Facades\DB;

class VerifikatorInstansiSeeder extends Seeder
{
    public function run()
    {
        // Ambil semua instansi yang sudah ada
        $instansis = Instansi::all();

        // Ambil beberapa user yang punya role Verifikator (pakai spatie/permission)
        $verifikators = User::role('Verifikator')->get(); 

        // Loop setiap instansi dan assign verifikator secara acak
        foreach ($instansis as $instansi) {
            $randomUser = $verifikators->random(); // pilih 1 verifikator random

            DB::table('verifikator_instansi')->insert([
                'instansi_id' => $instansi->id,
                'user_id'     => $randomUser->id,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }
}
