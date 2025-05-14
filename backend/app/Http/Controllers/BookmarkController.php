<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Resource;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    // GET /api/bookmarks
    public function index(Request $request)
    {
        $user = $request->user();
        // $user = User::first(); // For testing purposes, replace with actual user retrieval
        
        return response()->json($user->bookmarkedResources, 200);
    }

    // POST /api/bookmarks
    public function store(Request $request)
    {
        $user = $request->user();

        // If the request still gets here without a user, despite auth middleware.
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $validated = $request->validate([
            'resource_id' => 'required|exists:resources,id',
        ], [
            'resource_id.exists' => 'No resource found with the given ID.',
        ]);

        $resourceId = $validated['resource_id'];

        // Check if the resource is already bookmarked by this user
        // The whereKey() method on a relationship query builder will query
        // against the primary key of the related model (Resource in this case).
        $isAlreadyBookmarked = $user->bookmarkedResources()->whereKey($resourceId)->exists();

        if ($isAlreadyBookmarked) {
            return response()->json(['message' => 'Resource already bookmarked.'], 200); // 200 OK, as the state is already as desired
        }

        // If not already bookmarked, then attach it.
        // syncWithoutDetaching is also fine here, but attach is more direct if you've already checked.
        // attach() will add a new record to the pivot table.
        // It will also add timestamps if your pivot table has them (created_at, updated_at)
        // if you've defined the relationship with ->withTimestamps().
        $user->bookmarkedResources()->attach($resourceId);
        // $user->bookmarkedResources()->syncWithoutDetaching([$resourceId]); // This also works and is idempotent

        return response()->json(['message' => 'Bookmarked successfully.'], 201);
    }

    // DELETE /api/bookmarks/{resource}
   // DELETE /api/bookmarks/{resourceId}
   public function destroy(Request $request, $resourceId) // Renamed {resource} to {resourceId} for clarity
   {
       $user = $request->user();
       if (!$user) {
           return response()->json(['message' => 'Unauthenticated.'], 401);
       }

       // Optional: Check if the resource exists before trying to detach
       // This prevents errors if a non-existent resourceId is passed,
       // though detach() on a non-existent ID usually just does nothing silently.
       $resource = Resource::find($resourceId);
       if (!$resource) {
           return response()->json(['message' => 'Resource not found.'], 404);
       }

       // Detach returns the number of detached records.
       $detachedCount = $user->bookmarkedResources()->detach($resourceId);

       if ($detachedCount > 0) {
           return response()->json(['message' => 'Bookmark removed.'], 200);
       } else {
           // This means the user didn't have this resource bookmarked.
           return response()->json(['message' => 'Bookmark not found for this user.'], 404);
       }
   }
}


