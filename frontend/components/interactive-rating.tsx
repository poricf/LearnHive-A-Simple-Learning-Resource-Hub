"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface InteractiveRatingProps {
  initialRating?: number
  size?: "sm" | "md" | "lg"
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
}

export default function InteractiveRating({
  initialRating = 0,
  size = "md",
  onRatingChange,
  readOnly = false,
}: InteractiveRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)
  const { toast } = useToast()

  const handleSetRating = (value: number) => {
    if (readOnly) return

    setRating(value)

    if (onRatingChange) {
      onRatingChange(value)
    } else {
      toast({
        title: "Rating submitted",
        description: `You rated this resource ${value} stars.`,
      })
    }
  }

  const starSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${readOnly ? "cursor-default" : "cursor-pointer"} focus:outline-none`}
          onClick={() => handleSetRating(star)}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
          disabled={readOnly}
          aria-label={`Rate ${star} stars`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className={`${starSizes[size]} ${
              star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"
            } transition-colors`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  )
}
