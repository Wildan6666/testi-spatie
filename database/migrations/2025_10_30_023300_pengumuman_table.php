<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengumuman', function (Blueprint $table) {
           $table->id();
            $table->string('title'); // Judul pengumuman
            $table->enum('type', ['dokumen', 'berita']); // Jenis pengumuman
            $table->foreignId('related_id')->nullable(); // ID produk_hukums / beritas
            $table->timestamp('published_at')->nullable(); // waktu pengumuman
            $table->boolean('is_active')->default(true); // status tampil
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengumuman');
    }
};
