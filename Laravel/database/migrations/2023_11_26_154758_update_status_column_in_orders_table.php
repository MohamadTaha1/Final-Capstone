<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateStatusColumnInOrdersTable extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('status', 255)->change(); // Adjust the length as needed
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            // Reverse the operation
            $table->string('status', 100)->change(); // Original length
        });
    }
}
