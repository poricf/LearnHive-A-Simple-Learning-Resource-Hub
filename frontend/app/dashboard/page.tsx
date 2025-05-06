import { Suspense } from "react"
import ResourcesContent from "@/components/resources-content"
import ResourcesLoading from "@/components/resources-loading"

export default function DashboardPage() {
  return (
    <div className="container px-4 py-4 md:py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Resources</h1>
      <Suspense fallback={<ResourcesLoading />}>
        <ResourcesContent />
      </Suspense>
    </div>
  )
}
