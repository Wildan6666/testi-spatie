<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;

class VerifikatorInstansiRoleSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil role dari Spatie
        $verifikator = Role::where('name', 'verifikator')->first();
        $viewer = Role::where('name', 'viewer')->first();

        if (!$verifikator) {
            $this->command->error('Role "verifikator" belum ada di tabel roles!');
            return;
        }

        // Cek apakah kolom 'role' (string lama) masih ada
        if (Schema::hasColumn('verifikator_instansi', 'role')) {
            $rows = DB::table('verifikator_instansi')->get();

            foreach ($rows as $row) {
                $roleId = null;

                if ($row->role && strtolower($row->role) === 'verifikator' && $verifikator) {
                    $roleId = $verifikator->id;
                } elseif ($row->role && strtolower($row->role) === 'viewer' && $viewer) {
                    $roleId = $viewer->id;
                }

                if ($roleId) {
                    DB::table('verifikator_instansi')
                        ->where('id', $row->id)
                        ->update(['role_id' => $roleId]);
                }
            }

            $this->command->info('Berhasil mapping role string → role_id di verifikator_instansi.');
        } else {
            // Fallback: kalau kolom role sudah dihapus, isi semua ke verifikator
            DB::table('verifikator_instansi')->update(['role_id' => $verifikator->id]);
            $this->command->warn('Kolom role sudah tidak ada. Semua baris di-set jadi verifikator.');
        }
    }
}
