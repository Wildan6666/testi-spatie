<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Instansi;

class InstansiController extends Controller
{
    public function index()
    {
         $instansi = Instansi::select('id', 'nama', 'singkatan', 'alamat', 'kontak')->get();

        return Inertia::render('Admin/instansi/Index', [
            'instansi' => $instansi
        ]);
     
    }

    public function store(Request $request)
{
    $request->validate([
        'nama' => 'required|string|max:255',
        'singkatan' => 'nullable|string|max:50',
        'alamat' => 'nullable|string',
        'kontak' => 'nullable|string|max:50',
    ]);

    Instansi::create($request->only(['nama','singkatan','alamat','kontak']));
    return redirect()->back()->with('success','Instansi berhasil ditambahkan.');
}

public function update(Request $request, $id)
{
    $request->validate([
        'nama' => 'required|string|max:255',
        'singkatan' => 'nullable|string|max:50',
        'alamat' => 'nullable|string',
        'kontak' => 'nullable|string|max:50',
    ]);

    $instansi = Instansi::findOrFail($id);
    $instansi->update($request->only(['nama','singkatan','alamat','kontak']));
    return redirect()->back()->with('success','Instansi berhasil diperbarui.');
}

public function destroy($id)
{
    $instansi = Instansi::findOrFail($id);
    $instansi->delete();
    return redirect()->back()->with('success','Instansi berhasil dihapus.');
}

}