"use client"

import { MessageSquarePlus } from "lucide-react"

export default function SuggestionsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-green-50 p-8 rounded-full mb-6">
        <MessageSquarePlus className="h-12 w-12 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Resource Suggestions</h1>
      <p className="text-gray-600 max-w-md mb-8">
        We're building a system to manage and review resource suggestions from our community. Soon you'll be able to review and approve new learning resources.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md">
        <h2 className="font-semibold mb-2">Coming Features:</h2>
        <ul className="text-left space-y-2 text-gray-600">
          <li>• Review and approve resource suggestions</li>
          <li>• Provide feedback on submissions</li>
          <li>• Track suggestion status</li>
          <li>• Community contribution metrics</li>
        </ul>
      </div>
    </div>
  )
} 