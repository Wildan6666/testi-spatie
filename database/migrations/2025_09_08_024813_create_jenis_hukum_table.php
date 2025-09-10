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
        Schema::table('jenis_hukum', function (Blueprint $table) {
            $table->id();
            $table->string('singkatan')->nullable(); // contoh: "UU"
            $table->string('kode')->unique();      // contoh: "UU", "PP", "PRR"
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jenis_hukum');
    }
};
