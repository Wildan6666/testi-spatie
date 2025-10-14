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
        Schema::create('user_details', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

    // Data pegawai
    $table->string('nip', 30)->nullable();
    $table->unsignedBigInteger('instansi_id')->nullable();

    // Data mahasiswa
    $table->string('nim', 30)->nullable();
    $table->unsignedBigInteger('fakultas_id')->nullable();
    $table->unsignedBigInteger('prodi_id')->nullable();

    // Status user
    $table->enum('status_aktif', ['aktif', 'nonaktif'])->default('aktif');

    //$table->foreign('fakultas_id')->references('id')->on('fakultas')->onDelete('set null');
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
