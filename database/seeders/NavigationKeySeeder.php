<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Navigation;
use Illuminate\Support\Str;

class NavigationKeySeeder extends Seeder
{
    public function run(): void
    {
        Navigation::chunk(100, function ($navigations) {
            foreach ($navigations as $nav) {
                if (!$nav->key) {
                    $nav->key = Str::slug($nav->name, '_');
                    $nav->save();
                }
            }
        });
    }
}
