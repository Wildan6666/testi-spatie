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
        Schema::create('riwayat_verifikasi', function (Blueprint $table) {
            $table->id();
        $table->unsignedBigInteger('produk_hukum_id');
        $table->unsignedBigInteger('user_id'); // siapa yang verifikasi
        $table->unsignedBigInteger('status_id'); // hasil verifikasi
        $table->text('catatan')->nullable();
        $table->timestamps();

        $table->foreign('produk_hukum_id')->references('id')->on('produk_hukum')->onDelete('cascade');
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verifikasi_logs');
    }
};
