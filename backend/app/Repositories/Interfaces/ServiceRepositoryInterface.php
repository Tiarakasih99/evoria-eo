<?php
namespace App\Repositories\Interfaces;

interface ServiceRepositoryInterface {
    public function getAll();
    public function create(array $data);
    public function findById($id);
    public function findByVendor($vendorId);
    public function searchServices(array $filters); // Untuk fitur search
    public function update($id, array $data);
    public function delete($id);
    
    
}