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
        Schema::create('navigations', function (Blueprint $table) {
        $table->id();
        $table->string('name');      // Nama menu
        $table->string('url');       // URL menu
        $table->unsignedBigInteger('main_menu')->nullable(); // Menu induk
        $table->unsignedBigInteger('sub_menu')->nullable();  // Sub menu jika ada
        $table->string('icon')->nullable(); // Icon
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations. PAKE YANG INI
     */
    public function down(): void
    {
        Schema::dropIfExists('navigations');
    }
};
