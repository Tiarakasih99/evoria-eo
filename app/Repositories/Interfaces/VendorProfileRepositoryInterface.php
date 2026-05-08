<?php
namespace App\Repositories\Interfaces;

interface VendorProfileRepositoryInterface {
    public function updateOrCreate($userId, array $data);
    public function findByUserId($userId);
}