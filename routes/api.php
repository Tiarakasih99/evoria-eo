<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VendorAuthController;
use App\Http\Controllers\Api\VendorProfileController;
use App\Http\Controllers\Api\PublicCatalogController;
use App\Http\Controllers\Api\VendorServiceController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ServiceTypeController;


use Illuminate\Support\Facades\Route;

// --- Public Routes ---

// Customer Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'registerCustomer']); // Sesuaikan nama method di Controller

// Vendor Auth
Route::post('/login/vendor', [VendorAuthController::class, 'login']);
Route::post('/register/vendor', [VendorAuthController::class, 'registerVendor']); // Tambahkan endpoint register vendor

//halaman catalog
// Route::get('/catalog', [PublicCatalogController::class, 'index']);

// Letakkan di luar middleware auth jika ingin customer bisa melihat kategori tanpa login
Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/services', [PublicCatalogController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{categoryId}/service-types', [ServiceTypeController::class, 'index']);



// --- Protected Routes (Perlu Token Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Route khusus Vendor
    Route::middleware('role:vendor')->group(function () {
        Route::get('/vendor/dashboard', function () {
            return response()->json(['message' => 'Selamat datang Vendor!']);
        });

        Route::post('/vendor/profile', [VendorProfileController::class, 'update']);
        Route::get('/vendor/services', [VendorServiceController::class, 'index']);
        Route::post('/vendor/services', [VendorServiceController::class, 'store']);
        Route::put('/vendor/services/{id}', [VendorServiceController::class, 'update']);
        Route::delete('/vendor/services/{id}', [VendorServiceController::class, 'destroy']);
        Route::get('/vendor/services/{id}', [VendorServiceController::class, 'show']);
    });

    // Route khusus Customer
    Route::middleware('role:customer')->group(function () {
        Route::get('/customer/homepage', function () {
            // Perbaikan: Gunakan auth user untuk mengambil data, bukan variabel $role yang tidak terdefinisi
            return response()->json([
                'message' => 'Selamat datang ' . auth()->user()->name,
                'role' => auth()->user()->role
            ]);
        });
    });

    // Logout (Bisa dipakai semua role)
    Route::post('/logout', [AuthController::class, 'logout']); 
});

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\GoogleAuthController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


// // Rute untuk menerima data dari Google (Callback)
// Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

// // Contoh rute yang dijaga oleh "Satpam" Sanctum
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user(); // Mengambil data user yang sedang login
//     });

//     // Nanti rute buat order, vendor profile, dll taruh di dalam sini
// });