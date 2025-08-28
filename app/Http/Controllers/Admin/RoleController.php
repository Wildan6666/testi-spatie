<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
         $roles = Role::all();

        return Inertia::render('Konfigurasi/Roles', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
        ]);

        Role::create(['name' => $request->name]);

        return redirect()->route('roles.index');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('roles.index');
    }
}
