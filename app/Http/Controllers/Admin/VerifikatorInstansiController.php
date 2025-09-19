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

        // ambil role verifikator (id 3 atau name=verifikator)
        $verifikatorRoleId = Role::where('name', 'verifikator')->value('id') ?? 3;

        // hanya user yang punya role verifikator
        $users = User::whereHas('roles', function ($q) use ($verifikatorRoleId) {
            $q->where('id', $verifikatorRoleId);
        })->select('id', 'name', 'email')->get();

        $instansis = Instansi::select('id', 'nama')->get();

        return Inertia::render('Admin/verifikator-instansi/Index', [
            'data' => $data,
            'users' => $users,
            'instansis' => $instansis,
            'verifikatorRoleId' => $verifikatorRoleId, // biar tau ID role nya
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'instansi_id' => 'required|exists:instansi,id',
        ]);

        $verifikatorRoleId = Role::where('name', 'verifikator')->value('id') ?? 3;

        // attach ke pivot (role_id fixed ke verifikator)
        $user = User::findOrFail($validated['user_id']);
        $user->instansis()->attach(
            $validated['instansi_id'],
            ['role_id' => $verifikatorRoleId]
        );

        return redirect()->back()->with('success', 'Verifikator berhasil ditambahkan.');
    }

    public function destroy($id)
    {
        DB::table('verifikator_instansi')->where('id', $id)->delete();
        return redirect()->back()->with('success', 'Verifikator berhasil dihapus.');
    }
}
