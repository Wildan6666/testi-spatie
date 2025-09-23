<?php

namespace Database\Seeders;

use App\Models\JenisHukum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
        RoleSeeder::class,
        SuperAdminSeeder::class,
        Navigations::class,
        RolePermissionSeeder::class,
        InstansiSeeder::class,
        JenisHukumSeeder::class,
        KategoriAksesSeeder::class,
        MasterStatusSeeder::class,
        NavigationPermissionSeeder::class,
        //Permissionclean::class,
        PermissionSeeder::class,
        RolePermissionSeeder::class,
        Statusperaturan::class,
        TipeDokumenSeeder::class,


        // tambahkan seeder lain sesuai kebutuhan
    ]);


      
    }
}
