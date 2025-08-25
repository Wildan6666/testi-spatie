<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\MenuController;

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
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::post('users/assign-role', [UserController::class, 'assignRole'])->name('users.assignRole');
    Route::post('users/revoke-role', [UserController::class, 'revokeRole'])->name('users.revokeRole');
    Route::post('users/give-permission', [UserController::class, 'givePermissionTo'])->name('users.givePermissionTo');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Roles
    Route::get('roles', [RoleController::class, 'index'])->name('roles.index');

    // Permissions
    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::post('permissions/{user}', [PermissionController::class, 'update'])->name('permissions.update');

    // Menus
    Route::get('menus', [MenuController::class, 'index'])->name('menus.index');
});





require __DIR__.'/auth.php';
