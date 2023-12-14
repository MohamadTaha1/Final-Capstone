<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDailySpecialsTable extends Migration
{
    public function up()
    {
        Schema::table('daily_specials', function (Blueprint $table) {
            $table->foreignId('dish_id')->constrained()->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('daily_specials', function (Blueprint $table) {
            $table->dropForeign(['dish_id']);
            $table->dropColumn('dish_id');
        });
    }
}
