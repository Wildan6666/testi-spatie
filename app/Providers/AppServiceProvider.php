<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();

                return [
                    'user' => $user ? [
                        'id'          => $user->id,
                        'name'        => $user->name,
                        'roles'       => $user->getRoleNames(), // requires Spatie\Permission
                        'permissions' => $user->getAllPermissions()->pluck('name'),
                    ] : null,
                ];
            },
        ]);
    }
}
