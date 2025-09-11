<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Navigation;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class Permissionclean extends Seeder
{
    public function run()
    {
        // 1. Ambil semua permission dari navigations
        $rawPermissions = Navigation::pluck('permissions')
            ->filter()
            ->unique()
            ->toArray();

        $validPermissions = [];

        foreach ($rawPermissions as $perm) {
            // Pecah jadi kata-kata
            $parts = explode(' ', $perm, 2);
            $action = strtolower($parts[0] ?? '');
            $resource = strtolower($parts[1] ?? '');

            // Jika CRUD → konversi jadi manage
            if (in_array($action, ['create', 'update', 'delete'])) {
                $perm = "manage {$resource}";
            }

            // Simpan ke daftar valid
            $validPermissions[] = trim($perm);
        }

        // Hilangkan duplikat
        $validPermissions = array_unique($validPermissions);

        // 2. Buat permission baru jika belum ada
        foreach ($validPermissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // 3. Hapus permission yang tidak ada di daftar valid
        Permission::whereNotIn('name', $validPermissions)->delete();

        $this->command->info('✅ Permissions berhasil disinkronisasi dan CRUD dikonversi ke read/manage.');
    }
}
