"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResourceCard from "@/components/resource-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, BookmarkCheck, History, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function UserDashboard() {
  const [sortOption, setSortOption] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: {
      completed: 12,
      inProgress: 5,
      total: 25,
    },
    interests: ["Web Development", "AI & Machine Learning", "Computer Science"],
    stats: {
      bookmarks: 18,
      completed: 12,
      inProgress: 5,
      contributions: 3,
    },
  }

  // Mock recommended resources
  const recommendedResources = [
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
      bookmarked: false,
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
      bookmarked: false,
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
      bookmarked: true,
    },
  ]

  // Mock recent activity
  const recentActivity = [
    {
      id: "1",
      title: "The Complete JavaScript Course 2023",
      type: "course",
      action: "completed",
      date: "2 days ago",
    },
    {
      id: "2",
      title: "Python for Data Science and Machine Learning",
      type: "video",
      action: "bookmarked",
      date: "3 days ago",
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      type: "article",
      action: "started",
      date: "5 days ago",
    },
  ]

  // Mock in-progress resources
  const inProgressResources = [
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
      progress: 65,
      bookmarked: true,
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
      progress: 30,
      bookmarked: true,
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality would be implemented here
  }

  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-6">
          {/* Welcome Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-blue-100">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h2>
                  <p className="text-gray-600">Continue your learning journey</p>
                </div>
                <Link href="/profile" className="ml-auto">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Search Bar */}
          <div className="bg-white rounded-lg border shadow-sm p-4">
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
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </form>
          </div>

          {/* Tabs for different content */}
          <Tabs defaultValue="recommended">
            <TabsList className="bg-white border border-gray-100 shadow-sm mb-4">
              <TabsTrigger
                value="recommended"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
              >
                Recommended
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="bookmarks"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
              >
                Bookmarks
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="in-progress" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inProgressResources.map((resource) => (
                  <Card
                    key={resource.id}
                    className="overflow-hidden transition-all hover:shadow-md hover:border-blue-200"
                  >
                    <div className="relative aspect-video bg-gray-100">
                      <img
                        src={resource.thumbnail || "/placeholder.svg"}
                        alt={resource.title}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800">
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </Badge>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm font-medium">{resource.progress}% Complete</span>
                          <Badge variant="outline" className="bg-white/90">
                            {resource.difficulty}
                          </Badge>
                        </div>
                        <Progress value={resource.progress} className="h-1.5 mt-1" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-2 text-base mb-2">{resource.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {resource.source} • {resource.category}
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookmarks" className="mt-0">
              <div className="text-center py-8">
                <Button asChild>
                  <a href="/bookmarks">View All Bookmarks</a>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">View all your completed resources</p>
                <Button variant="outline">View Completed Resources</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/3 space-y-6">
          {/* Learning Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span className="font-medium">
                      {Math.round((user.progress.completed / user.progress.total) * 100)}%
                    </span>
                  </div>
                  <Progress value={(user.progress.completed / user.progress.total) * 100} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.progress.completed}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-600">{user.progress.inProgress}</div>
                    <div className="text-xs text-gray-600">In Progress</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Interests</CardTitle>
              <CardDescription>Topics you're following</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="bg-gray-50">
                    {interest}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-7 rounded-full">
                  + Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="rounded-full p-1.5 bg-gray-100">
                      {activity.action === "completed" && <Star className="h-4 w-4 text-yellow-500" />}
                      {activity.action === "bookmarked" && <BookmarkCheck className="h-4 w-4 text-blue-500" />}
                      {activity.action === "started" && <History className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium line-clamp-1">{activity.title}</p>
                      <p className="text-xs text-gray-500">
                        {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
