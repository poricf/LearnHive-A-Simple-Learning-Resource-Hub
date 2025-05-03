"use client"

import { Users } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="bg-purple-50 p-8 rounded-full mb-6">
        <Users className="h-12 w-12 text-purple-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <p className="text-gray-600 max-w-md mb-8">
        We're developing a comprehensive user management system. Soon you'll be able to manage user accounts, roles, and permissions.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md">
        <h2 className="font-semibold mb-2">Coming Features:</h2>
        <ul className="text-left space-y-2 text-gray-600">
          <li>• User account management</li>
          <li>• Role-based access control</li>
          <li>• User activity monitoring</li>
          <li>• Account verification system</li>
        </ul>
      </div>
    </div>
  )
} 