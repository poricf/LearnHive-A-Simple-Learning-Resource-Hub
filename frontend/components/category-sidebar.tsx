import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export default function CategorySidebar() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="web-dev" />
            <Label htmlFor="web-dev" className="text-sm cursor-pointer">
              Web Development (42)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="data-science" />
            <Label htmlFor="data-science" className="text-sm cursor-pointer">
              Data Science (38)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="programming" />
            <Label htmlFor="programming" className="text-sm cursor-pointer">
              Programming (56)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="computer-science" />
            <Label htmlFor="computer-science" className="text-sm cursor-pointer">
              Computer Science (29)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="design" />
            <Label htmlFor="design" className="text-sm cursor-pointer">
              Design (24)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="mathematics" />
            <Label htmlFor="mathematics" className="text-sm cursor-pointer">
              Mathematics (18)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="science" />
            <Label htmlFor="science" className="text-sm cursor-pointer">
              Science (22)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="languages" />
            <Label htmlFor="languages" className="text-sm cursor-pointer">
              Languages (15)
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Resource Type</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="videos" />
            <Label htmlFor="videos" className="text-sm cursor-pointer">
              Videos
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="articles" />
            <Label htmlFor="articles" className="text-sm cursor-pointer">
              Articles
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="courses" />
            <Label htmlFor="courses" className="text-sm cursor-pointer">
              Courses
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="tutorials" />
            <Label htmlFor="tutorials" className="text-sm cursor-pointer">
              Tutorials
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="ebooks" />
            <Label htmlFor="ebooks" className="text-sm cursor-pointer">
              E-Books
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Difficulty Level</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="beginner" />
            <Label htmlFor="beginner" className="text-sm cursor-pointer">
              Beginner
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="intermediate" />
            <Label htmlFor="intermediate" className="text-sm cursor-pointer">
              Intermediate
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="advanced" />
            <Label htmlFor="advanced" className="text-sm cursor-pointer">
              Advanced
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Duration</h3>
        <Slider defaultValue={[30]} max={120} step={5} />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0 min</span>
          <span>60 min</span>
          <span>120+ min</span>
        </div>
      </div>
    </div>
  )
}
