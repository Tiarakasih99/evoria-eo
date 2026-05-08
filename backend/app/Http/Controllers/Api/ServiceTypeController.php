<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ServiceTypeService;
use Illuminate\Http\JsonResponse;

class ServiceTypeController extends Controller
{
    protected $serviceTypeService;

    public function __construct(ServiceTypeService $serviceTypeService)
    {
        $this->serviceTypeService = $serviceTypeService;
    }

    public function index($categoryId): JsonResponse
    {
        $data = $this->serviceTypeService->getServiceTypesForDropdown($categoryId);
        
        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }
}