"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Bookmark, BookmarkCheck, Video, FileText, BookOpen } from "lucide-react"

interface ResourceCardProps {
  id: number;
  title: string;
  type: string;
  source: string;
  rating: number;
  ratingCount: number;
  tags?: string[];
  category: string;
  subcategory: string;
  thumbnail?: string;
  bookmarked?: boolean;
  difficulty?: string;
}

export default function ResourceCard({
  id,
  title,
  type,
  source,
  rating,
  ratingCount,
  tags,
  category,
  subcategory,
  thumbnail,
  bookmarked,
  difficulty,
}: ResourceCardProps) {
  const { toast } = useToast()
  const [isBookmarked, setIsBookmarked] = useState(Boolean(bookmarked))

  // Function to get the icon based on resource type
  const getTypeIcon = (type: string | undefined) => {
    switch ((type || '').toLowerCase()) {
      case "video":
        return <Video className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "book":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isBookmarked) {
      // Implement the remove bookmark logic here
      setIsBookmarked(false)
      toast({
        title: "Bookmark removed",
        description: "The resource has been removed from your bookmarks.",
      })
    } else {
      // Implement the add bookmark logic here
      setIsBookmarked(true)
      toast({
        title: "Bookmark added",
        description: "The resource has been added to your bookmarks.",
      })
    }
  }

  // Generate stars based on rating
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-yellow-400"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      )
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-yellow-400"
        >
          <defs>
            <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="url(#half-star-gradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>,
      )
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 text-gray-300"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      )
    }

    return stars
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-blue-200 group">
      <Link href={`/resources/${id}`} className="block h-full">
        <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
          {thumbnail ? (
            <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
          ) : (
            <div className="text-gray-400">
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
                className="h-10 w-10"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="flex items-center gap-1 bg-white/90">
              {getTypeIcon(type)}
              <span className="sr-only">{type}</span>
            </Badge>
          </div>
          <button
            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
            onClick={handleBookmarkToggle}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-blue-600" />
            ) : (
              <Bookmark className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium line-clamp-2 text-base">{title}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>{source}</span>
              <span className="text-gray-400">•</span>
              <span>
                {category} / {subcategory}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <div className="flex">{renderStars()}</div>
                <span className="text-sm text-gray-600">
                  {(rating || 0).toFixed(1)} ({ratingCount || 0})
                </span>
              </div>
              {difficulty && (
                <Badge variant="outline" className="text-xs font-normal">
                  {difficulty}
                </Badge>
              )}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50/50"
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
