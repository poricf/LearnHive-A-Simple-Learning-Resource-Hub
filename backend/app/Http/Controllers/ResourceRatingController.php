<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use App\Models\ResourceRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ResourceRatingController extends Controller
{
    /**
     * Store a newly created rating in storage or update an existing one.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeOrUpdate(Request $request, Resource $resource)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'rating' => [
                'required',
                'integer',
                Rule::in([1, 2, 3, 4, 5]), // Example: 1-5 star rating
            ],
        ]);

        try {
            $rating = ResourceRating::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'resource_id' => $resource->id,
                ],
                [
                    'rating' => $validated['rating'],
                ]
            );

            // Recalculate and update the resource's average rating and count
            $resource->updateRating();

            return response()->json([
                'message' => 'Rating saved successfully.',
                'rating' => $rating->load('user'), // Optionally return the rating with user
                'resource' => $resource->fresh(), // Return the updated resource
            ], 200); // 200 OK for update, 201 for pure create. Here, it's an upsert.

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error("Rating submission failed for resource {$resource->id} by user {$user->id}: " . $e->getMessage());
            return response()->json(['message' => 'Failed to save rating.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified rating from storage.
     *
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Resource $resource)
    {
        $user = Auth::user();

        $rating = ResourceRating::where('user_id', $user->id)
                                ->where('resource_id', $resource->id)
                                ->first();

        if (!$rating) {
            return response()->json(['message' => 'You have not rated this resource.'], 404);
        }

        try {
            $rating->delete();

            // Recalculate and update the resource's average rating and count
            $resource->updateRating();

            return response()->json([
                'message' => 'Rating removed successfully.',
                'resource' => $resource->fresh(), // Return the updated resource
            ], 200);

        } catch (\Exception $e) {
             // Log the error for debugging
            \Log::error("Rating deletion failed for resource {$resource->id} by user {$user->id}: " . $e->getMessage());
            return response()->json(['message' => 'Failed to remove rating.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get the current user's rating for a specific resource.
     *
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Resource $resource)
    {
        $user = Auth::user();
        $rating = ResourceRating::where('user_id', $user->id)
                                ->where('resource_id', $resource->id)
                                ->first();

        if (!$rating) {
            return response()->json(['message' => 'You have not rated this resource.', 'rating' => null], 200); // Or 404 if you prefer
        }

        return response()->json($rating, 200);
    }
}