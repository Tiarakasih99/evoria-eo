<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(): JsonResponse
    {
        $categories = $this->categoryService->getAllCategories();

        return response()->json([
            'status'  => 'success',
            'message' => 'Daftar kategori berhasil diambil',
            'data'    => $categories
        ]);
    }
}