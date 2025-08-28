<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Navigation;
use Spatie\Permission\Models\Permission;

class NavigationController extends Controller
{
    /**
     * Tampilkan semua menu dengan struktur parent-child
     */
    public function index()
    {
        // Ambil menu dengan relasi parent dan child
        $menus = Navigation::with('children')
            ->whereNull('parent_id')
            ->orderBy('sort', 'asc')
            ->get();

        return inertia('Konfigurasi/Menus', [
            'menus' => $menus
        ]);
    }

    /**
     * Simpan menu baru + auto generate permission
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'url'       => 'nullable|string|max:255',
            'parent_id' => 'nullable|integer|exists:navigations,id',
            'sort'      => 'nullable|integer',
            'icon'      => 'nullable|string|max:255'
        ]);

        $menu = Navigation::create($validated);

        // Jika ada URL, generate permission CRUD
        if (!empty($menu->url)) {
            $baseName = str_replace('/', '.', $menu->url); // ex: konfigurasi.menu -> konfigurasi.menu
            $permissions = [
                $baseName . '.view',
                $baseName . '.create',
                $baseName . '.edit',
                $baseName . '.delete',
            ];

            foreach ($permissions as $perm) {
                if (!Permission::where('name', $perm)->exists()) {
                    Permission::create(['name' => $perm]);
                }
            }
        }

        return back()->with('success', 'Menu berhasil ditambahkan!');
    }

    /**
     * Update menu
     */
    public function update(Request $request, $id)
    {
        $menu = Navigation::findOrFail($id);

        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'url'       => 'nullable|string|max:255',
            'parent_id' => 'nullable|integer|exists:navigations,id',
            'sort'      => 'nullable|integer',
            'icon'      => 'nullable|string|max:255'
        ]);

        $menu->update($validated);

        return back()->with('success', 'Menu berhasil diperbarui!');
    }

    /**
     * Hapus menu
     */
    public function destroy($id)
    {
        $menu = Navigation::findOrFail($id);
        $menu->delete();

        return back()->with('success', 'Menu berhasil dihapus!');
    }
}
