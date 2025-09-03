<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Navigation;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;


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
                if (!$menu->url) return true; // parent menu tanpa URL

                $permission = "read menu:{$menu->id}";
                return $user->can($permission);
            })
            ->map(function ($menu) use ($user) {
                $menu->children = $menu->children
                    ->filter(function ($child) use ($user) {
                        if (!$child->url) return true;

                        $permission = "read menu:{$child->id}";
                        return $user->can($permission);
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
        'name'      => 'required|string',
        'url'       => 'required|string',
        'parent_id' => 'nullable|integer',
        'icon'      => 'nullable|string',
    ]);

    DB::transaction(function () use ($request) {
        // 1. Simpan menu ke DB
        $navigasi = Navigation::create([
            'name'      => $request->name,
            'url'       => $request->url,
            'parent_id' => $request->parent_id,
            'icon'      => $request->icon,
        ]);

        // 2. Buat permission (sama seperti kode kamu sekarang)
        $role = Role::firstOrCreate(['name' => 'superadmin']);
        if (!$request->parent_id) {
            $permName = "read menu:{$navigasi->id}";
            $permission = Permission::firstOrCreate(['name' => $permName]);
            $role->givePermissionTo($permission);
        } else {
            $permissions = ['read', 'create', 'update', 'delete'];
            foreach ($permissions as $perm) {
                $permName = "{$perm} menu:{$navigasi->id}";
                $permission = Permission::firstOrCreate(['name' => $permName]);
                $role->givePermissionTo($permission);
            }
        }

        // 3. Auto generate Controller
        $controllerName = ucfirst($request->url) . 'Controller';
        $controllerPath = app_path("Http/Controllers/Admin/{$controllerName}.php");

        if (!File::exists($controllerPath)) {
            $controllerStub = <<<PHP
            <?php

            namespace App\Http\Controllers\Admin;

            use App\Http\Controllers\Controller;
            use Inertia\Inertia;
            use Illuminate\Http\Request;

            class {$controllerName} extends Controller
            {
                public function index()
                {
                    return Inertia::render("Admin/{$request->url}/Index");
                }
            }
            PHP;

            File::put($controllerPath, $controllerStub);
        }

        // 4. Tambahkan Route
        $routesFile = base_path("routes/web.php");
        $routeDef = "Route::resource('{$request->url}', App\\Http\\Controllers\\Admin\\{$controllerName}::class);";

        $routesContent = File::get($routesFile);
        if (strpos($routesContent, $routeDef) === false) {
            File::append($routesFile, "\n" . $routeDef . "\n");
        }

        // 5. Generate Inertia Page React
        $reactPath = resource_path("js/Pages/Admin/{$request->url}");
        if (!File::exists($reactPath)) {
            File::makeDirectory($reactPath, 0755, true);
        }

        $reactFile = $reactPath . "/Index.jsx";
        if (!File::exists($reactFile)) {
            $reactStub = <<<JSX
            import React from "react";
            import AdminLayout from "@/Layouts/AdminLayout";

            export default function Index() {
                return (
                    <AdminLayout>
                        <div className="p-6 bg-white rounded shadow">
                            <h1 className="text-xl font-semibold">Halaman {$request->name}</h1>
                            <p className="text-gray-600">Ini halaman default setelah menu "{$request->name}" dibuat.</p>
                        </div>
                    </AdminLayout>
                );
            }
            JSX;

            File::put($reactFile, $reactStub);
        }
    });

    return response()->json(['message' => 'Menu + halaman default berhasil dibuat']);
}

    public function destroy($id)
{
    $menu = Navigation::with('children')->findOrFail($id);

    DB::transaction(function () use ($menu) {
        $deleteMenuRecursive = function ($menuItem) use (&$deleteMenuRecursive) {
            foreach ($menuItem->children as $child) {
                $deleteMenuRecursive($child);
            }

            // 1. Hapus permission terkait
            $permissions = Permission::where('name', 'like', "%menu:{$menuItem->id}%")->get();
            foreach ($permissions as $perm) {
                foreach ($perm->roles as $role) {
                    $role->revokePermissionTo($perm);
                }
                $perm->delete();
            }

            // 2. Hapus controller & route
            $this->removeRouteAndController($menuItem);

            // 3. Hapus menu
            $menuItem->delete();
        };

        $deleteMenuRecursive($menu);
    });

    return response()->json(['message' => 'Menu berhasil dihapus']);
}

/**
 * Hapus file controller & baris route terkait menu
 */
protected function removeRouteAndController($menuItem)
{
    // Nama controller (PascalCase dari url)
    $controllerName = Str::studly($menuItem->url) . "Controller";
    $controllerPath = app_path("Http/Controllers/Admin/{$controllerName}.php");

    // Hapus file controller jika ada
    if (file_exists($controllerPath)) {
        unlink($controllerPath);
    }

    // 🔥 Hapus file view/page React (Inertia)
    $pageName = Str::studly($menuItem->url) . ".jsx";
    $pagePath = resource_path("js/Pages/Admin/{$pageName}");
    if (file_exists($pagePath)) {
        unlink($pagePath);
    }

    // Hapus baris di routes/web.php
    $routeFile = base_path('routes/web.php');
    if (file_exists($routeFile)) {
        $routes = file($routeFile, FILE_IGNORE_NEW_LINES);

        // Hanya hapus baris yang memanggil controller ini (regex aman)
        $newRoutes = array_filter($routes, function ($line) use ($controllerName) {
            return !preg_match("/\b{$controllerName}\b/", $line);
        });

        file_put_contents($routeFile, implode(PHP_EOL, $newRoutes));
    }
}

}
