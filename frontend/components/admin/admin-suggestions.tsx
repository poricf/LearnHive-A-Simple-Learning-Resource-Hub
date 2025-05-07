"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSuggestions() {
  const { toast } = useToast()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null)

  // Sample suggestions data
  const [suggestions, setSuggestions] = useState([
    {
      id: "1",
      title: "Advanced TypeScript Techniques",
      url: "https://example.com/typescript-advanced",
      type: "Article",
      category: "Web Development",
      subcategory: "TypeScript",
      description:
        "A comprehensive guide to advanced TypeScript features including mapped types, conditional types, and more.",
      submitter: "john.doe@example.com",
      submittedDate: "2023-05-15",
      status: "pending",
    },
    {
      id: "2",
      title: "Docker for Beginners",
      url: "https://example.com/docker-beginners",
      type: "Video",
      category: "DevOps",
      subcategory: "Docker",
      description:
        "A beginner-friendly introduction to Docker containers and how to use them in your development workflow.",
      submitter: "jane.smith@example.com",
      submittedDate: "2023-05-14",
      status: "pending",
    },
    {
      id: "3",
      title: "Introduction to GraphQL",
      url: "https://example.com/graphql-intro",
      type: "Course",
      category: "Web Development",
      subcategory: "API",
      description:
        "Learn the basics of GraphQL and how it differs from REST APIs. Includes practical examples and exercises.",
      submitter: "alex.johnson@example.com",
      submittedDate: "2023-05-13",
      status: "pending",
    },
    {
      id: "4",
      title: "Machine Learning with PyTorch",
      url: "https://example.com/pytorch-ml",
      type: "Course",
      category: "AI & Machine Learning",
      subcategory: "PyTorch",
      description:
        "A comprehensive course on building machine learning models with PyTorch. Covers neural networks, CNNs, and RNNs.",
      submitter: "sarah.williams@example.com",
      submittedDate: "2023-05-12",
      status: "approved",
    },
    {
      id: "5",
      title: "CSS Grid Layout Mastery",
      url: "https://example.com/css-grid",
      type: "Tutorial",
      category: "Web Development",
      subcategory: "CSS",
      description:
        "Master CSS Grid Layout with this step-by-step tutorial. Learn how to create complex layouts with ease.",
      submitter: "mike.brown@example.com",
      submittedDate: "2023-05-11",
      status: "rejected",
    },
  ])

  const handleApproveSuggestion = (id: string) => {
    setSuggestions(
      suggestions.map((suggestion) => (suggestion.id === id ? { ...suggestion, status: "approved" } : suggestion)),
    )
    setIsViewDialogOpen(false)
    toast({
      title: "Suggestion approved",
      description: "The resource has been approved and added to the library.",
    })
  }

  const handleRejectSuggestion = (id: string) => {
    setSuggestions(
      suggestions.map((suggestion) => (suggestion.id === id ? { ...suggestion, status: "rejected" } : suggestion)),
    )
    setIsViewDialogOpen(false)
    toast({
      title: "Suggestion rejected",
      description: "The resource suggestion has been rejected.",
    })
  }

  const pendingSuggestions = suggestions.filter((suggestion) => suggestion.status === "pending")
  const approvedSuggestions = suggestions.filter((suggestion) => suggestion.status === "approved")
  const rejectedSuggestions = suggestions.filter((suggestion) => suggestion.status === "rejected")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">
            Pending <Badge className="ml-2">{pendingSuggestions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved <Badge className="ml-2">{approvedSuggestions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected <Badge className="ml-2">{rejectedSuggestions.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {pendingSuggestions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending suggestions</p>
              </div>
            ) : (
              pendingSuggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onView={() => {
                    setSelectedSuggestion(suggestion)
                    setIsViewDialogOpen(true)
                  }}
                  onApprove={() => handleApproveSuggestion(suggestion.id)}
                  onReject={() => handleRejectSuggestion(suggestion.id)}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {approvedSuggestions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No approved suggestions</p>
              </div>
            ) : (
              approvedSuggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onView={() => {
                    setSelectedSuggestion(suggestion)
                    setIsViewDialogOpen(true)
                  }}
                  showApproveReject={false}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {rejectedSuggestions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No rejected suggestions</p>
              </div>
            ) : (
              rejectedSuggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onView={() => {
                    setSelectedSuggestion(suggestion)
                    setIsViewDialogOpen(true)
                  }}
                  showApproveReject={false}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Suggestion Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Resource Suggestion</DialogTitle>
            <DialogDescription>Review the details of this resource suggestion.</DialogDescription>
          </DialogHeader>
          {selectedSuggestion && (
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Title</h3>
                  <p>{selectedSuggestion.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">URL</h3>
                  <a
                    href={selectedSuggestion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedSuggestion.url}
                  </a>
                </div>
                <div className="flex gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Type</h3>
                    <p>{selectedSuggestion.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Category</h3>
                    <p>
                      {selectedSuggestion.category} / {selectedSuggestion.subcategory}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p>{selectedSuggestion.description}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Submitted By</h3>
                    <p>{selectedSuggestion.submitter}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Submitted Date</h3>
                    <p>{selectedSuggestion.submittedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedSuggestion?.status === "pending" && (
              <>
                <Button variant="outline" onClick={() => handleRejectSuggestion(selectedSuggestion.id)}>
                  Reject
                </Button>
                <Button onClick={() => handleApproveSuggestion(selectedSuggestion.id)}>Approve</Button>
              </>
            )}
            {selectedSuggestion?.status !== "pending" && (
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface SuggestionCardProps {
  suggestion: {
    id: string
    title: string
    url: string
    type: string
    category: string
    subcategory: string
    description: string
    submitter: string
    submittedDate: string
    status: string
  }
  onView: () => void
  onApprove?: () => void
  onReject?: () => void
  showApproveReject?: boolean
}

function SuggestionCard({ suggestion, onView, onApprove, onReject, showApproveReject = true }: SuggestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{suggestion.title}</CardTitle>
            <CardDescription className="mt-1">
              <a
                href={suggestion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {suggestion.url}
              </a>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">{suggestion.type}</Badge>
            <Badge variant="outline">
              {suggestion.category} / {suggestion.subcategory}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{suggestion.description}</p>
        <div className="mt-4 text-xs text-gray-500">
          <p>Submitted by: {suggestion.submitter}</p>
          <p>Date: {suggestion.submittedDate}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onView}>
          View Details
        </Button>
        {showApproveReject && (
          <>
            <Button variant="outline" size="sm" onClick={onReject}>
              Reject
            </Button>
            <Button size="sm" onClick={onApprove}>
              Approve
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
