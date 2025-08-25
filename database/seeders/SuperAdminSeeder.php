<?php

// database/seeders/SuperAdminSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        // buat superadmin user
        $user = User::firstOrCreate(
            ['email' => 'superadmin@unja.ac.id'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password123'),
            ]
        );

        // buat role superadmin
        $role = Role::firstOrCreate(['name' => 'superadmin']);

        // buat semua permission default
        $permissions = [
            'manage users',
            'manage roles',
            'manage permissions',
            'manage menus',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // kasih semua permission ke superadmin role
        $role->syncPermissions(Permission::all());

        // assign role ke user
        $user->assignRole($role);
    }
}

