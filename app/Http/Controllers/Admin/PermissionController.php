<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class PermissionController extends Controller
{
    // Tampilkan halaman permissions
    public function index()
    {
        $permissions = Permission::all();

        $users = User::with('permissions')->get()->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'permissions' => $user->getPermissionNames(), // array nama permission
            ];
        });

        return Inertia::render('Konfigurasi/Permissions', [
            'permissions' => $permissions,
            'users' => $users,
            'auth' => auth()->user(),
            'flash' => [
                'success' => session('success') ?? null,
            ],
        ]);
    }

    public function destroyPermission($id)
{
    $permission = Permission::findOrFail($id);
    $permission->delete();

    return redirect()->back()->with('success', 'Permission berhasil dihapus.');
}

    // Update permissions user
    public function update(Request $request, User $user)
    {
        $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        // Sync permissions user
        $user->syncPermissions($request->permissions);

        // Redirect ke halaman index dengan flash message
        return redirect()->route('permissions.index')
                         ->with('success', 'Permissions berhasil diperbarui!');
    }
}
