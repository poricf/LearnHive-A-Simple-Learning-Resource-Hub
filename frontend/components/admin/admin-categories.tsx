"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { useToast } from "@/components/ui/use-toast"

export default function AdminCategories() {
  const { toast } = useToast()
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [isAddSubcategoryDialogOpen, setIsAddSubcategoryDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  // Sample categories data
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Web Development",
      subcategories: ["Frontend", "Backend", "JavaScript", "React", "Vue", "Angular", "Node.js"],
      resourceCount: 124,
    },
    {
      id: "2",
      name: "AI & Machine Learning",
      subcategories: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
      resourceCount: 98,
    },
    {
      id: "3",
      name: "Computer Science",
      subcategories: ["Algorithms", "Data Structures", "System Design", "Operating Systems"],
      resourceCount: 87,
    },
    {
      id: "4",
      name: "UI/UX Design",
      subcategories: ["UI Design", "UX Design", "Design Systems", "Figma", "Sketch"],
      resourceCount: 65,
    },
    {
      id: "5",
      name: "Mobile Development",
      subcategories: ["iOS", "Android", "React Native", "Flutter", "Swift", "Kotlin"],
      resourceCount: 76,
    },
    {
      id: "6",
      name: "Data Science",
      subcategories: ["Statistics", "Data Analysis", "Data Visualization", "Python", "R"],
      resourceCount: 82,
    },
  ])

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddCategoryDialogOpen(false)
    toast({
      title: "Category added",
      description: "The category has been added successfully.",
    })
  }

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddSubcategoryDialogOpen(false)
    toast({
      title: "Subcategory added",
      description: "The subcategory has been added successfully.",
    })
  }

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    toast({
      title: "Category updated",
      description: "The category has been updated successfully.",
    })
  }

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(categories.filter((category) => category.id !== selectedCategory.id))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully.",
      })
    }
  }

  const setSelectedResource = (category: any) => {
    setSelectedCategory(category)
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
          <Input placeholder="Search categories..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddSubcategoryDialogOpen} onOpenChange={setIsAddSubcategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add Subcategory</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Subcategory</DialogTitle>
                <DialogDescription>Enter the details for the new subcategory.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubcategory}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parent-category" className="text-right">
                      Category
                    </Label>
                    <select
                      id="parent-category"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subcategory-name" className="text-right">
                      Name
                    </Label>
                    <Input id="subcategory-name" className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddSubcategoryDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Subcategory</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Enter the details for the new category.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCategory}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-name" className="text-right">
                      Name
                    </Label>
                    <Input id="category-name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-icon" className="text-right">
                      Icon
                    </Label>
                    <Input id="category-icon" placeholder="Emoji or icon class" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Category</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subcategories</TableHead>
              <TableHead>Resources</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.map((subcategory, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      >
                        {subcategory}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{category.resourceCount}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog
                      open={isEditDialogOpen && selectedCategory?.id === category.id}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCategory(category)}>
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                          <DialogDescription>Update the category details.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditCategory}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-category-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-category-name"
                                className="col-span-3"
                                defaultValue={selectedCategory?.name}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-category-icon" className="text-right">
                                Icon
                              </Label>
                              <Input id="edit-category-icon" placeholder="Emoji or icon class" className="col-span-3" />
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
                      open={isDeleteDialogOpen && selectedCategory?.id === category.id}
                      onOpenChange={setIsDeleteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" onClick={() => setSelectedResource(category)}>
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Category</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this category? This action cannot be undone and will also
                            delete all associated subcategories.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteCategory}>
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
    </div>
  )
}
