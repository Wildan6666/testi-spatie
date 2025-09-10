<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Navigation;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class NavigationPermissionSeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::firstOrCreate(['name' => 'superadmin']);

        $this->command->info("🔄 Sinkronisasi permission dari tabel navigations...");

        Navigation::all()->each(function ($menu) use ($role) {
            if ($menu->parent_id) {
                // child menu → CRUD
                foreach (['read', 'create', 'update', 'delete'] as $perm) {
                    $permName = strtolower("{$perm} {$menu->name}");
                    $permission = Permission::firstOrCreate(['name' => $permName]);
                    $role->givePermissionTo($permission);

                    if ($perm === 'read') {
                        $menu->permissions = $permName;
                    }
                }
            } else {
                // parent menu → hanya read
                $permName = strtolower("read {$menu->name}");
                $permission = Permission::firstOrCreate(['name' => $permName]);
                $role->givePermissionTo($permission);

                $menu->permissions = $permName;
            }

            $menu->save();
            $this->command->line("✅ {$menu->name} → {$menu->permissions}");
            
        });

        $this->command->info("🎉 Selesai! Semua menu sudah punya permissions.");
        
    }
}
