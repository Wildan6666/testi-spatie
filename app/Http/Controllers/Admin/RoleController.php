<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();

        return Inertia::render('Admin/Konfigurasi/Roles', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        Role::create(['name' => $request->name]);

        return redirect()->route('roles.index')->with('success', 'Role berhasil dibuat.');
    }

    public function updatePermissions(Request $request, Role $role)
    {
        $request->validate([
            'permissions' => 'array',
        ]);

        // Sinkronisasi permissions
        $role->syncPermissions($request->input('permissions', []));

        return redirect()->route('roles.index')->with('success', 'Permissions berhasil diperbarui.');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('roles.index')->with('success', 'Role berhasil dihapus.');
    }
}
