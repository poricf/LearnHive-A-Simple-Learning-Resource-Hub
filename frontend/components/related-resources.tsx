import ResourceCard from "@/components/resource-card"

interface RelatedResourcesProps {
  category: string
  subcategory: string
  currentId: string
}

export default function RelatedResources({ category, subcategory, currentId }: RelatedResourcesProps) {
  // This would be fetched from a database in a real application
  const relatedResources = [
    {
      id: "101",
      title: "React Hooks Explained",
      type: "video",
      source: "YouTube",
      rating: 4.7,
      ratingCount: 856,
      tags: ["Intermediate", "Tutorial"],
      category: "Web Development",
      subcategory: "React",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Intermediate",
    },
    {
      id: "102",
      title: "Building a Full-Stack React Application",
      type: "course",
      source: "Udemy",
      rating: 4.9,
      ratingCount: 1245,
      tags: ["Advanced", "Project-Based"],
      category: "Web Development",
      subcategory: "React",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Advanced",
    },
    {
      id: "103",
      title: "React Performance Optimization Techniques",
      type: "article",
      source: "Medium",
      rating: 4.6,
      ratingCount: 532,
      tags: ["Advanced", "Performance"],
      category: "Web Development",
      subcategory: "React",
      thumbnail: "/placeholder.svg?height=200&width=350",
      difficulty: "Advanced",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedResources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  )
}
