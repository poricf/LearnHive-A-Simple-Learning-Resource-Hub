import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import ResourceCard from "@/components/resource-card"
import CategorySidebar from "@/components/category-sidebar"

export default function BrowsePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Resources</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-10" />
        </div>
        <Button>Search</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <CategorySidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Introduction to React Hooks"
                  type="Video"
                  source="YouTube"
                  category="Web Development"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
                <ResourceCard
                  title="Machine Learning Fundamentals"
                  type="Course"
                  source="Coursera"
                  category="Data Science"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
                <ResourceCard
                  title="The Complete Guide to Python"
                  type="Tutorial"
                  source="FreeCodeCamp"
                  category="Programming"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
                <ResourceCard
                  title="JavaScript: Understanding the Weird Parts"
                  type="Video"
                  source="Udemy"
                  category="Web Development"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
                <ResourceCard
                  title="Introduction to Data Structures"
                  type="Article"
                  source="Medium"
                  category="Computer Science"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
                <ResourceCard
                  title="UI/UX Design Principles"
                  type="Course"
                  source="Skillshare"
                  category="Design"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Introduction to React Hooks"
                  type="Video"
                  source="YouTube"
                  category="Web Development"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
                <ResourceCard
                  title="JavaScript: Understanding the Weird Parts"
                  type="Video"
                  source="Udemy"
                  category="Web Development"
                  thumbnail="/placeholder.svg?height=200&width=350"
                  url="#"
                />
              </div>
            </TabsContent>

            {/* Other tab contents would be similar */}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
