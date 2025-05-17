<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('resource_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('resource_id')->constrained()->onDelete('cascade');
            $table->unsignedTinyInteger('rating'); // e.g., 1 to 5
            $table->timestamps();

            // A user can only rate a resource once
            $table->unique(['user_id', 'resource_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('resource_ratings');
    }
};