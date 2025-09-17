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
        $table->unsignedBigInteger('verified_by')->nullable()->after('status_id');
        $table->timestamp('verified_at')->nullable()->after('verified_by');
        $table->text('catatan_verifikasi')->nullable()->after('verified_at');

        $table->foreign('verified_by')->references('id')->on('users')->onDelete('set null');
    });
}

public function down()
{
    Schema::table('produk_hukum', function (Blueprint $table) {
        $table->dropForeign(['verified_by']);
        $table->dropColumn(['verified_by', 'verified_at', 'catatan_verifikasi']);
    });
}

};
