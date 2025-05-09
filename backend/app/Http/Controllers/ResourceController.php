<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ResourceController extends Controller
{
    public function index(Request $request)
{
    $resources = Resource::filter($request->only(['category', 'type']))->get();

    return response()->json($resources);
}


    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string',
                'type_id' => 'required|integer',
                'about' => 'required|string',
                'source' => 'required|string',
                'rating' => 'nullable|numeric',
                'ratingCount' => 'nullable|integer',
                'category_id' => 'required|integer',
                'thumbnail' => 'required|string',
                'difficulty_id' => 'required|integer',
                'link' => 'required|string'
            ]);

            $resource = Resource::create($validated);

            return response()->json($resource, 201);

        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['errors' => 'Failed to create resource'], 500);
        }
    }

    public function show($id)
    {
        try {
            $resource = Resource::findOrFail($id);
            return response()->json($resource, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Resource not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch resource'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $resource = Resource::findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|required|string',
                'type_id' => 'sometimes|required|integer',
                'about' => 'sometimes|required|string',
                'source' => 'sometimes|required|string',
                'rating' => 'nullable|numeric',
                'ratingCount' => 'nullable|integer',
                'category_id' => 'sometimes|required|integer',
                'thumbnail' => 'sometimes|required|string',
                'difficulty_id' => 'sometimes|required|integer',
                'link' => 'sometimes|required|string'
            ]);

            $resource->update($validated);

            return response()->json($resource, 200);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Resource not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update resource'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $resource = Resource::findOrFail($id);
            $resource->delete();

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Resource not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete resource'], 500);
        }
    }
}
