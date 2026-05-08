<?php

namespace App\Services;

use App\Repositories\Interfaces\VendorProfileRepositoryInterface;

class VendorProfileService
{
    protected $profileRepo;

    // Kita inject Interface-nya, bukan class Repository-nya (DIP Principle)
    public function __construct(VendorProfileRepositoryInterface $profileRepo)
    {
        $this->profileRepo = $profileRepo;
    }

    /**
     * Logika untuk update atau buat profil vendor
     */
    public function handleProfileUpdate(int $userId, array $data)
    {
        // Di sini kamu bisa tambah logika bisnis, misal:
        // - Cek apakah nama bisnis mengandung kata terlarang
        // - Format alamat agar seragam
        
        return $this->profileRepo->updateOrCreate($userId, $data);
    }

    /**
     * Ambil data profil berdasarkan ID User
     */
    public function getProfile($userId)
    {
        return $this->profileRepo->findByUserId($userId);
    }
}