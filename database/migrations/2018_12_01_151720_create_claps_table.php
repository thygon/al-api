<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClapsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('claps', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('clap');
            $table->integer('clapable_id');
            $table->string('clapable_type');
            $table->integer('clapper')->unsigned();
            $table->foreign('clapper')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('claps');
    }
}
