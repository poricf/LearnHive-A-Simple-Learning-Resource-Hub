import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminResources from "@/components/admin/admin-resources"
import AdminCategories from "@/components/admin/admin-categories"
import AdminSuggestions from "@/components/admin/admin-suggestions"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="resources">Manage Resources</TabsTrigger>
            <TabsTrigger value="categories">Manage Categories</TabsTrigger>
            <TabsTrigger value="suggestions">Review Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="resources" className="mt-0">
            <AdminResources />
          </TabsContent>

          <TabsContent value="categories" className="mt-0">
            <AdminCategories />
          </TabsContent>

          <TabsContent value="suggestions" className="mt-0">
            <AdminSuggestions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
