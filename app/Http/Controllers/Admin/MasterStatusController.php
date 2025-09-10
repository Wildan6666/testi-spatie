<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\StatusVerifikasi;

class MasterStatusController extends Controller
{
    public function index()
    {
              $statuses = StatusVerifikasi::all();

        return Inertia::render("Admin/master-status/Index",[
                'statuses' => $statuses,

        ]);
    }
}