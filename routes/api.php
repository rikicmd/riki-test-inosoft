<?php

use App\Services\Excel;
use Illuminate\Support\Facades\Route;

Route::get('/products', function () {
    $excelService = new Excel();

    $filePath = public_path('/sample.xlsx');

    $result = $excelService->readExcel($filePath);

    $sheet1Data = collect($result->{'Sheet 1'});

    return response()->json($sheet1Data);
});
