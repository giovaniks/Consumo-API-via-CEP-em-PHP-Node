<?php 

require 'vendor/autoload.php';

use Pecee\SimpleRouter\SimpleRouter as Route;

Route::get('/',function(){
    require 'views/index.php';
});

Route::post('/buscarCep/',function(){
    require 'api/v1/service.php';
});

Route::error(function(){
    require 'views/404.php';
});

Route::start();

?>