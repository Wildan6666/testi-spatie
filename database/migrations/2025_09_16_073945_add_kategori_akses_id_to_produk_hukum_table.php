<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up()
{
    Schema::table('produk_hukum', function (Blueprint $table) {
        $table->unsignedBigInteger('kategori_akses_id')->nullable()->after('tipe_dokumen_id');

        // Kalau ada relasi ke tabel kategori_akses
        $table->foreign('kategori_akses_id')->references('id')->on('kategori_akses')->onDelete('set null');
    });
}

public function down()
{
    Schema::table('produk_hukum', function (Blueprint $table) {
        $table->dropForeign(['kategori_akses_id']);
        $table->dropColumn('kategori_akses_id');
    });
}

};
