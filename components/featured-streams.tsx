import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const featuredStreams = [
  {
    id: 1,
    title: "Heiße Freitag Nacht Show",
    username: "julia_hot",
    category: "Frauen",
    tags: ["Blond", "Lovesense"],
    viewers: 1245,
    thumbnail: "/placeholder.svg?height=200&width=350",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Entspannter Solo Stream",
    username: "max_seductive",
    category: "Männer",
    tags: ["Brown", "Strip"],
    viewers: 876,
    thumbnail: "/placeholder.svg?height=200&width=350",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Paar-Show mit Überraschungen",
    username: "hot_couple",
    category: "Paare",
    tags: ["Dildo", "Vibrator"],
    viewers: 1543,
    thumbnail: "/placeholder.svg?height=200&width=350",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Verführerische Trans Show",
    username: "sexy_trans",
    category: "Trans",
    tags: ["Squirt", "Just Fingers"],
    viewers: 921,
    thumbnail: "/placeholder.svg?height=200&width=350",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function FeaturedStreams() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {featuredStreams.map((stream) => (
        <Link href={`/stream/${stream.id}`} key={stream.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={stream.thumbnail || "/placeholder.svg"}
                alt={stream.title}
                className="w-full aspect-video object-cover"
              />
              <Badge className="absolute bottom-2 right-2 bg-red-500">LIVE</Badge>
              <Badge variant="outline" className="absolute bottom-2 left-2 bg-black/70 text-white border-0">
                {stream.viewers} Zuschauer
              </Badge>
            </div>
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={stream.avatar} alt={stream.username} />
                  <AvatarFallback>{stream.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                  <p className="text-sm text-muted-foreground">{stream.username}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs py-0 h-5">
                      {stream.category}
                    </Badge>
                    {stream.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs py-0 h-5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

