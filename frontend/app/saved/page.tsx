import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceCard from "@/components/resource-card"

export default function SavedPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Saved Resources</h1>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard
              title="Introduction to React Hooks"
              type="Video"
              source="YouTube"
              category="Web Development"
              thumbnail="/placeholder.svg?height=200&width=350"
              url="#"
              saved={true}
            />
            <ResourceCard
              title="Machine Learning Fundamentals"
              type="Course"
              source="Coursera"
              category="Data Science"
              thumbnail="/placeholder.svg?height=200&width=350"
              url="#"
              saved={true}
            />
            <ResourceCard
              title="The Complete Guide to Python"
              type="Tutorial"
              source="FreeCodeCamp"
              category="Programming"
              thumbnail="/placeholder.svg?height=200&width=350"
              url="#"
              saved={true}
            />
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  )
}
