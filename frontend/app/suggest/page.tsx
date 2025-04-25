"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SuggestPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Suggest a Resource</h1>
      <p className="text-gray-600 mb-8">
        Found a valuable educational resource? Share it with the LearnHive community. All suggestions will be reviewed
        by our team before being published.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This feature is currently under development.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
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
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">Resource Suggestion Feature</h2>
          <p className="text-gray-500 max-w-md mb-4">
            We're working on adding the ability for users to suggest new educational resources. This feature will be
            available soon!
          </p>
          <Button asChild>
            <Link href="/resources">Browse Existing Resources</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Original form code is saved but commented out for future implementation
      
      Original form implementation:
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Resource Title</Label>
          <Input id="title" placeholder="Enter the title of the resource" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Resource URL</Label>
          <Input id="url" type="url" placeholder="https://example.com" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Resource Type</Label>
            <Select required>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="tutorial">Tutorial</SelectItem>
                <SelectItem value="ebook">E-Book</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select required value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        ... rest of the form ...

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Resource"}
        </Button>
      </form>
      */}
    </div>
  )
}
