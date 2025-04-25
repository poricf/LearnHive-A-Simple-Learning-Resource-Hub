"use client"

import { useState, useEffect } from "react"

interface VideoPlayerProps {
  videoId: string
  title: string
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Determine video platform and extract ID
  const getVideoEmbedUrl = (id: string) => {
    // YouTube format (most common)
    if (id.includes("youtube") || id.length === 11) {
      const cleanId = id.length === 11 ? id : id.split("v=")[1]?.split("&")[0] || id
      return `https://www.youtube.com/embed/${cleanId}`
    }
    // Vimeo format
    else if (id.includes("vimeo")) {
      const vimeoId = id.split("/").pop()
      return `https://player.vimeo.com/video/${vimeoId}`
    }
    // Direct URL (MP4)
    else if (id.includes("http") && (id.includes(".mp4") || id.includes("/video/"))) {
      return id
    }
    // Default to YouTube if format is unclear
    return `https://www.youtube.com/embed/${id}`
  }

  const embedUrl = getVideoEmbedUrl(videoId)
  const isDirectVideo = embedUrl.includes(".mp4") || embedUrl.endsWith(".mov") || embedUrl.endsWith(".webm")

  useEffect(() => {
    setIsLoading(true)
    setError(null)
  }, [videoId])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError("Failed to load video. Please try again later.")
  }

  return (
    <div className="w-full aspect-video bg-black relative rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-4">
            <p className="mb-2">{error}</p>
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Watch on original platform
            </a>
          </div>
        </div>
      )}

      {isDirectVideo ? (
        <video
          controls
          autoPlay={false}
          className="w-full h-full"
          onLoadedData={() => setIsLoading(false)}
          onError={handleIframeError}
        >
          <source src={embedUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      )}
    </div>
  )
}
