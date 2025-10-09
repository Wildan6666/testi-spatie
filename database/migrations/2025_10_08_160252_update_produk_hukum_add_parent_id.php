<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('produk_hukum', function (Blueprint $table) {
            // Pastikan tidak duplikat
            if (!Schema::hasColumn('produk_hukum', 'parent_id')) {
                $table->unsignedBigInteger('parent_id')->nullable()->after('id')
                      ->comment('ID produk hukum induk (parent)');
                
                // Relasi ke dirinya sendiri
                $table->foreign('parent_id')
                      ->references('id')
                      ->on('produk_hukum')
                      ->onDelete('set null')
                      ->onUpdate('cascade');
            }
        });
    }

    public function down(): void
    {
        Schema::table('produk_hukum', function (Blueprint $table) {
            if (Schema::hasColumn('produk_hukum', 'parent_id')) {
                $table->dropForeign(['parent_id']);
                $table->dropColumn('parent_id');
            }
        });
    }
};
