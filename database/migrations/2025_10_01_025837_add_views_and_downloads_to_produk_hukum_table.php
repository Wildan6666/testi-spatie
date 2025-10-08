<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('produk_hukum', function (Blueprint $table) {
        $table->unsignedBigInteger('views')->default(0);
        $table->unsignedBigInteger('downloads')->default(0);
    });
}

public function down()
{
    Schema::table('produk_hukum', function (Blueprint $table) {
        $table->dropColumn(['views', 'downloads']);
    });
}
};
