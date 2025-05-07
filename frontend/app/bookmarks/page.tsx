"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceCard from "@/components/resource-card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookmarkX } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"

export default function BookmarksPage() {
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in
  useEffect(() => {
    // In a real app, this would check authentication state
    // For now, we'll simulate by checking if user has been on profile or dashboard page
    const isLoggedIn = pathname === "/profile" || pathname === "/dashboard"

    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      router.push("/login")
    }
  }, [pathname, router])

  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("recent")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [bookmarks, setBookmarks] = useState([
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
      bookmarked: true,
      dateAdded: "2023-05-15",
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
      bookmarked: true,
      dateAdded: "2023-05-10",
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
      bookmarked: true,
      dateAdded: "2023-05-05",
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
      bookmarked: true,
      dateAdded: "2023-04-28",
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
      bookmarked: true,
      dateAdded: "2023-04-20",
    },
  ])

  // This will only render if the user is logged in
  // Otherwise, they'll be redirected to the login page
  if (pathname !== "/profile" && pathname !== "/dashboard") {
    return null
  }

  // Get unique categories from bookmarks
  const categories = [
    "all",
    ...new Set(bookmarks.map((bookmark) => bookmark.category.toLowerCase().replace(/\s+/g, "-"))),
  ]

  // Filter bookmarks based on search query and selected category
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    // Search filter
    if (searchQuery && !bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Category filter
    if (selectedCategory !== "all" && bookmark.category.toLowerCase().replace(/\s+/g, "-") !== selectedCategory) {
      return false
    }

    return true
  })

  // Sort bookmarks based on selected option
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    } else if (sortOption === "rating") {
      return b.rating - a.rating
    } else if (sortOption === "az") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
    toast({
      title: "Bookmark removed",
      description: "The resource has been removed from your bookmarks.",
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already applied via the filteredBookmarks
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to remove all bookmarks?")) {
      setBookmarks([])
      toast({
        title: "All bookmarks removed",
        description: "All resources have been removed from your bookmarks.",
      })
    }
  }

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Bookmarks</h1>

        {bookmarks.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:border-red-200"
          >
            <BookmarkX className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border shadow-sm">
          <div className="rounded-full bg-blue-100 p-3 text-blue-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
          <p className="text-gray-500 mb-4 max-w-md">
            Start exploring resources and bookmark the ones you find useful to access them later.
          </p>
          <Button href="/resources" className="mt-2">
            Explore Resources
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search your bookmarks..."
                    className="pl-10 pr-4 bg-gray-50 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-white border-gray-200 shadow-sm">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories
                      .filter((cat) => cat !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px] bg-white border-gray-200 shadow-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${selectedCategory === category ? "bg-blue-600" : "hover:bg-gray-100"}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all"
                    ? "All"
                    : category
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="bg-white border border-gray-100 shadow-sm mb-6">
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
                value="courses"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
              >
                Courses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBookmarks.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onRemoveBookmark={() => handleRemoveBookmark(resource.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBookmarks
                  .filter((resource) => resource.type === "video")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onRemoveBookmark={() => handleRemoveBookmark(resource.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="articles" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBookmarks
                  .filter((resource) => resource.type === "article")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onRemoveBookmark={() => handleRemoveBookmark(resource.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBookmarks
                  .filter((resource) => resource.type === "course")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onRemoveBookmark={() => handleRemoveBookmark(resource.id)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
