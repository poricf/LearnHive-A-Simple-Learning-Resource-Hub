"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceCard from "@/components/resource-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ResourcesSidebar from "@/components/resources-sidebar"

export default function ResourcesContent() {
  const [sortOption, setSortOption] = useState("rating")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    types: [] as string[],
    difficulty: [] as string[],
    rating: 0,
  })

  // Sample resources data
  const resources = [
    {
      id: "1",
      title: "Complete React Developer in 2023",
      type: "video",
      source: "YouTube",
      rating: 4.8,
      ratingCount: 1245,
      tags: ["Beginner", "Project-Based"],
      category: "Web Development",
      subcategory: "React",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Beginner",
      videoId: "dGcsHMXbSOA", // Example YouTube ID
    },
    {
      id: "2",
      title: "Machine Learning A-Z: Hands-On Python & R",
      type: "course",
      source: "Udemy",
      rating: 4.6,
      ratingCount: 987,
      tags: ["Intermediate", "Comprehensive"],
      category: "AI & Machine Learning",
      subcategory: "Machine Learning",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Intermediate",
    },
    {
      id: "3",
      title: "Data Structures and Algorithms in JavaScript",
      type: "article",
      source: "Medium",
      rating: 4.5,
      ratingCount: 756,
      tags: ["Advanced", "Interview Prep"],
      category: "Computer Science",
      subcategory: "Algorithms",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Advanced",
    },
    {
      id: "4",
      title: "The Complete JavaScript Course 2023",
      type: "course",
      source: "Udemy",
      rating: 4.7,
      ratingCount: 1532,
      tags: ["Beginner", "Comprehensive"],
      category: "Web Development",
      subcategory: "JavaScript",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Beginner",
    },
    {
      id: "5",
      title: "Python for Data Science and Machine Learning",
      type: "video",
      source: "YouTube",
      rating: 4.9,
      ratingCount: 876,
      tags: ["Intermediate", "Hands-On"],
      category: "AI & Machine Learning",
      subcategory: "Python",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Intermediate",
      videoId: "LHBE6Q9XlzI", // Example YouTube ID
    },
    {
      id: "6",
      title: "UI/UX Design Fundamentals",
      type: "article",
      source: "Medium",
      rating: 4.3,
      ratingCount: 543,
      tags: ["Beginner", "Design Principles"],
      category: "UI/UX Design",
      subcategory: "Fundamentals",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Beginner",
    },
    {
      id: "7",
      title: "Introduction to Physics: Mechanics",
      type: "video",
      source: "Khan Academy",
      rating: 4.7,
      ratingCount: 892,
      tags: ["Beginner", "Academic"],
      category: "Science",
      subcategory: "Physics",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Beginner",
      videoId: "ZM8ECpBuQYE", // Example YouTube ID
    },
    {
      id: "8",
      title: "Mechanical Engineering Principles",
      type: "course",
      source: "Coursera",
      rating: 4.5,
      ratingCount: 623,
      tags: ["Intermediate", "Comprehensive"],
      category: "Engineering",
      subcategory: "Mechanical",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Intermediate",
    },
    {
      id: "9",
      title: "World History: Ancient Civilizations",
      type: "article",
      source: "History.com",
      rating: 4.2,
      ratingCount: 412,
      tags: ["Beginner", "Comprehensive"],
      category: "History",
      subcategory: "Ancient History",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Beginner",
    },
    {
      id: "10",
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      type: "book",
      source: "PDF Library",
      rating: 4.8,
      ratingCount: 1876,
      tags: ["Advanced", "Best Practice"],
      category: "Computer Science",
      subcategory: "Software Engineering",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Intermediate",
      pdfUrl: "https://example.com/clean-code.pdf", // Example PDF URL
    },
    {
      id: "11",
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      type: "book",
      source: "PDF Library",
      rating: 4.7,
      ratingCount: 1543,
      tags: ["Advanced", "Architecture"],
      category: "Computer Science",
      subcategory: "Software Design",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Advanced",
      pdfUrl: "https://example.com/design-patterns.pdf", // Example PDF URL
    },
  ]

  // Filter resources based on search query and active filters
  const filteredResources = resources.filter((resource) => {
    // Search filter
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Category filter
    if (
      activeFilters.categories.length > 0 &&
      !activeFilters.categories.some(
        (cat) => resource.category.toLowerCase().includes(cat) || resource.subcategory.toLowerCase().includes(cat),
      )
    ) {
      return false
    }

    // Type filter
    if (activeFilters.types.length > 0 && !activeFilters.types.includes(resource.type)) {
      return false
    }

    // Difficulty filter
    if (activeFilters.difficulty.length > 0 && !activeFilters.difficulty.includes(resource.difficulty?.toLowerCase())) {
      return false
    }

    // Rating filter
    if (activeFilters.rating > 0 && resource.rating < activeFilters.rating) {
      return false
    }

    return true
  })

  // Sort resources based on selected option
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortOption === "rating") {
      return b.rating - a.rating
    } else if (sortOption === "newest") {
      // In a real app, you would sort by date
      return Number.parseInt(b.id) - Number.parseInt(a.id)
    } else if (sortOption === "popular") {
      return b.ratingCount - a.ratingCount
    }
    return 0
  })

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already applied via the filteredResources
  }

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 relative">
      {/* Mobile filter button */}
      <div className="lg:hidden mb-2">
        <Button
          variant="outline"
          onClick={toggleSidebar}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <Menu className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          lg:w-1/4 
          ${sidebarVisible ? "block" : "hidden"} 
          lg:block 
          fixed 
          lg:sticky 
          top-20 
          lg:top-20 
          z-40 
          lg:z-0 
          w-full 
          lg:w-1/4 
          h-screen 
          lg:h-auto 
          overflow-auto
          bg-white
          lg:bg-transparent
          p-4
          lg:p-0
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="lg:hidden flex justify-between items-center mb-4 px-2">
          <h2 className="font-medium text-lg text-gray-800">Filters</h2>
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ResourcesSidebar onApplyFilters={handleApplyFilters} />
      </div>

      {/* Overlay for mobile */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Search Bar */}
        <div className="bg-white rounded-lg border shadow-sm p-4 mb-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search resources..."
                className="pl-10 pr-4 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px] bg-white border-gray-200 shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </form>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="bg-white border border-gray-100 shadow-sm mb-4">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              Articles
            </TabsTrigger>
            <TabsTrigger
              value="books"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              Books
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
            >
              Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {sortedResources.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We couldn't find any resources matching your search criteria. Try adjusting your filters or search
                  query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedResources
                .filter((resource) => resource.type === "video")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedResources
                .filter((resource) => resource.type === "article")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="books" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedResources
                .filter((resource) => resource.type === "book")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedResources
                .filter((resource) => resource.type === "course")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
