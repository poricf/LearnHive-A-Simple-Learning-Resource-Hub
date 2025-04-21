import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description: string
    icon: string
    resourceCount: number
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/resources?category=${category.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:border-blue-200">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-xl font-medium">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{category.description}</p>
            <div className="mt-2 text-sm text-blue-600 font-medium">{category.resourceCount} resources</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
