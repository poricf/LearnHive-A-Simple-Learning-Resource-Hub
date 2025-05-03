"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderTree, MessageSquarePlus, Users, BarChart3, Settings, BookOpen } from "lucide-react"
import AdminResources from "@/components/admin/admin-resources"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("resources")

  const ComingSoonContent = ({ icon: Icon, title, description, features, color }: {
    icon: any
    title: string
    description: string
    features: string[]
    color: string
  }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className={`bg-${color}-50 p-8 rounded-full mb-6`}>
        <Icon className={`h-12 w-12 text-${color}-500`} />
      </div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 max-w-md mb-8">{description}</p>
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md">
        <h2 className="font-semibold mb-2">Coming Features:</h2>
        <ul className="text-left space-y-2 text-gray-600">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderTree className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <MessageSquarePlus className="h-4 w-4" />
            Suggestions
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <AdminResources />
        </TabsContent>

        <TabsContent value="categories">
          <ComingSoonContent
            icon={FolderTree}
            title="Categories Management"
            description="We're working on bringing you a powerful category management system. Soon you'll be able to organize and manage learning resources more effectively."
            features={[
              "Create and manage resource categories",
              "Organize resources by topics and subcategories",
              "Custom category hierarchies",
              "Bulk category operations"
            ]}
            color="blue"
          />
        </TabsContent>

        <TabsContent value="suggestions">
          <ComingSoonContent
            icon={MessageSquarePlus}
            title="Resource Suggestions"
            description="We're building a system to manage and review resource suggestions from our community. Soon you'll be able to review and approve new learning resources."
            features={[
              "Review and approve resource suggestions",
              "Provide feedback on submissions",
              "Track suggestion status",
              "Community contribution metrics"
            ]}
            color="green"
          />
        </TabsContent>

        <TabsContent value="users">
          <ComingSoonContent
            icon={Users}
            title="User Management"
            description="We're developing a comprehensive user management system. Soon you'll be able to manage user accounts, roles, and permissions."
            features={[
              "User account management",
              "Role-based access control",
              "User activity monitoring",
              "Account verification system"
            ]}
            color="purple"
          />
        </TabsContent>

        <TabsContent value="analytics">
          <ComingSoonContent
            icon={BarChart3}
            title="Analytics Dashboard"
            description="We're creating a powerful analytics dashboard to help you understand platform usage and resource performance. Soon you'll have access to detailed insights and metrics."
            features={[
              "Resource usage statistics",
              "User engagement metrics",
              "Popular content analysis",
              "Custom report generation"
            ]}
            color="orange"
          />
        </TabsContent>

        <TabsContent value="settings">
          <ComingSoonContent
            icon={Settings}
            title="Platform Settings"
            description="We're building a comprehensive settings panel to help you customize and configure the platform. Soon you'll have full control over your learning environment."
            features={[
              "Platform configuration",
              "Notification preferences",
              "Integration settings",
              "System preferences"
            ]}
            color="gray"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
