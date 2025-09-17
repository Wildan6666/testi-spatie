<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('verifikator_instansi', function (Blueprint $table) {
            // Tambah kolom role di pivot
            $table->string('role')->default('verifikator')->after('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('verifikator_instansi', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
