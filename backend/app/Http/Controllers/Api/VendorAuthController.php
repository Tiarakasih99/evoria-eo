<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;

class VendorAuthController extends Controller {
    protected $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $result = $this->authService->login($credentials, 'vendor');

        return response()->json([
            'message' => 'Login Vendor Berhasil',
            'data' => $result
        ]);
    }

    public function registerVendor(Request $request) // Hapus AuthService $authService
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $result = $this->authService->registerVendor($data);
        
        return response()->json([
            'message' => 'Register Vendor Berhasil',
            'data' => $result
        ], 201);
    }
}