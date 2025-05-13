"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { resourceApi } from "@/lib/api/resources"
import { Resource } from "@/types/resource"
import { Search, Loader2 } from "lucide-react"

export default function AdminResources() {
  const { toast } = useToast()
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type_id: "",
    about: "",
    source: "",
    rating: "",
    ratingCount: "",
    category_id: "",
    thumbnail: "",
    difficulty_id: "",
    link: ""
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      setIsLoading(true)
      const data = await resourceApi.getResources()
      setResources(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await resourceApi.createResource({
        ...formData,
        type_id: Number(formData.type_id),
        rating: Number(formData.rating),
        ratingCount: Number(formData.ratingCount),
        category_id: Number(formData.category_id),
        difficulty_id: Number(formData.difficulty_id)
      })
      
      toast({
        title: "Success",
        description: "Resource created successfully"
      })
      
      // Reset form
      setFormData({
        title: "",
        type_id: "",
        about: "",
        source: "",
        rating: "",
        ratingCount: "",
        category_id: "",
        thumbnail: "",
        difficulty_id: "",
        link: ""
      })
      
      // Refresh resources list
      fetchResources()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create resource",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true)
      await resourceApi.deleteResource(id)
      toast({
        title: "Success",
        description: "Resource deleted successfully"
      })
      fetchResources()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
      setResourceToDelete(null)
    }
  }

  const openDeleteDialog = (resource: Resource) => {
    setResourceToDelete(resource)
    setIsDeleteDialogOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingResource) return

    try {
      setIsSubmitting(true)
      await resourceApi.updateResource(editingResource.id, {
        ...formData,
        type_id: Number(formData.type_id),
        rating: Number(formData.rating),
        ratingCount: Number(formData.ratingCount),
        category_id: Number(formData.category_id),
        difficulty_id: Number(formData.difficulty_id)
      })
      
      toast({
        title: "Success",
        description: "Resource updated successfully"
      })
      
      setIsEditDialogOpen(false)
      setEditingResource(null)
      fetchResources()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update resource",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEditDialog = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      type_id: resource.type_id.toString(),
      about: resource.about,
      source: resource.source,
      rating: resource.rating.toString(),
      ratingCount: resource.ratingCount.toString(),
      category_id: resource.category_id.toString(),
      thumbnail: resource.thumbnail || "",
      difficulty_id: resource.difficulty_id.toString(),
      link: resource.link
    })
    setIsEditDialogOpen(true)
  }

  // Filter resources based on search query
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get type name from type_id
  const getTypeName = (typeId: number) => {
    switch (typeId) {
      case 1: return "Video"
      case 2: return "Article"
      case 3: return "Course"
      case 4: return "Book"
      default: return "Unknown"
    }
  }

  // Get category name from category_id
  const getCategoryName = (categoryId: number) => {
    switch (categoryId) {
      case 1: return "Web Development"
      case 2: return "Mobile Development"
      case 3: return "Data Science"
      case 4: return "Design"
      default: return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type_id">Type</Label>
              <Select
                value={formData.type_id}
                onValueChange={(value) => setFormData({ ...formData, type_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Video</SelectItem>
                  <SelectItem value="2">Article</SelectItem>
                  <SelectItem value="3">Course</SelectItem>
                  <SelectItem value="4">Book</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id">Category</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Web Development</SelectItem>
                  <SelectItem value="2">Mobile Development</SelectItem>
                  <SelectItem value="3">Data Science</SelectItem>
                  <SelectItem value="4">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty_id">Difficulty</Label>
              <Select
                value={formData.difficulty_id}
                onValueChange={(value) => setFormData({ ...formData, difficulty_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Beginner</SelectItem>
                  <SelectItem value="2">Intermediate</SelectItem>
                  <SelectItem value="3">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ratingCount">Rating Count</Label>
              <Input
                id="ratingCount"
                type="number"
                min="0"
                value={formData.ratingCount}
                onChange={(e) => setFormData({ ...formData, ratingCount: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Resource...
              </>
            ) : (
              "Create Resource"
            )}
          </Button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">Manage Resources</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Source</th>
                <th className="text-left p-2">Rating</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                      <span className="ml-2">Loading resources...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredResources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    {searchQuery ? "No resources found matching your search" : "No resources available"}
                  </td>
                </tr>
              ) : (
                filteredResources.map((resource) => (
                  <tr key={resource.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{resource.title}</td>
                    <td className="p-2">
                      <Badge variant="secondary">
                        {getTypeName(resource.type_id)}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">
                        {getCategoryName(resource.category_id)}
                      </Badge>
                    </td>
                    <td className="p-2 text-gray-600">{resource.source}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{resource.rating.toFixed(1)}</span>
                        <span className="text-gray-500">({resource.ratingCount})</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(resource)}
                          disabled={isLoading}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDeleteDialog(resource)}
                          disabled={isLoading}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resource</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{resourceToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setResourceToDelete(null)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => resourceToDelete && handleDelete(resourceToDelete.id)}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
            <DialogDescription>
              Update the resource details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select
                  value={formData.type_id}
                  onValueChange={(value) => setFormData({ ...formData, type_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Video</SelectItem>
                    <SelectItem value="2">Article</SelectItem>
                    <SelectItem value="3">Course</SelectItem>
                    <SelectItem value="4">Book</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-source">Source</Label>
                <Input
                  id="edit-source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Web Development</SelectItem>
                    <SelectItem value="2">Mobile Development</SelectItem>
                    <SelectItem value="3">Data Science</SelectItem>
                    <SelectItem value="4">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty_id}
                  onValueChange={(value) => setFormData({ ...formData, difficulty_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Beginner</SelectItem>
                    <SelectItem value="2">Intermediate</SelectItem>
                    <SelectItem value="3">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-link">Link</Label>
                <Input
                  id="edit-link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
                <Input
                  id="edit-thumbnail"
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-rating">Rating</Label>
                <Input
                  id="edit-rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-ratingCount">Rating Count</Label>
                <Input
                  id="edit-ratingCount"
                  type="number"
                  min="0"
                  value={formData.ratingCount}
                  onChange={(e) => setFormData({ ...formData, ratingCount: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-about">About</Label>
              <Textarea
                id="edit-about"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false)
                  setEditingResource(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Resource"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
