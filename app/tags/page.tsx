import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for tags
const tagsList = [
  {
    id: "squirt",
    name: "squirt",
    liveUsers: 124,
    viewers: 15800,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "18",
    name: "18",
    liveUsers: 89,
    viewers: 12400,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "teen",
    name: "teen",
    liveUsers: 156,
    viewers: 18900,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "latina",
    name: "latina",
    liveUsers: 78,
    viewers: 9300,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "dildo",
    name: "dildo",
    liveUsers: 112,
    viewers: 13500,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "asian",
    name: "asian",
    liveUsers: 67,
    viewers: 8200,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "ebony",
    name: "ebony",
    liveUsers: 45,
    viewers: 5400,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "german",
    name: "german",
    liveUsers: 34,
    viewers: 4100,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "lovense",
    name: "lovense",
    liveUsers: 189,
    viewers: 22700,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "new",
    name: "new",
    liveUsers: 76,
    viewers: 9100,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "bigboobs",
    name: "bigboobs",
    liveUsers: 98,
    viewers: 11800,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "feet",
    name: "feet",
    liveUsers: 56,
    viewers: 6700,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "fuckmachine",
    name: "fuckmachine",
    liveUsers: 43,
    viewers: 5200,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "cum",
    name: "cum",
    liveUsers: 134,
    viewers: 16100,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
  {
    id: "dirtytalk",
    name: "dirtytalk",
    liveUsers: 87,
    viewers: 10400,
    screenshots: Array(10).fill("/placeholder.svg?height=100&width=180"),
  },
]

export default function TagsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Tags</h1>

      <div className="space-y-8">
        {tagsList.map((tag) => (
          <Card key={tag.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <Link href={`/tag/${tag.id}`}>
                    <h2 className="text-2xl font-bold mb-2 hover:text-rose-500 transition-colors">#{tag.name}</h2>
                  </Link>
                  <div className="flex flex-col gap-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{tag.liveUsers}</span> Live-User
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{tag.viewers.toLocaleString()}</span> Zuschauer
                    </p>
                  </div>
                  <Link href={`/tag/${tag.id}`}>
                    <Badge className="bg-rose-500 hover:bg-rose-600">Alle anzeigen</Badge>
                  </Link>
                </div>

                <div className="md:w-3/4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {tag.screenshots.map((screenshot, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={screenshot || "/placeholder.svg"}
                          alt={`${tag.name} preview ${index + 1}`}
                          className="w-full aspect-video object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Badge className="bg-rose-500">Live ansehen</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

