"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Bookmark {
  id: number
  title: string
  url: string
  description: string
  created_at: string
}

export default function BookmarksPage() {
  const { token } = useAuth()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isServerError, setIsServerError] = useState(false)
  const router = useRouter()

  const fetchBookmarks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setIsServerError(false)

      const response = await fetch("http://localhost:8000/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login")
          return
        }
        throw new Error("Failed to fetch bookmarks")
      }

      const data = await response.json()
      setBookmarks(data)
    } catch (err) {
      // Check if it's a network error (server not available)
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setIsServerError(true)
        setError("Server is currently busy. Please try again in a few minutes.")
      } else {
        setError(err instanceof Error ? err.message : "An error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookmarks()
  }, [token, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant={isServerError ? "destructive" : "default"} className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{isServerError ? "Server Unavailable" : "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Unable to Load Bookmarks</CardTitle>
            <CardDescription>
              {isServerError 
                ? "Our servers are currently experiencing high traffic. Please try again in a few minutes."
                : "There was a problem loading your bookmarks."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button onClick={fetchBookmarks} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            {isServerError && (
              <Button variant="outline" onClick={() => router.push("/login")}>
                Log In Again
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Bookmarks Yet</CardTitle>
            <CardDescription>
              Start adding bookmarks to see them here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id}>
              <CardHeader>
                <CardTitle>{bookmark.title}</CardTitle>
                <CardDescription>{bookmark.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Resource
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
