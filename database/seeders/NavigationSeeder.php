<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Navigation;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class NavigationSeeder extends Seeder
{
    public function run()
    {
        // Pastikan role superadmin ada
        $role = Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);

        // Buat Dashboard
        $dashboard = Navigation::firstOrCreate([
            'name' => 'Dashboard',
            'url' => 'dashboard',
            'parent_id' => null,
        ], ['sort' => 1, 'icon' => 'home']);

        $this->createPermission('read dashboard', $role);

        // Menu Konfigurasi
        $konfigurasi = Navigation::firstOrCreate([
            'name' => 'Konfigurasi',
            'url' => '#',
            'parent_id' => null,
        ], ['sort' => 2, 'icon' => 'settings']);

        // Sub-menu Konfigurasi
        $subMenus = [
            ['name' => 'Users', 'url' => 'konfigurasi/users'],
            ['name' => 'Roles', 'url' => 'konfigurasi/roles'],
            ['name' => 'Permissions', 'url' => 'konfigurasi/permissions'],
            ['name' => 'Menu', 'url' => 'konfigurasi/menu'],
        ];

        foreach ($subMenus as $index => $menu) {
            $child = Navigation::firstOrCreate([
                'name' => $menu['name'],
                'url' => $menu['url'],
                'parent_id' => $konfigurasi->id,
            ], ['sort' => $index + 1, 'icon' => 'circle']);

            foreach (['read', 'create', 'update', 'delete'] as $perm) {
                $this->createPermission("$perm {$menu['url']}", $role);
            }
        }

        // Settings
        $settings = Navigation::firstOrCreate([
            'name' => 'Settings',
            'url' => 'settings',
            'parent_id' => null,
        ], ['sort' => 3, 'icon' => 'cog']);

        $this->createPermission('read settings', $role);
    }

    private function createPermission($name, $role)
    {
        $permission = Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        if (!$role->hasPermissionTo($permission)) {
            $role->givePermissionTo($permission);
        }
    }
}
