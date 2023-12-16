<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameMainDishToDishIdInDailySpecialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // First step: Rename column
        Schema::table('daily_specials', function (Blueprint $table) {
            $table->renameColumn('main_dish', 'dish_id_temp');
        });

        // Second step: Change column type
        Schema::table('daily_specials', function (Blueprint $table) {
            $table->unsignedBigInteger('dish_id_temp')->change();
            $table->renameColumn('dish_id_temp', 'dish_id');
        });

        // Third step: Add foreign key constraint
        Schema::table('daily_specials', function (Blueprint $table) {
            $table->foreign('dish_id')->references('id')->on('dishes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('daily_specials', function (Blueprint $table) {
            $table->dropForeign(['dish_id']);
            $table->renameColumn('dish_id', 'main_dish');
        });
    }
}
