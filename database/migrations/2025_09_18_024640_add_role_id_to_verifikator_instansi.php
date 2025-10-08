<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Schema::table('verifikator_instansi', function (Blueprint $table) {
        //     // tambah kolom role_id tapi nullable dulu
        //     $table->unsignedBigInteger('role_id')->nullable()->after('user_id');
        // });
    }

    public function down(): void
    {
        // Schema::table('verifikator_instansi', function (Blueprint $table) {
        //     $table->dropColumn('role_id');
        // });
    }
};
