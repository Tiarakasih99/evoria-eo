<?php
namespace App\Services;

use App\Repositories\Interfaces\EventCategoryRepositoryInterface;

class CategoryService {
    protected $repo;

    public function __construct(EventCategoryRepositoryInterface $repo) {
        $this->repo = $repo;
    }

    public function getAllCategories() {
        return $this->repo->getAll();
    }
}