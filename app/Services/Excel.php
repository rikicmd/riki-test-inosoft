<?php

namespace App\Services;

use PhpOffice\PhpSpreadsheet\IOFactory;

class Excel
{
    public function readExcel($file)
    {
        ini_set('memory_limit', '-1');
        $spreadsheet = IOFactory::load($file);
        $sheetNames = $spreadsheet->getSheetNames();

        $data = [];

        foreach ($sheetNames as $sheetName) {
            $worksheet = $spreadsheet->getSheetByName($sheetName);

            $sheetData = [];
            $header = [];

            foreach ($worksheet->getRowIterator() as $key => $row) {
                $rowData = [];

                $isEmpty = true;
                $tempRowData = [];
                foreach ($row->getCellIterator() as $cell) {
                    if (!empty($cell->getValue())) {
                        $isEmpty = false;
                    }
                    $tempRowData[] = $cell->getValue();
                }

                if (!$isEmpty) {
                    $rowData = $tempRowData;

                    if (empty($header)) {

                        $header = array_map(function ($h) {
                            return strtolower(str_replace(' ', '_', $h));
                        }, $rowData);
                        unset($header[""]);
                    } else {

                        $rowAsAssoc = array_combine($header, $rowData);
                        unset($rowAsAssoc[""]);

                        $sheetData[] = $rowAsAssoc;
                    }
                }
            }

            $data[$sheetName] = $sheetData;
        }

        return (object) $data;
    }
}
