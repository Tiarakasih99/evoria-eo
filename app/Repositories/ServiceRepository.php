<?php
namespace App\Repositories;

use App\Models\Service;
use App\Repositories\Interfaces\ServiceRepositoryInterface;

class ServiceRepository implements ServiceRepositoryInterface {
    public function getAll() {
        return Service::with(['user.vendorProfile', 'category'])->get();
    }

    public function create(array $data) {
        return Service::create($data);
    }

    public function findById($id) {
        return Service::with('category')->findOrFail($id);
    }

    public function findByVendor($vendorId) {
        return Service::where('vendor_id', $vendorId)->with('category')
        ->latest()->get();
    }

    public function searchServices(array $filters) {
        $query = Service::with(['user.vendorProfile', 'category']);
        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }
        if (!empty($filters['category_id'])) {
            $query->where('event_category_id', $filters['category_id']);
        }
        return $query->get();
    }

    public function update($id, array $data) {
    $service = Service::findOrFail($id);
    $service->update($data);
    return $service;
    }

    public function delete($id) {
        $service = Service::findOrFail($id);
        return $service->delete();
    }




        
}