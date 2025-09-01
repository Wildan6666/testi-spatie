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

use App\Http\Controllers\DashboardController;

Route::get('/admin', [DashboardController::class, 'index'])
->middleware(['auth', 'verified']);

Route::prefix('konfigurasi')->middleware(['auth'])->name('admin.')->group(function () {
    // Users
    Route::get('users', [UserController::class, 'index'])->name('users.index')
    ->middleware('permission:manage users');

    Route::post('users/assign-role', [UserController::class, 'assignRole'])->name('users.assignRole');
    Route::post('users/revoke-role', [UserController::class, 'revokeRole'])->name('users.revokeRole');
    Route::post('users/give-permission', [UserController::class, 'givePermissionTo'])->name('users.givePermissionTo');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Roles
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index')
     ->middleware('permission:manage roles');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    // Permissions
    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index')
    ->middleware('permission:manage permissions');

    Route::post('permissions/{user}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('permissions/delete/{id}', [PermissionController::class, 'destroyPermission'])
    ->name('permissions.destroy');
    
    // Menus
    route::get('menus', [NavigationController::class, 'index'])->name('menus.index')
    ->middleware('permission:manage menus');

    Route::post('menus', [MenuController::class, 'store'])->name('menus.store');

});

Route::get('/Verifikasi', function () {
    return Inertia::render('Admin/Verifikasi');
})->middleware(['auth', 'verified','permission:verify document'])->name('Verifikasi');





require __DIR__.'/auth.php';
