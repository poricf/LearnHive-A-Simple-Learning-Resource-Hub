<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ResourceController;


Route::post('/login', [LoginController::class, 'login']);

Route::post('/register', [RegisterController::class, 'register']);

Route::apiResource('resources', ResourceController::class);
// Route::post('/login', [R::class, 'login']);
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']); 