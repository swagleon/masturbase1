import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const tags = [
  { id: "brown", name: "Brown", count: 12500 },
  { id: "blond", name: "Blond", count: 15800 },
  { id: "squirt", name: "Squirt", count: 9300 },
  { id: "dildo", name: "Dildo", count: 18200 },
  { id: "just-fingers", name: "Just Fingers", count: 7600 },
  { id: "lovesense", name: "Lovesense", count: 14300 },
  { id: "vibrator", name: "Vibrator", count: 16700 },
  { id: "strip", name: "Strip", count: 21400 },
]

export default function PopularTags() {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link href={`/tag/${tag.id}`} key={tag.id}>
          <Badge variant="secondary" className="px-3 py-1.5 text-sm hover:bg-secondary/80 cursor-pointer">
            {tag.name}
            <span className="ml-2 text-xs text-muted-foreground">
              {new Intl.NumberFormat("de-DE", { notation: "compact" }).format(tag.count)}
            </span>
          </Badge>
        </Link>
      ))}
    </div>
  )
}

