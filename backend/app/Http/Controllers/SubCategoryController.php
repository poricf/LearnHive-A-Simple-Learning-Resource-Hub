<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubcategoryController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Received POST to /api/subcategories');
        Log::info('Request data: ' . json_encode($request->all()));
        Log::info('Request headers: ' . json_encode($request->headers->all()));

        try {
            Log::info('Validating input...');
            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            Log::info('Saving to database...');
            $subcategory = Subcategory::create($validated);
            Log::info('Database save successful: ' . json_encode($subcategory));

            return response()->json($subcategory, 201);
        } catch (\Exception $e) {
            Log::error('Error in /api/subcategories: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
