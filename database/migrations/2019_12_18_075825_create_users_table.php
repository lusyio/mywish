<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('api_token', 80)->nullable()
                ->default(null);
            $table->string('fb_id')->nullable()
                ->default(null);
            $table->string('fb_token')->nullable()
                ->default(null);
            $table->string('vk_id')->nullable()
                ->default(null);
            $table->string('vk_token')->nullable()
                ->default(null);
            $table->string('ok_id')->nullable()
                ->default(null);
            $table->string('ok_token')->nullable()
                ->default(null);
            $table->string('name');
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
        Schema::dropIfExists('users');
    }
}
