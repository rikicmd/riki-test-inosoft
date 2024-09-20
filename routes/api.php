<?php

use App\Services\Excel;
use Illuminate\Support\Facades\Route;

Route::get('/products', function () {
    $excelService = new Excel();

    $filePath = public_path('/sample.xlsx');

    $result = $excelService->readExcel($filePath);

    $sheet1Data = collect($result->{'Sheet 1'});

    $query = request()->query();

    if (isset($query['country_name'])) {
        $sheet1Data = $sheet1Data->where('country_name', $query['country_name']);
    }

    if (isset($query['product_type'])) {
        $sheet1Data = $sheet1Data->where('product_type', $query['product_type']);
    }

    if (isset($query['size'])) {
        $sheet1Data = $sheet1Data->where('size', $query['size']);
    }

    if (isset($query['connection'])) {
        $sheet1Data = $sheet1Data->where('connection', $query['connection']);
    }

    if (isset($query['grade'])) {
        $sheet1Data = $sheet1Data->where('grade', $query['grade']);
    }

    $perPage = isset($query['per_page']) ? (int)$query['per_page'] : 10;
    $currentPage = isset($query['page']) ? (int)$query['page'] : 1;

    $paginatedData = $sheet1Data->slice(($currentPage - 1) * $perPage, $perPage)->values();
    $total = $sheet1Data->count();

    return response()->json([
        'data' => $paginatedData,
        'current_page' => $currentPage,
        'per_page' => $perPage,
        'total' => $total,
    ]);
});

Route::get('/products-all', function () {
    $excelService = new Excel();

    $filePath = public_path('/sample.xlsx');

    $result = $excelService->readExcel($filePath);

    $sheet1Data = collect($result->{'Sheet 1'});

    return response()->json($sheet1Data);
});
