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
        Schema::create('restaurant_ratings', function (Blueprint $table) {
            $table->foreignId('restaurant_id')->primary()->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('number_of_ratings')->default(0);
            $table->unsignedBigInteger('total_rating')->default(0);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurant_ratings');
    }
};
