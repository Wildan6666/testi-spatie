<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Navigation;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class MenuController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $menus = Navigation::with('children')
            ->whereNull('parent_id')
            ->orderBy('sort')
            ->get()
            ->filter(function ($menu) use ($user) {
                if (!$menu->url) return true; // menu tanpa URL (hanya parent)
                return $user->can('read ' . ltrim($menu->url, '/'));
            })
            ->map(function ($menu) use ($user) {
                $menu->children = $menu->children
                    ->filter(function ($child) use ($user) {
                        return !$child->url || $user->can('read ' . ltrim($child->url, '/'));
                    })
                    ->values();
                return $menu;
            })
            ->values();

        return Inertia::render('Dashboard', [
            'menus' => $menus,
            'auth'  => ['user' => $user],
        ]);
    }


    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'url' => 'required|string',
        'parent_id' => 'nullable|integer',
        'icon' => 'nullable|string',
    ]);

    DB::transaction(function () use ($request) {
        // Simpan menu
        $navigasi = Navigation::create([
            'name' => $request->name,
            'url' => $request->url,
            'parent_id' => $request->parent_id,
            'icon' => $request->icon,
        ]);

        // Cek role superadmin
        $role = Role::where('name', 'superadmin')->first();
        if (!$role) {
            $role = Role::create(['name' => 'superadmin']);
        }

        if ($request->main_menu == null) {
            // Menu utama → hanya buat permission read
            $newPermission = Permission::create(['name' => 'read ' . $navigasi->url]);
            $role->givePermissionTo($newPermission->name);
        } else {
            // Menu child → buat CRUD
            $permissions = ['read', 'create', 'update', 'delete'];

            foreach ($permissions as $perm) {
                $permName = $perm . ' ' . $request->url;
                $newPermission = Permission::create(['name' => $permName]);
                $role->givePermissionTo($newPermission->name);
            }
        }
    });

    return response()->json(['message' => 'Menu berhasil dibuat']);
 }
}
