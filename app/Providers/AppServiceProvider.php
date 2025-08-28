<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
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
