<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('verifikator_instansi', function (Blueprint $table) {
            if (Schema::hasColumn('verifikator_instansi', 'role')) {
                $table->dropColumn('role');
            }

            $table->unsignedBigInteger('role_id')->nullable(false)->change();

            $table->foreign('role_id')
                  ->references('id')
                  ->on('roles')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('verifikator_instansi', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->string('role')->nullable();
        });
    }
};