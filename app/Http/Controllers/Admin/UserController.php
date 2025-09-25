<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Konfigurasi/Users', [
            
            'users' => User::with('roles')->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'roles' => $user->roles->map(fn($r) => ['id' => $r->id, 'name' => $r->name]),
                    // ini ambil semua permissions, baik dari role maupun yang langsung diberikan
                    'permissions' => $user->getAllPermissions()->map(fn($p) => ['id' => $p->id, 'name' => $p->name]),
                ];
            }),
            'roles' => Role::all(['id', 'name']),
            'permissions' => Permission::all(['id', 'name']),
            
        ]);
    }

    public function assignRole(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::findOrFail($request->user_id);
        $user->assignRole($request->role);

        return back()->with('success', 'Role assigned');
    }

        public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
        ]);

        return back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'User deleted successfully.');
    }


        public function givePermissionTo(Request $request)
    {
        $request->validate([
            'user_id'    => 'required|exists:users,id',
            'permission' => 'required|string|exists:permissions,name',
        ]);

        $user = User::findOrFail($request->user_id);
        $user->givePermissionTo($request->permission);

        return back()->with('success', 'Permission berhasil diberikan.');
    }

    public function revokeRole(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role'    => 'required|string|exists:roles,name',
        ]);

        $user = User::findOrFail($request->user_id);
        $user->removeRole($request->role);

        return back()->with('success', 'Role berhasil dicabut.');
    }
}