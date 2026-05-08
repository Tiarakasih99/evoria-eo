<?php
namespace App\Services;

use App\Repositories\Interfaces\ServiceRepositoryInterface;

class VendorService {
    protected $serviceRepo;

    public function __construct(ServiceRepositoryInterface $serviceRepo) {
        $this->serviceRepo = $serviceRepo;
    }

    public function createNewService(array $data, $vendorId, $files=null) {
        // Gabungkan data input dengan ID user yang login sebagai vendor_id
        $data['vendor_id'] = $vendorId; //pastikan lagi ini vendorId atau userId
        $paths=[];

        if ($files){
            foreach ($files as $file){
                $path = $file->store('portfolios', 'public');
                $paths[] = $path;
            }
        }
        $data['portfolio_images'] = $paths; // Simpan array path ke kolom JSON
        return $this->serviceRepo->create($data);
    }

    public function getServicesByVendor($vendorId) {
    return $this->serviceRepo->findByVendor($vendorId);
    }


    // public function updateService($id, array $data, $files = null) {
    // if ($files) {
    //     $paths = [];
    //     foreach ($files as $file) {
    //         $paths[] = $file->store('portfolios', 'public');
    //     }
    //     $data['portfolio_images'] = $paths; // Ganti gambar lama dengan yang baru
    // }
    // return $this->serviceRepo->update($id, $data);
    // }



    public function getServiceById($id)
    {
        return $this->serviceRepo->findById($id);
    }

    public function updateService($id, array $data, $files = null) {
        // 1. Ambil data jasa yang lama dari Repository
        $service = $this->serviceRepo->findById($id);
        
        // 2. Ambil array gambar yang sudah ada (default array kosong jika null)
        $existingImages = $service->portfolio_images ?? [];

        if ($files) {
            $newPaths = [];
            foreach ($files as $file) {
                // Simpan file baru ke storage
                $path = $file->store('portfolios', 'public');
                $newPaths[] = $path;
            }
            
            // 3. Gabungkan gambar lama dengan gambar yang baru diupload (ARRAY_MERGE)
            $data['portfolio_images'] = array_merge($existingImages, $newPaths);
        } else {
            // Jika tidak ada upload file baru, tetap gunakan gambar yang lama
            $data['portfolio_images'] = $existingImages;
        }

        return $this->serviceRepo->update($id, $data);
    }

    public function deleteService($id) {
        return $this->serviceRepo->delete($id);
    }
}