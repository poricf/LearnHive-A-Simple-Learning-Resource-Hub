"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ResourceRating from "@/components/resource-rating"
import InteractiveRating from "@/components/interactive-rating"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, Share2, Download } from "lucide-react"
import RelatedResources from "@/components/related-resources"
import VideoPlayer from "@/components/video-player"
import PDFViewer from "@/components/pdf-viewer"

interface ResourceDetailProps {
  resource: {
    id: string
    title: string
    type: string
    source: string
    author: string
    url: string
    rating: number
    ratingCount: number
    tags?: string[]
    category: string
    subcategory: string
    thumbnail?: string
    description: string
    dateAdded: string
    duration?: string
    difficulty?: string
    videoId?: string
    pdfUrl?: string
  }
}

export default function ResourceDetailPage({ resource }: ResourceDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked)
  }

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return (
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
            className="h-4 w-4"
          >
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect width="15" height="14" x="1" y="5" rx="2" ry="2"></rect>
          </svg>
        )
      case "article":
        return (
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
            className="h-4 w-4"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        )
      case "book":
        return (
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
            className="h-4 w-4"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
        )
      case "course":
        return (
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
            className="h-4 w-4"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
        )
      default:
        return (
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
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="16"></line>
            <line x1="8" x2="16" y1="12" y2="12"></line>
          </svg>
        )
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/resources" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="secondary" className="flex items-center gap-1">
                {getTypeIcon(resource.type)}
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Badge>
              <Badge variant="outline">{resource.category}</Badge>
              <Badge variant="outline">{resource.subcategory}</Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div>Source: {resource.source}</div>
              <div>Author: {resource.author}</div>
              <div>Added: {resource.dateAdded}</div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <ResourceRating rating={resource.rating} ratingCount={resource.ratingCount} showText />
              <div className="flex gap-2">
                {resource.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Media Content - Video or PDF or Image */}
          <div className="rounded-lg overflow-hidden border">
            {resource.type === "video" && resource.videoId ? (
              <VideoPlayer videoId={resource.videoId} title={resource.title} />
            ) : resource.type === "book" && resource.pdfUrl ? (
              <PDFViewer pdfUrl={resource.pdfUrl} title={resource.title} />
            ) : (
              <div className="relative aspect-video">
                <Image
                  src={resource.thumbnail || "/placeholder.svg?height=400&width=700"}
                  alt={resource.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About this resource</h2>
            <p className="text-gray-700 leading-relaxed">{resource.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Difficulty</div>
                <div className="font-medium">{resource.difficulty}</div>
              </div>
              {resource.duration && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{resource.duration}</div>
                </div>
              )}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Category</div>
                <div className="font-medium">
                  {resource.category} / {resource.subcategory}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Resource Actions</h2>
            <div className="space-y-3">
              <Button className="w-full flex items-center justify-center gap-2" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Access Resource
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleBookmarkToggle}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4" />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </>
                )}
              </Button>
              {resource.type === "book" && resource.pdfUrl && (
                <Button variant="outline" className="w-full flex items-center justify-center gap-2" asChild>
                  <a href={resource.pdfUrl} download target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              )}
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Rate this resource</h2>
            <InteractiveRating size="lg" />
            <p className="text-sm text-gray-500">Click to rate this resource</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Found an issue?</h2>
            <p className="text-sm text-gray-600">
              If you found an issue with this resource or if the link is broken, please let us know.
            </p>
            <Button variant="outline" size="sm">
              Report Issue
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
        <RelatedResources category={resource.category} subcategory={resource.subcategory} currentId={resource.id} />
      </div>
    </div>
  )
}