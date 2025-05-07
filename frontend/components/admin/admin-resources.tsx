"use client"

import type React from "react"

import { useState } from "react"
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

export default function AdminResources() {
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)

  // Sample resources data
  const [resources, setResources] = useState([
    {
      id: "1",
      title: "Complete React Developer in 2023",
      type: "video",
      category: "Web Development",
      subcategory: "React",
      rating: 4.8,
      status: "active",
    },
    {
      id: "2",
      title: "Machine Learning A-Z: Hands-On Python & R",
      type: "course",
      category: "AI & Machine Learning",
      subcategory: "Machine Learning",
      rating: 4.6,
      status: "active",
    },
    {
      id: "3",
      title: "Data Structures and Algorithms in JavaScript",
      type: "article",
      category: "Computer Science",
      subcategory: "Algorithms",
      rating: 4.5,
      status: "active",
    },
    {
      id: "4",
      title: "The Complete JavaScript Course 2023",
      type: "course",
      category: "Web Development",
      subcategory: "JavaScript",
      rating: 4.7,
      status: "active",
    },
    {
      id: "5",
      title: "Python for Data Science and Machine Learning",
      type: "video",
      category: "AI & Machine Learning",
      subcategory: "Python",
      rating: 4.9,
      status: "active",
    },
    {
      id: "6",
      title: "UI/UX Design Fundamentals",
      type: "article",
      category: "UI/UX Design",
      subcategory: "Fundamentals",
      rating: 4.3,
      status: "inactive",
    },
  ])

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddDialogOpen(false)
    toast({
      title: "Resource added",
      description: "The resource has been added successfully.",
    })
  }

  const handleEditResource = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    toast({
      title: "Resource updated",
      description: "The resource has been updated successfully.",
    })
  }

  const handleDeleteResource = () => {
    if (selectedResource) {
      setResources(resources.filter((resource) => resource.id !== selectedResource.id))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Resource deleted",
        description: "The resource has been deleted successfully.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
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
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <Input placeholder="Search resources..." className="pl-10" />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Resource</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Enter the details for the new resource.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddResource}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL
                  </Label>
                  <Input id="url" type="url" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select required>
                    <SelectTrigger id="type" className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="course">Course</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="ebook">E-Book</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select required>
                    <SelectTrigger id="category" className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subcategory" className="text-right">
                    Subcategory
                  </Label>
                  <Select required>
                    <SelectTrigger id="subcategory" className="col-span-3">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="node">Node.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="difficulty" className="text-right">
                    Difficulty
                  </Label>
                  <Select required>
                    <SelectTrigger id="difficulty" className="col-span-3">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Resource</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</Badge>
                </TableCell>
                <TableCell>
                  {resource.category} / {resource.subcategory}
                </TableCell>
                <TableCell>{resource.rating}</TableCell>
                <TableCell>
                  <Badge variant={resource.status === "active" ? "default" : "secondary"}>
                    {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog
                      open={isEditDialogOpen && selectedResource?.id === resource.id}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedResource(resource)}>
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>Edit Resource</DialogTitle>
                          <DialogDescription>Update the resource details.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditResource}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-title" className="text-right">
                                Title
                              </Label>
                              <Input
                                id="edit-title"
                                className="col-span-3"
                                defaultValue={selectedResource?.title}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-type" className="text-right">
                                Type
                              </Label>
                              <Select defaultValue={selectedResource?.type} required>
                                <SelectTrigger id="edit-type" className="col-span-3">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="article">Article</SelectItem>
                                  <SelectItem value="course">Course</SelectItem>
                                  <SelectItem value="tutorial">Tutorial</SelectItem>
                                  <SelectItem value="ebook">E-Book</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-status" className="text-right">
                                Status
                              </Label>
                              <Select defaultValue={selectedResource?.status} required>
                                <SelectTrigger id="edit-status" className="col-span-3">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isDeleteDialogOpen && selectedResource?.id === resource.id}
                      onOpenChange={setIsDeleteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" onClick={() => setSelectedResource(resource)}>
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Resource</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this resource? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteResource}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}
