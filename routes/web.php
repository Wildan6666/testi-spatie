<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\KelolaBeritaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\NavigationController;
use App\Http\Controllers\Admin\VerifikasiDataController;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\BerandaController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [BerandaController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin', [AdminDashboardController::class, 'index'])
->middleware(['auth', 'verified','can:read dashboard']);



Route::post('konfigurasi/permissions/store', [PermissionController::class, 'store'])->name('permissions.store');
Route::prefix('konfigurasi')->middleware(['auth'])->name('admin.')->group(function () {
    // Users
    Route::get('users', [UserController::class, 'index'])->name('users.index')
    ;
    Route::post('users/assign-role', [UserController::class, 'assignRole'])->name('users.assignRole');
    Route::post('users/revoke-role', [UserController::class, 'revokeRole'])->name('users.revokeRole');
    Route::post('users/give-permission', [UserController::class, 'givePermissionTo'])->name('users.givePermissionTo');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Permissions
    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index')
    ->middleware('can:read permissions');
    Route::post('permissions/{user}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('permissions/delete/{id}', [PermissionController::class, 'destroyPermission'])
    ->name('permissions.destroy');
  
    
    // Menus
    route::get('menus', [NavigationController::class, 'index'])->name('menus.index')
    ->middleware('can:read menu');
    Route::post('menus', [MenuController::class, 'store'])->name('menus.store');
    Route::delete('menus/{id}', [MenuController::class, 'destroy'])->name('menus.destroy');

});


require __DIR__.'/auth.php';


// halaman roles
Route::get('/konfigurasi/roles', [RoleController::class, 'index'])->name('roles.index');

// simpan role baru
Route::post('/konfigurasi/roles', [RoleController::class, 'store'])->name('roles.store');

// hapus role
Route::delete('/konfigurasi/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

// update permission role
Route::post('/konfigurasi/roles/{role}/permissions', [RoleController::class, 'updatePermissions'])
    ->name('roles.updatePermissions');


//Route::resource('dokumen', App\Http\Controllers\Admin\DokumenController::class)->middleware('can:read dokumen');

Route::resource('jenis-hukum', App\Http\Controllers\Admin\JenisHukumController::class)->middleware(['can:read jenis hukum']);

Route::resource('status-peraturan', App\Http\Controllers\Admin\StatusPeraturanController::class)->middleware(['can:read status peraturan']);


Route::resource('produk-hukum', App\Http\Controllers\Admin\ProdukHukumController::class)->middleware('can:read produk hukum');


Route::resource('instansi', App\Http\Controllers\Admin\InstansiController::class)->middleware(['can:read instansi']);

Route::resource('tipe-dokumen', App\Http\Controllers\Admin\TipeDokumenController::class)->middleware(['can:read tipe dokumen']);

Route::resource('verifikasi-data', App\Http\Controllers\Admin\VerifikasiDataController::class)->middleware('can:read verifikasi data');
Route::get('/verifikasi-data/{id}', [VerifikasiDataController::class, 'show'])
    ->name('verifikasi-data.show');

Route::resource('validasi-dokumen', App\Http\Controllers\Admin\ValidasiDokumenController::class)->middleware(['can:read validasi dokumen']);

Route::resource('master-status', App\Http\Controllers\Admin\MasterStatusController::class)->middleware(['can:read master status']);

Route::resource('riwayat-verifikasi', App\Http\Controllers\Admin\RiwayatVerifikasiController::class,)->middleware(['can:read riwayat verifikasi']);
Route::get('/riwayat-verifikasi', [\App\Http\Controllers\Admin\RiwayatVerifikasiController::class, 'index'])
    ->name('riwayat.index');


Route::resource('verifikator-instansi', App\Http\Controllers\Admin\VerifikatorInstansiController::class)->middleware(['can:read verifikator instansi']);

Route::resource('kelola-berita', KelolaBeritaController::class)
    ->parameters(['kelola-berita' => 'berita'])   // ✅ parameter jadi {berita}
    ->middleware('can:read kelola berita');
Route::get('/berita/create', [KelolaBeritaController::class, 'create'])->name('berita.create');
Route::post('/berita', [KelolaBeritaController::class, 'store'])->name('berita.store');
Route::get('/kelola-berita/{id}/edit', [KelolaBeritaController::class, 'edit'])->name('edit');
Route::put('/kelola-berita/{id}', [KelolaBeritaController::class, 'update'])->name('update');


use App\Http\Controllers\User\BeritaController;
use App\Http\Controllers\User\UserProdukHukumController;

// Halaman daftar berita untuk publik
Route::get('/berita', [BeritaController::class, 'index'])->name('berita.public.index');

// Halaman detail berita (baca selengkapnya)
Route::get('/berita/{berita}', [BeritaController::class, 'show'])->name('berita.public.show');

Route::get('/produkhukum', [UserProdukHukumController::class, 'index'])->name('produkhukum.index');
Route::get('/produkhukum/{id}', [UserProdukHukumController::class, 'show'])->name('produkhukum.show');
Route::get('/produkhukum/{id}/download', [UserProdukHukumController::class, 'download'])->name('produkhukum.download');



Route::get('/', [BerandaController::class, 'index'])->name('welcome');
Route::get('/beranda', [BerandaController::class, 'index'])->name('beranda');

// tentang
Route::get('/Tentang/VisiMisi', function () {
    return Inertia::render('Tentang/VisiMisi');
})->middleware(['auth', 'verified'])->name('tentang.visimisi');

Route::get('/Tentang/DasarHukum', function () {
    return Inertia::render('Tentang/DasarHukum');
})->middleware(['auth', 'verified'])->name('tentang.dasarhukum');

Route::get('/Tentang/Organisasi', function () {
    return Inertia::render('Tentang/Organisasi');
})->middleware(['auth', 'verified'])->name('tentang.organisasi');

Route::get('/Tentang/SekilasSejarah', function () {
    return Inertia::render('Tentang/SekilasSejarah');
})->middleware(['auth', 'verified'])->name('kilas.sejarah');

