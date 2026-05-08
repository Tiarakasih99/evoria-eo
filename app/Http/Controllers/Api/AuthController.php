<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    // Gunakan constructor agar lebih bersih
    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(Request $request) 
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Perbaikan: Tambahkan parameter 'customer'
        $result = $this->authService->login($credentials, 'customer');
        
        return response()->json([
            'message' => 'Login Berhasil',
            'data' => $result
        ]);
    }

    public function registerCustomer(Request $request)
    {
        // Sebaiknya validasi dulu di sini
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $result = $this->authService->registerCustomer($data);
        
        return response()->json([
            'message' => 'Register Customer Berhasil',
            'data' => $result
        ], 201);
    }
}