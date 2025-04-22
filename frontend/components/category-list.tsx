import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Web Development", icon: "🌐", count: 42 },
  { name: "Data Science", icon: "📊", count: 38 },
  { name: "Programming", icon: "💻", count: 56 },
  { name: "Computer Science", icon: "🖥️", count: 29 },
  { name: "Design", icon: "🎨", count: 24 },
  { name: "Mathematics", icon: "🔢", count: 18 },
  { name: "Science", icon: "🔬", count: 22 },
  { name: "Languages", icon: "🗣️", count: 15 },
]

export default function CategoryList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link href={`/browse?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`} key={category.name}>
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">{category.icon}</span>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} resources</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
