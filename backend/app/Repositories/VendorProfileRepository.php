<?php
namespace App\Repositories;

use App\Models\VendorProfile;
use App\Repositories\Interfaces\VendorProfileRepositoryInterface;

class VendorProfileRepository implements VendorProfileRepositoryInterface {
    public function updateOrCreate($userId, array $data) {
        return VendorProfile::updateOrCreate(
            ['user_id' => $userId],
            $data
        );
    }

    public function findByUserId($userId) {
        return VendorProfile::where('user_id', $userId)->first();
    }
}