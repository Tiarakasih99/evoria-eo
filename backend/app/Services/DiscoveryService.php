<?php
namespace App\Services;

use App\Repositories\Interfaces\ServiceRepositoryInterface;

class DiscoveryService {
    protected $serviceRepo;

    public function __construct(ServiceRepositoryInterface $serviceRepo) {
        $this->serviceRepo = $serviceRepo;
    }

    public function getCatalog($filters) {
        return $this->serviceRepo->searchServices($filters);
    }
}