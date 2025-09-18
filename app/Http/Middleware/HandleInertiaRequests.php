<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
{
    return [
        ...parent::share($request),

        // Data auth
        'auth' => [
            'user' => $request->user(),
            'permissions' => $request->user()
                ? $request->user()->getAllPermissions()->pluck('name')
                : [],
        ],

        // Menus
        'menus' => function () use ($request) {
            $user = $request->user();
            if (!$user) {
                return [];
            }

            return \App\Models\Navigation::with('children')
                ->whereNull('parent_id')
                ->orderBy('sort')
                ->get()
                ->filter(function ($menu) use ($user) {
                    // Jika menu tidak punya permission → tampilkan
                    if (!$menu->permissions) {
                        return true;
                    }
                    // Jika ada permission → cek
                    return $user->can($menu->permissions);
                })
                ->map(function ($menu) use ($user) {
                    $menu->children = $menu->children
                        ->filter(function ($child) use ($user) {
                            return !$child->permissions || $user->can($child->permissions);
                        })
                        ->values();
                    return $menu;
                })
                ->values();
        },

        'ziggy' => fn () => [
            ...(new \Tighten\Ziggy\Ziggy)->toArray(),
            'location' => $request->url(),
        ],
    ];
}

}
