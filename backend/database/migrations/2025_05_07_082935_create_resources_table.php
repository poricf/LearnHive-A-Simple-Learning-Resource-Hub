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
        
    Schema::create('resources', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->unsignedBigInteger('type_id');
        $table->text('about');
        $table->string('source');
        $table->float('rating')->nullable();
        $table->integer('ratingCount')->nullable();
        $table->unsignedBigInteger('category_id');
        $table->string('thumbnail');
        $table->unsignedBigInteger('difficulty_id');
        $table->string('link');
        $table->timestamps(); // this adds created_at and updated_at
    });
}

    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
