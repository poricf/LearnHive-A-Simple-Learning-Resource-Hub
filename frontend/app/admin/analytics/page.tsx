"use client"

import { BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-orange-50 p-8 rounded-full mb-6">
        <BarChart3 className="h-12 w-12 text-orange-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
      <p className="text-gray-600 max-w-md mb-8">
        We're creating a powerful analytics dashboard to help you understand platform usage and resource performance. Soon you'll have access to detailed insights and metrics.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md">
        <h2 className="font-semibold mb-2">Coming Features:</h2>
        <ul className="text-left space-y-2 text-gray-600">
          <li>• Resource usage statistics</li>
          <li>• User engagement metrics</li>
          <li>• Popular content analysis</li>
          <li>• Custom report generation</li>
        </ul>
      </div>
    </div>
  )
} 