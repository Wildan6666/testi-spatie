<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('navigations', function (Blueprint $table) {
            $table->string('key')->nullable()->after('url');
        });
    }

    public function down()
    {
        Schema::table('navigations', function (Blueprint $table) {
            $table->dropColumn('key');
        });
    }
};
