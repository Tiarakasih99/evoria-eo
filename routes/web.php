<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

#ini belajar dari tutorial
Route::get('/login', fn() => view('auth.login'))->name('login');