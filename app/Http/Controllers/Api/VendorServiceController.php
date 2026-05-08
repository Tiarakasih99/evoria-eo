<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\VendorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VendorServiceController extends Controller {
    protected $vendorService;

    public function __construct(VendorService $vendorService) {
        $this->vendorService = $vendorService;
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name'              => 'required|string|max:255',
            'description'       => 'required|string',
            'price'             => 'required|numeric',
            'event_category_id' => 'required|exists:event_categories,id',
            'service_type_id' => 'required|exists:service_types,id', // <--- Validasi WAJIB
            'images.*'          => 'image|mimes:jpeg,png,jpg|max:5120' // Validasi tiap file foto
        ]);

        $service = $this->vendorService->createNewService(
            $data, 
            Auth::id(), 
            $request->file('images')
        );

        return response()->json([
            'status'  => 'success',
            'message' => 'Jasa berhasil ditambahkan ke katalog Evoria!',
            'data'    => $service
        ], 201);
    }

    // Tambahkan method ini di bawah method store
    public function index() {
        // Auth::id() mengirimkan ID user yang login sebagai vendor_id
        $services = $this->vendorService->getServicesByVendor(Auth::id());

        return response()->json([
            'status' => 'success',
            'data'   => $services
        ]);
    }


    public function update(Request $request, $id) {
    $data = $request->validate([
        'name' => 'required|string',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'event_category_id' => 'required|exists:event_categories,id',
        'service_type_id' => 'required|exists:service_types,id', // <--- Validasi WAJIB
        'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:5120'
    ]);

    $service = $this->vendorService->updateService($id, $data, $request->file('images'));
    return response()->json(['status' => 'success', 'data' => $service]);
    }

    public function destroy($id) {
        $this->vendorService->deleteService($id);
        return response()->json(['status' => 'success', 'message' => 'Jasa dihapus']);
    }

    public function show($id) {
        $service = $this->vendorService->getServiceById($id); // Buat method ini di service/repo
        return response()->json(['status' => 'success', 'data' => $service]);
    }
}