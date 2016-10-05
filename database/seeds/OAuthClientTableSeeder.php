<?php

use Illuminate\Database\ConnectionResolver;
use Illuminate\Database\Seeder;

use \LucaDegasperi\OAuth2Server\OAuth2ServerServiceProvider;
use LucaDegasperi\OAuth2Server\Storage\FluentClient;
use LucaDegasperi\OAuth2Server\Storage\FluentStorageServiceProvider;

class OAuthClientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::insert("insert into oauth_clients (id, secret, name) values ('appid1','secret','AngularAPP' ) ");

        // factory($fluentStorageServiceProvider::class,1)->create();
    }
}
