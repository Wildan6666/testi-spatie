<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate; // 👈 tambahkan ini
use App\Models\Navigation;


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
        Vite::prefetch(concurrency: 3);
        // Bypass permission untuk super-admin
        Gate::before(function ($user, $ability) {
            if ($user->hasRole('super-admin')) {
                return true;
            }
        });

        Inertia::share('menus', function () {
            return Navigation::whereNull('parent_id')
                ->with(['children' => function ($q) {
                    $q->orderBy('sort');
                }])
                ->orderBy('sort')
                ->get();
        });
    }
}
