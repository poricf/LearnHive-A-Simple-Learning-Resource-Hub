"use client"

import { FolderTree } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-blue-50 p-8 rounded-full mb-6">
        <FolderTree className="h-12 w-12 text-blue-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Categories Management</h1>
      <p className="text-gray-600 max-w-md mb-8">
        We're working on bringing you a powerful category management system. Soon you'll be able to organize and manage learning resources more effectively.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md">
        <h2 className="font-semibold mb-2">Coming Features:</h2>
        <ul className="text-left space-y-2 text-gray-600">
          <li>• Create and manage resource categories</li>
          <li>• Organize resources by topics and subcategories</li>
          <li>• Custom category hierarchies</li>
          <li>• Bulk category operations</li>
        </ul>
      </div>
    </div>
  )
} 