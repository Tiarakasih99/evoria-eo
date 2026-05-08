<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\VendorProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VendorProfileController extends Controller
{
    protected $profileService;

    public function __construct(VendorProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'business_name' => 'required|string|max:255',
            'address'       => 'required|string',
            'bank_account'  => 'required|string',
        ]);

        $profile = $this->profileService->handleProfileUpdate(Auth::id(), $data);

        return response()->json([
            'status'  => 'success',
            'message' => 'Profil bisnis Evoria berhasil diperbarui',
            'data'    => $profile
        ]);
    }
}