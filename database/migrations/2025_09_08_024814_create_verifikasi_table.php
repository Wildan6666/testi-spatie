<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('verifikasi', function (Blueprint $table) {
            $table->id();
            $table->string('nama');              // contoh: Draft, Menunggu Verifikasi, Terverifikasi
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verifikasi');
    }
};
