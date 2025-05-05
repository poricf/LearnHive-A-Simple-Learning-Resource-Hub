import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import CategoryCard from "@/components/category-card"
import FeaturedResourceCard from "@/components/featured-resource-card"
import { Input } from "@/components/ui/input"

export default function Home() {
  // Featured categories
  const categories = [
    {
      id: "web-dev",
      name: "Web Development",
      description: "Frontend, Backend, JavaScript, React, and more",
      icon: "🌐",
      resourceCount: 124,
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      description: "Neural Networks, Deep Learning, NLP, Computer Vision",
      icon: "🤖",
      resourceCount: 98,
    },
    {
      id: "cs",
      name: "Computer Science",
      description: "Algorithms, Data Structures, System Design",
      icon: "💻",
      resourceCount: 87,
    },
    {
      id: "design",
      name: "UI/UX Design",
      description: "User Interface, User Experience, Design Systems",
      icon: "🎨",
      resourceCount: 65,
    },
    {
      id: "science",
      name: "Science",
      description: "Physics, Chemistry, Biology, Earth Sciences",
      icon: "🔬",
      resourceCount: 72,
    },
    {
      id: "engineering",
      name: "Engineering",
      description: "Mechanical, Electrical, Civil, Chemical",
      icon: "⚙️",
      resourceCount: 58,
    },
  ]

  // Featured resources
  const featuredResources = [
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
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover the Best Learning Resources
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                LearnHive helps you find, organize, and bookmark high-quality educational content from across the web.
              </p>
            </div>
            <div className="flex w-full max-w-md flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input placeholder="Search for resources..." className="pl-10 h-11" />
              </div>
              <Button size="lg">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Browse Categories</h2>
              <Link href="/resources" className="text-sm font-medium text-blue-600 hover:underline">
                View all categories
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Featured Resources</h2>
              <Link href="/resources" className="text-sm font-medium text-blue-600 hover:underline">
                View all resources
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <FeaturedResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6 items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight">How LearnHive Works</h2>
            <p className="text-gray-600 md:text-lg max-w-[700px]">
              LearnHive helps you discover, organize, and learn from the best educational content on the web.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 w-full">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">Discover</h3>
                <p className="text-gray-600">Find high-quality resources across various categories and formats.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
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
                <h3 className="text-xl font-medium mb-2">Bookmark</h3>
                <p className="text-gray-600">Save your favorite resources to revisit them anytime.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
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
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Contribute</h3>
                <p className="text-gray-600">Rate resources and suggest new ones to help the community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6 items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight">Join Our Learning Community</h2>
            <p className="text-gray-600 md:text-lg max-w-[700px]">
              Create an account to bookmark resources, track your progress, and contribute to the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" asChild>
                <Link href="/login?tab=register">Sign Up Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
