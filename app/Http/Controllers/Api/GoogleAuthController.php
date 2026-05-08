<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

class GoogleAuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    // Fungsi ini dipanggil setelah user berhasil login di Google
    public function handleGoogleCallback()
    {
        try {
            // Ambil data user dari Google via Socialite
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Panggil service untuk urusan database dan token
            $data = $this->authService->loginOrRegisterGoogle($googleUser);

            return response()->json([
                'message' => 'Login success',
                'data' => $data
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}