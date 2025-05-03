"use client"

import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-gray-50 p-8 rounded-full mb-6">
        <Settings className="h-12 w-12 text-gray-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Platform Settings</h1>
      <p className="text-gray-600 max-w-md mb-8">
        We're building a comprehensive settings panel to help you customize and configure the platform. Soon you'll have full control over your learning environment.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md">
        <h2 className="font-semibold mb-2">Coming Features:</h2>
        <ul className="text-left space-y-2 text-gray-600">
          <li>• Platform configuration</li>
          <li>• Notification preferences</li>
          <li>• Integration settings</li>
          <li>• System preferences</li>
        </ul>
      </div>
    </div>
  )
} 