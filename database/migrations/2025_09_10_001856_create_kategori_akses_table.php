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
        Schema::create('kategori_akses', function (Blueprint $table) {
            $table->id();
            $table->string('nama');        // contoh: Publik, Rahasia, Internal
            $table->string('kode')->unique(); // contoh: PUB, RAH, INT
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_akses');
    }
};
