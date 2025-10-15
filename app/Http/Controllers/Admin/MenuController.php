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

class MenuController extends Controller
{
    /**
     * Tampilkan daftar menu
     */
    public function index()
    {
        $user = auth()->user();

        $menus = Navigation::with('children')
            ->whereNull('parent_id')
            ->orderBy('sort')
            ->get()
            ->filter(fn($menu) => $menu->permissions && $user->can($menu->permissions))
            ->map(function ($menu) use ($user) {
                $menu->children = $menu->children
                    ->filter(fn($child) => $child->permissions && $user->can($child->permissions))
                    ->values();
                return $menu;
            })
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'menus' => $menus,
            'auth' => [
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
            'flash' => session('flash', null),
        ]);
    }

    /**
     * Simpan menu baru + auto generate Controller dan File React
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'      => ['required', 'string', 'max:255', 'regex:/^[A-Za-z\s]+$/'],
            'url'       => ['required', 'string', 'max:255', 'regex:/^[A-Za-z\-]+$/'],
            'parent_id' => 'nullable|integer|exists:navigations,id',
            'icon'      => 'nullable|string|max:100',
        ], [
            'name.regex' => 'Nama menu hanya boleh mengandung huruf dan spasi.',
            'url.regex'  => 'URL hanya boleh berisi huruf dan tanda hubung (-).',
        ]);

        try {
            DB::transaction(function () use ($request) {
                $urlSlug = Str::slug($request->url ?: $request->name, '-');
                if (preg_match('/^\d+$/', $urlSlug)) {
                    $urlSlug = 'menu-' . $urlSlug;
                }

                $navigasi = Navigation::create([
                    'name'      => $request->name,
                    'url'       => $urlSlug,
                    'parent_id' => $request->parent_id,
                    'icon'      => $request->icon,
                ]);

                // 🔐 Permission otomatis
                $role = Role::firstOrCreate(['name' => 'superadmin']);

                if (!$request->parent_id) {
                    $permName = strtolower("read {$navigasi->name}");
                    $permission = Permission::firstOrCreate(['name' => $permName]);
                    $role->givePermissionTo($permission);
                    $navigasi->update(['permissions' => $permName]);
                } else {
                    foreach (['read', 'manage'] as $perm) {
                        $permName = strtolower("{$perm} {$navigasi->name}");
                        $permission = Permission::firstOrCreate(['name' => $permName]);
                        $role->givePermissionTo($permission);
                        if ($perm === 'read') {
                            $navigasi->update(['permissions' => $permName]);
                        }
                    }
                }

                // ⚙️ Generate Controller
                $controllerName = Str::studly($navigasi->url) . 'Controller';
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
                            return Inertia::render("Admin/{$navigasi->url}/Index");
                        }
                    }
                    PHP;
                    File::put($controllerPath, $controllerStub);
                }

                // ⚙️ Tambahkan Route ke web.php
                $routesFile = base_path("routes/web.php");
                $slug = $navigasi->url;
                $permBase = strtolower($navigasi->name);

                if (!$request->parent_id) {
                    $permName = "read {$permBase}";
                    $routeDef = "Route::resource('{$slug}', App\\Http\\Controllers\\Admin\\{$controllerName}::class)"
                              . "->middleware('can:{$permName}');";
                } else {
                    $middleware = "'can:read {$permBase}'";
                    $routeDef = "Route::resource('{$slug}', App\\Http\\Controllers\\Admin\\{$controllerName}::class)"
                              . "->middleware([{$middleware}]);";
                }

                $routesContent = File::get($routesFile);
                if (strpos($routesContent, $routeDef) === false) {
                    File::append($routesFile, "\n" . $routeDef . "\n");
                }

                // 🧩 Generate Inertia Page
                $reactPath = resource_path("js/Pages/Admin/{$navigasi->url}");
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

            // ✅ Flash message ke react-hot-toast
            return redirect()->back()->with('flash', [
                'type' => 'success',
                'message' => '✅ Menu baru berhasil dibuat!',
            ]);
        } catch (\Throwable $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => '❌ Terjadi kesalahan saat membuat menu: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Update menu
     */
    public function update(Request $request, $id)
    {
        $menu = Navigation::findOrFail($id);

        $request->validate([
            'name'      => ['required', 'string', 'max:255', 'regex:/^[A-Za-z\s]+$/'],
            'url'       => ['required', 'string', 'max:255', 'regex:/^[A-Za-z\-]+$/'],
            'parent_id' => 'nullable|integer|exists:navigations,id',
            'icon'      => 'nullable|string|max:100',
        ]);

        try {
            DB::transaction(function () use ($menu, $request) {
                $urlSlug = Str::slug($request->url ?: $request->name, '-');
                if (preg_match('/^\d+$/', $urlSlug)) {
                    $urlSlug = 'menu-' . $urlSlug;
                }

                $menu->update([
                    'name'      => $request->name,
                    'url'       => $urlSlug,
                    'parent_id' => $request->parent_id,
                    'icon'      => $request->icon,
                ]);

                if ($menu->permissions) {
                    $oldPermission = Permission::where('name', $menu->permissions)->first();
                    if ($oldPermission) {
                        $newName = strtolower("read {$menu->name}");
                        $oldPermission->update(['name' => $newName]);
                        $menu->update(['permissions' => $newName]);
                    }
                }
            });

            return redirect()->back()->with('flash', [
                'type' => 'success',
                'message' => '✅ Menu berhasil diperbarui!',
            ]);
        } catch (\Throwable $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => '❌ Gagal memperbarui menu: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Hapus menu
     */
    public function destroy($id)
    {
        $menu = Navigation::with('children')->findOrFail($id);

        try {
            DB::transaction(function () use ($menu) {
                $deleteMenuRecursive = function ($menuItem) use (&$deleteMenuRecursive) {
                    foreach ($menuItem->children as $child) {
                        $deleteMenuRecursive($child);
                    }

                    $actions = $menuItem->parent_id
                        ? ['read', 'create', 'update', 'delete']
                        : ['read'];
                    $names = array_map(fn($a) => strtolower("{$a} {$menuItem->name}"), $actions);
                    $permissions = Permission::whereIn('name', $names)->get();

                    foreach ($permissions as $perm) {
                        foreach ($perm->roles as $role) {
                            $role->revokePermissionTo($perm);
                        }
                        $perm->delete();
                    }

                    $this->removeRouteAndController($menuItem);
                    $menuItem->delete();
                };

                $deleteMenuRecursive($menu);
            });

            return redirect()->back()->with('flash', [
                'type' => 'success',
                'message' => '🗑️ Menu berhasil dihapus!',
            ]);
        } catch (\Throwable $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => '❌ Gagal menghapus menu: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Hapus controller & file React + route terkait
     */
    protected function removeRouteAndController($menuItem)
    {
        $controllerName = Str::studly($menuItem->url) . "Controller";
        $controllerPath = app_path("Http/Controllers/Admin/{$controllerName}.php");

        if (file_exists($controllerPath)) unlink($controllerPath);

        $reactDir = resource_path("js/Pages/Admin/{$menuItem->url}");
        if (File::isDirectory($reactDir)) File::deleteDirectory($reactDir);

        $routeFile = base_path('routes/web.php');
        if (file_exists($routeFile)) {
            $routes = file($routeFile, FILE_IGNORE_NEW_LINES);
            $newRoutes = array_filter($routes, fn($line) => !preg_match("/\b{$controllerName}\b/", $line));
            file_put_contents($routeFile, implode(PHP_EOL, $newRoutes));
        }
    }
}
