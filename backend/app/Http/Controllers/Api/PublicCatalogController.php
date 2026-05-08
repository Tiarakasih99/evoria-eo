<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DiscoveryService;
use Illuminate\Http\Request;
use App\Models\Service;

class PublicCatalogController extends Controller
{
    protected $discoveryService;

    public function __construct(DiscoveryService $discoveryService)
    {
        $this->discoveryService = $discoveryService;
    }

    // public function index(Request $request)
    // {
    //     // Mengambil input 'search' dan 'category_id' dari URL Postman
    //     $filters = $request->only(['search', 'category_id']);
        
    //     $services = $this->discoveryService->getCatalog($filters);

    //     return response()->json([
    //         'status' => 'success',
    //         'count'  => $services->count(),
    //         'data'   => $services
    //     ]);
    // }
    public function index(Request $request)
    {
        $query = Service::with(['category', 'serviceType', 'vendor']);

        // Jika customer memilih kategori
        if ($request->has('category_id') && $request->category_id != '') {
            $query->where('event_category_id', $request->category_id);
        }

        // Jika customer memilih tipe layanan
        if ($request->has('service_type_id') && $request->service_type_id != '') {
            $query->where('service_type_id', $request->service_type_id);
        }

        $services = $query->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $services
        ]);
    }
}