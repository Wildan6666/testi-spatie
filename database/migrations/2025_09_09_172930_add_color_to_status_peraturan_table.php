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
        Schema::table('status_peraturan', function (Blueprint $table) {
            $table->string('color', 20)->nullable()->after('nama');
            // contoh value: "green", "red", "yellow", atau class Tailwind seperti "bg-green-500"
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('status_peraturan', function (Blueprint $table) {
            $table->dropColumn('color');
        });
    }
};
