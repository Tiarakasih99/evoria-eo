<?php

namespace App\Repositories;

use App\Models\EventCategory;
use App\Repositories\Interfaces\ServiceTypeRepositoryInterface;

class ServiceTypeRepository implements ServiceTypeRepositoryInterface
{
    public function getByCategoryId($categoryId)
    {
        $category = EventCategory::find($categoryId);
        return $category ? $category->serviceTypes : collect([]);
    }
}