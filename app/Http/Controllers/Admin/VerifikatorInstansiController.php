<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Instansi;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class VerifikatorInstansiController extends Controller
{
    public function index()
    {
        $data = DB::table('verifikator_instansi')
            ->join('users', 'users.id', '=', 'verifikator_instansi.user_id')
            ->join('instansi', 'instansi.id', '=', 'verifikator_instansi.instansi_id')
            ->join('roles', 'roles.id', '=', 'verifikator_instansi.role_id')
            ->select(
                'verifikator_instansi.id',
                'users.name as user',
                'instansi.nama as instansi',
                'roles.name as role'
            )
            ->get();

        return Inertia::render('Admin/verifikator-instansi/Index', [
            'data' => $data,
            'users' => User::select('id', 'name')->get(),
            'instansis' => Instansi::select('id', 'nama')->get(),
            'roles' => Role::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'instansi_id' => 'required|exists:instansi,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        // attach ke pivot
        $user = User::findOrFail($validated['user_id']);
        $user->instansis()->attach(
            $validated['instansi_id'],
            ['role_id' => $validated['role_id']]
        );

        return redirect()->back()->with('success', 'Verifikator berhasil ditambahkan.');
    }

    public function destroy($id)
    {
        DB::table('verifikator_instansi')->where('id', $id)->delete();
        return redirect()->back()->with('success', 'Verifikator berhasil dihapus.');
    }
}
