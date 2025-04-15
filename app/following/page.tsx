import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock data for followed streams
const followedStreams = Array.from({ length: 12 }, (_, i) => {
  const isLive = i < 8 // First 8 are live
  const tags = ["Blond", "Squirt", "Dildo", "Lovesense", "Vibrator"]
  const randomTags = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () => tags[Math.floor(Math.random() * tags.length)],
  ).filter((v, i, a) => a.indexOf(v) === i)

  return {
    id: i + 1,
    username: `model_${i + 1}`,
    displayName: `Model ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40&text=M${i + 1}`,
    title: isLive ? `Heißer Stream ${i + 1}` : "",
    viewers: isLive ? Math.floor(Math.random() * 2000) + 100 : 0,
    thumbnail: isLive ? `/placeholder.svg?height=200&width=350&text=Stream+${i + 1}` : null,
    isLive: isLive,
    lastSeen: isLive
      ? "Jetzt Live"
      : ["Vor 2 Stunden", "Vor 1 Tag", "Vor 3 Tagen", "Letzte Woche"][Math.floor(Math.random() * 4)],
    tags: randomTags,
    country: ["Deutschland", "USA", "Frankreich", "Spanien"][Math.floor(Math.random() * 4)],
    age: Math.floor(Math.random() * 15) + 18, // Ages 18-32
  }
})

export default function FollowingPage() {
  const liveCount = followedStreams.filter((stream) => stream.isLive).length
  const totalCount = followedStreams.length

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Gefolgt</h1>
      <p className="text-muted-foreground mb-6">
        Du folgst {totalCount} Personen, davon sind {liveCount} gerade live
      </p>

      <Tabs defaultValue="live" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="live">Live ({liveCount})</TabsTrigger>
          <TabsTrigger value="all">Alle ({totalCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {followedStreams
              .filter((stream) => stream.isLive)
              .map((stream) => (
                <Link href={`/stream/${stream.id}`} key={stream.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={stream.thumbnail || "/placeholder.svg"}
                        alt={stream.title}
                        className="w-full aspect-video object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-500">LIVE</Badge>
                      <Badge variant="outline" className="absolute bottom-2 left-2 bg-black/70 text-white border-0">
                        {stream.viewers} Zuschauer
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={stream.avatar} alt={stream.username} />
                          <AvatarFallback>{stream.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                          <p className="text-sm text-muted-foreground">{stream.displayName}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {stream.country} • {stream.age}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1 mt-1">
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
        </TabsContent>

        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {followedStreams.map((stream) => (
              <Link href={`/stream/${stream.id}`} key={stream.id}>
                <Card
                  className={`overflow-hidden hover:shadow-md transition-shadow ${stream.isLive ? "border-rose-500/50" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={stream.avatar} alt={stream.username} />
                          <AvatarFallback>{stream.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {stream.isLive && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{stream.displayName}</h3>
                        <p className="text-xs text-muted-foreground">@{stream.username}</p>
                        <p className="text-xs mt-1">
                          {stream.isLive ? (
                            <span className="text-rose-500 font-medium">Jetzt Live</span>
                          ) : (
                            <span className="text-muted-foreground">{stream.lastSeen}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

