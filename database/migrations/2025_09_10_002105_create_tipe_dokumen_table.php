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
        Schema::create('tipe_dokumen', function (Blueprint $table) {
            $table->id();
            $table->string('nama');             // contoh: Keuangan, Kepegawaian, Akademik
            $table->string('kode')->unique();   // contoh: KEU, KEP, AKA
            $table->text('deskripsi')->nullable();

            // relasi ke kategori_akses
            $table->foreignId('kategori_akses_id')
                  ->constrained('kategori_akses')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipe_dokumen');
    }
};
