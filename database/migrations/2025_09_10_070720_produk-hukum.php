<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produk_hukum', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('nomor', 100)->nullable();
            $table->year('tahun')->nullable();
            $table->text('ringkasan')->nullable();
            $table->string('subjek', 150)->nullable();
            $table->date('tanggal_penetapan')->nullable();
            $table->string('kata_kunci')->nullable();

            // Relasi ke instansi
            $table->foreignId('instansi_id')
                  ->constrained('instansi')
                  ->onDelete('cascade');

            // Relasi ke master status
            $table->foreignId('status_id')
                  ->constrained('statuses')
                  ->onDelete('cascade');

            // Relasi ke status peraturan
            $table->foreignId('status_peraturan_id')
                  ->constrained('status_peraturan')
                  ->onDelete('cascade');

            // Relasi ke tipe dokumen
            $table->foreignId('tipe_dokumen_id')
                  ->constrained('tipe_dokumen')
                  ->onDelete('cascade');

            // Relasi ke jenis hukum
            $table->foreignId('jenis_hukum_id')
                  ->constrained('jenis_hukum')
                  ->onDelete('cascade');

            $table->string('berkas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk_hukum');
    }
};
