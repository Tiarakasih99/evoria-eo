<?php

namespace App\Services;

use App\Repositories\Interfaces\ServiceTypeRepositoryInterface;

class ServiceTypeService
{
    protected $serviceTypeRepo;

    public function __construct(ServiceTypeRepositoryInterface $serviceTypeRepo)
    {
        $this->serviceTypeRepo = $serviceTypeRepo;
    }

    public function getServiceTypesForDropdown($categoryId)
    {
        return $this->serviceTypeRepo->getByCategoryId($categoryId);
    }
}