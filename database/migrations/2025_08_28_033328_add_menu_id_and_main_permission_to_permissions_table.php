<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('permissions', function (Blueprint $table) {
            $table->unsignedBigInteger('menu_id')->nullable()->after('id');
            $table->unsignedBigInteger('main_permission')->nullable()->after('menu_id');
            $table->integer('sort')->default(0)->after('main_permission');

            $table->foreign('menu_id')->references('id')->on('navigations')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('permissions', function (Blueprint $table) {
            $table->dropForeign(['menu_id']);
            $table->dropColumn(['menu_id', 'main_permission', 'sort']);
        });
    }
};
