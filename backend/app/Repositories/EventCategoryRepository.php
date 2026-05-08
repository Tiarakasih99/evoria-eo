<?php
namespace App\Repositories;

use App\Models\EventCategory;
use App\Repositories\Interfaces\EventCategoryRepositoryInterface;

class EventCategoryRepository implements EventCategoryRepositoryInterface {
    public function getAll() {
        return EventCategory::all();
    }
}