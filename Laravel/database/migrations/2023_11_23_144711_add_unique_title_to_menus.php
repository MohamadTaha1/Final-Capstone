<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUniqueTitleToMenus extends Migration
{
    public function up()
    {
        Schema::table('menus', function (Blueprint $table) {
            // Add a unique constraint to the 'title' column
            $table->string('title')->unique()->change();
        });
    }

    public function down()
    {
        Schema::table('menus', function (Blueprint $table) {
            // Remove the unique constraint from the 'title' column
            $table->string('title')->change();
        });
    }
}
