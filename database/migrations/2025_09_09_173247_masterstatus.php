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
        Schema::create('masterstatus', function (Blueprint $table) {
            $table->id();
            $table->string('nama_status');   // contoh: Pending, Approved, Rejected, Draft
            $table->string('kode')->unique(); // kode pendek, misalnya PND, APP, REJ, DFT
            $table->string('color', 20)->nullable(); // warna untuk badge UI (bg-green-500, red, dll)
            $table->text('deskripsi')->nullable();   // penjelasan status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('masterstatus');
    }
};
