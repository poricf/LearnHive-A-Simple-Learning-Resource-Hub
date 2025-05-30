<?php

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ResourceController;



use App\Http\Controllers\BookmarkController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::post('/bookmarks', [BookmarkController::class, 'store']);
    Route::delete('/bookmarks/{resource}', [BookmarkController::class, 'destroy']);
});

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [RegisterController::class, 'register']);

Route::get('/resources/{resource}', [ResourceController::class, 'show']);
Route::get('/resources', [ResourceController::class, 'index']);


Route::prefix('admin')->middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::put('/resources/{resource}', [ResourceController::class, 'update']);
    Route::post('/resources', [ResourceController::class, 'store']);
    Route::delete('/resources/{resource}', [ResourceController::class, 'destroy']);
});
