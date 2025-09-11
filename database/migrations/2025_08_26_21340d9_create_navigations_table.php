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
        $table->string('name');
        $table->string('url')->nullable();
        $table->unsignedBigInteger('parent_id')->nullable()->index(); // Hierarki
        $table->integer('sort')->default(0);
        $table->string('icon')->nullable();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('navigations');
    }
};
