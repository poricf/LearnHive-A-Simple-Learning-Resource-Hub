import ResourceDetailPage from "@/components/resource-detail-page"

export default function ResourceDetail({ params }: { params: { id: string } }) {
  // This would be fetched from a database in a real application
  const resource = {
    id: params.id,
    title: "Complete React Developer in 2023",
    type: "video",
    source: "YouTube",
    author: "ZTM Academy",
    url: "https://example.com/react-course",
    rating: 4.8,
    ratingCount: 1245,
    tags: ["Beginner", "Project-Based"],
    category: "Web Development",
    subcategory: "React",
    thumbnail: "/placeholder.svg?height=400&width=700",
    description:
      "This comprehensive React course will take you from beginner to advanced developer. You'll learn React, Redux, React Hooks, GraphQL, and more by building real-world projects. The course covers the latest React features and best practices for building modern, responsive web applications.",
    dateAdded: "2023-03-15",
    duration: "28 hours",
    difficulty: "Beginner to Intermediate",
    videoId: "dGcsHMXbSOA", // Example YouTube ID
  }

  return <ResourceDetailPage resource={resource} />
}
