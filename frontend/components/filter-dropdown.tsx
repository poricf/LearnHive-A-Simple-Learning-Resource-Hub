"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Filter } from "lucide-react"

interface FilterDropdownProps {
  onApplyFilters: (filters: any) => void
}

export default function FilterDropdown({ onApplyFilters }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [ratingFilter, setRatingFilter] = useState([0])
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["web-development"])
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    types: [] as string[],
    difficulty: [] as string[],
    rating: 0,
  })

  const handleAccordionChange = (value: string[]) => {
    setExpandedCategories(value)
  }

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }

      if (type === "categories") {
        if (newFilters.categories.includes(value)) {
          newFilters.categories = newFilters.categories.filter((item) => item !== value)
        } else {
          newFilters.categories.push(value)
        }
      } else if (type === "types") {
        if (newFilters.types.includes(value)) {
          newFilters.types = newFilters.types.filter((item) => item !== value)
        } else {
          newFilters.types.push(value)
        }
      } else if (type === "difficulty") {
        if (newFilters.difficulty.includes(value)) {
          newFilters.difficulty = newFilters.difficulty.filter((item) => item !== value)
        } else {
          newFilters.difficulty.push(value)
        }
      }

      return newFilters
    })
  }

  const handleRatingChange = (value: number[]) => {
    setRatingFilter(value)
    setSelectedFilters((prev) => ({
      ...prev,
      rating: value[0],
    }))
  }

  const handleApply = () => {
    onApplyFilters(selectedFilters)
    setIsOpen(false)
  }

  const handleReset = () => {
    setSelectedFilters({
      categories: [],
      types: [],
      difficulty: [],
      rating: 0,
    })
    setRatingFilter([0])
  }

  const getActiveFilterCount = () => {
    return (
      selectedFilters.categories.length +
      selectedFilters.types.length +
      selectedFilters.difficulty.length +
      (selectedFilters.rating > 0 ? 1 : 0)
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white border-gray-200 shadow-sm hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {getActiveFilterCount() > 0 && (
            <Badge className="ml-1 bg-blue-600 text-white">{getActiveFilterCount()}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[340px] p-0" align="start">
        <div className="p-4 max-h-[80vh] overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lg">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs font-medium text-gray-500 hover:text-blue-600"
            >
              Reset
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                Categories
                {selectedFilters.categories.length > 0 && (
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs font-normal bg-blue-50 text-blue-700 border-blue-100"
                  >
                    {selectedFilters.categories.length}
                  </Badge>
                )}
              </h4>
              <Accordion
                type="multiple"
                value={expandedCategories}
                onValueChange={handleAccordionChange}
                className="w-full"
              >
                <AccordionItem value="web-development" className="border-0 mb-1">
                  <AccordionTrigger className="text-sm py-2 px-3 rounded-lg hover:bg-gray-50 data-[state=open]:bg-blue-50/50 data-[state=open]:text-blue-700 hover:no-underline">
                    Web Development
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2">
                    <div className="pl-3 space-y-1.5">
                      <div className="flex items-center gap-2 group py-1 px-2 rounded-md hover:bg-gray-50">
                        <Checkbox
                          id="frontend"
                          className="text-blue-600 border-gray-300"
                          checked={selectedFilters.categories.includes("frontend")}
                          onCheckedChange={() => handleFilterChange("categories", "frontend")}
                        />
                        <Label
                          htmlFor="frontend"
                          className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900"
                        >
                          Frontend
                        </Label>
                      </div>
                      <div className="flex items-center gap-2 group py-1 px-2 rounded-md hover:bg-gray-50">
                        <Checkbox
                          id="backend"
                          className="text-blue-600 border-gray-300"
                          checked={selectedFilters.categories.includes("backend")}
                          onCheckedChange={() => handleFilterChange("categories", "backend")}
                        />
                        <Label
                          htmlFor="backend"
                          className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900"
                        >
                          Backend
                        </Label>
                      </div>
                      <div className="flex items-center gap-2 group py-1 px-2 rounded-md hover:bg-gray-50">
                        <Checkbox
                          id="react"
                          className="text-blue-600 border-gray-300"
                          checked={selectedFilters.categories.includes("react")}
                          onCheckedChange={() => handleFilterChange("categories", "react")}
                        />
                        <Label
                          htmlFor="react"
                          className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900"
                        >
                          React
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ai-ml" className="border-0 mb-1">
                  <AccordionTrigger className="text-sm py-2 px-3 rounded-lg hover:bg-gray-50 data-[state=open]:bg-blue-50/50 data-[state=open]:text-blue-700 hover:no-underline">
                    AI & Machine Learning
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2">
                    <div className="pl-3 space-y-1.5">
                      <div className="flex items-center gap-2 group py-1 px-2 rounded-md hover:bg-gray-50">
                        <Checkbox
                          id="machine-learning"
                          className="text-blue-600 border-gray-300"
                          checked={selectedFilters.categories.includes("machine-learning")}
                          onCheckedChange={() => handleFilterChange("categories", "machine-learning")}
                        />
                        <Label
                          htmlFor="machine-learning"
                          className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900"
                        >
                          Machine Learning
                        </Label>
                      </div>
                      <div className="flex items-center gap-2 group py-1 px-2 rounded-md hover:bg-gray-50">
                        <Checkbox
                          id="deep-learning"
                          className="text-blue-600 border-gray-300"
                          checked={selectedFilters.categories.includes("deep-learning")}
                          onCheckedChange={() => handleFilterChange("categories", "deep-learning")}
                        />
                        <Label
                          htmlFor="deep-learning"
                          className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900"
                        >
                          Deep Learning
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                Resource Type
                {selectedFilters.types.length > 0 && (
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs font-normal bg-blue-50 text-blue-700 border-blue-100"
                  >
                    {selectedFilters.types.length}
                  </Badge>
                )}
              </h4>
              <div className="space-y-1.5 pl-1">
                <div className="flex items-center gap-2 group py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id="videos"
                    className="text-blue-600 border-gray-300"
                    checked={selectedFilters.types.includes("videos")}
                    onCheckedChange={() => handleFilterChange("types", "videos")}
                  />
                  <Label htmlFor="videos" className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900">
                    Videos
                  </Label>
                </div>
                <div className="flex items-center gap-2 group py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id="articles"
                    className="text-blue-600 border-gray-300"
                    checked={selectedFilters.types.includes("articles")}
                    onCheckedChange={() => handleFilterChange("types", "articles")}
                  />
                  <Label htmlFor="articles" className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900">
                    Articles
                  </Label>
                </div>
                <div className="flex items-center gap-2 group py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id="books"
                    className="text-blue-600 border-gray-300"
                    checked={selectedFilters.types.includes("books")}
                    onCheckedChange={() => handleFilterChange("types", "books")}
                  />
                  <Label htmlFor="books" className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900">
                    Books & PDFs
                  </Label>
                </div>
                <div className="flex items-center gap-2 group py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id="courses"
                    className="text-blue-600 border-gray-300"
                    checked={selectedFilters.types.includes("courses")}
                    onCheckedChange={() => handleFilterChange("types", "courses")}
                  />
                  <Label htmlFor="courses" className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900">
                    Courses
                  </Label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                Difficulty Level
                {selectedFilters.difficulty.length > 0 && (
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs font-normal bg-blue-50 text-blue-700 border-blue-100"
                  >
                    {selectedFilters.difficulty.length}
                  </Badge>
                )}
              </h4>
              <div className="space-y-1.5 pl-1">
                <div className="flex items-center gap-2 group py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id="beginner"
                    className="text-blue-600 border-gray-300"
                    checked={selectedFilters.difficulty.includes("beginner")}
                    onCheckedChange={() => handleFilterChange("difficulty", "beginner")}
                  />
                  <Label htmlFor="beginner" className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900">
                    Beginner
                  </Label>
                </div>
                <div className="flex items-center gap-2 group py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id="intermediate"
                    className="text-blue-600 border-gray-300"
                    checked={selectedFilters.difficulty.includes("intermediate")}
                    onCheckedChange={() => handleFilterChange("difficulty", "intermediate")}
                  />
                  <Label
                    htmlFor="intermediate"
                    className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900"
                  >
                    Intermediate
                  </Label>
                </div>
                <div className="flex items-center gap-2 group py-1.5 px-2 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id="advanced"
                    className="text-blue-600 border-gray-300"
                    checked={selectedFilters.difficulty.includes("advanced")}
                    onCheckedChange={() => handleFilterChange("difficulty", "advanced")}
                  />
                  <Label htmlFor="advanced" className="text-sm cursor-pointer text-gray-600 group-hover:text-gray-900">
                    Advanced
                  </Label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Minimum Rating</h4>
              <Slider
                defaultValue={[0]}
                max={5}
                step={0.5}
                value={ratingFilter}
                onValueChange={handleRatingChange}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Any</span>
                <span>3.0+</span>
                <span>4.0+</span>
                <span>4.5+</span>
                <span>5.0</span>
              </div>
              <div className="mt-3 text-sm flex items-center">
                <div className="flex mr-2">
                  {[...Array(Math.floor(ratingFilter[0]))].map((_, i) => (
                    <svg
                      key={`star-${i}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400 h-4 w-4"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                  {ratingFilter[0] % 1 >= 0.5 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-600 font-medium">{ratingFilter[0]}+ stars</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t p-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
