<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\NavigationController;
use Spatie\Permission\Models\Role;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin', [MenuController::class, 'index'])
->middleware(['auth', 'verified','can:read dashboard']);

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


Route::resource('dokumen', App\Http\Controllers\Admin\DokumenController::class)->middleware('can:read dokumen');

Route::resource('jenis-hukum', App\Http\Controllers\Admin\JenisHukumController::class)->middleware(['can:read jenis hukum']);

Route::resource('status-peraturan', App\Http\Controllers\Admin\StatusPeraturanController::class)->middleware(['can:read status peraturan']);


Route::resource('produk-hukum', App\Http\Controllers\Admin\ProdukHukumController::class)->middleware('can:read produk hukum');


Route::resource('instansi', App\Http\Controllers\Admin\InstansiController::class)->middleware(['can:read instansi']);

Route::resource('tipe-dokumen', App\Http\Controllers\Admin\TipeDokumenController::class)->middleware(['can:read tipe dokumen']);
Route::resource('verifikasi-data', App\Http\Controllers\Admin\VerifikasiDataController::class)->middleware('can:read verifikasi data');

Route::resource('validasi-dokumen', App\Http\Controllers\Admin\ValidasiDokumenController::class)->middleware(['can:read validasi dokumen']);

Route::resource('master-status', App\Http\Controllers\Admin\MasterStatusController::class)->middleware(['can:read master status']);
