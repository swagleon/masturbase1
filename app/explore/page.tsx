import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import FilterSidebar from "@/components/filter-sidebar"

// Mock data for streams
const liveStreams = Array.from({ length: 70 }, (_, i) => {
  const categories = ["Frauen", "Männer", "Paare", "Trans"]
  const tags = ["Brown", "Blond", "Squirt", "Dildo", "Just Fingers", "Lovesense", "Vibrator", "Strip"]
  const countries = ["Deutschland", "USA", "Frankreich", "Spanien", "Italien", "Russland", "Japan", "Brasilien"]
  const ages = Array.from({ length: 15 }, (_, i) => i + 18) // Ages 18-32

  const randomTags = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () => tags[Math.floor(Math.random() * tags.length)],
  ).filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates

  return {
    id: i + 1,
    title: `Heißer Stream ${i + 1}`,
    username: `model_${i + 1}`,
    category: categories[i % 4],
    tags: randomTags,
    viewers: Math.floor(Math.random() * 5000) + 100,
    thumbnail: `/placeholder.svg?height=200&width=350&text=Stream+${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40&text=M${i + 1}`,
    country: countries[Math.floor(Math.random() * countries.length)],
    age: ages[Math.floor(Math.random() * ages.length)],
  }
})

export default function ExplorePage() {
  // Total number of pages (mock data)
  const totalPages = 1429 // 100,000 streams / 70 per page ≈ 1429 pages

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Entdecken</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="frauen" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="frauen">Frauen</TabsTrigger>
              <TabsTrigger value="maenner">Männer</TabsTrigger>
              <TabsTrigger value="paare">Paare</TabsTrigger>
              <TabsTrigger value="trans">Trans</TabsTrigger>
            </TabsList>

            <TabsContent value="frauen">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveStreams
                  .filter((stream) => stream.category === "Frauen")
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
                              <AvatarFallback>{stream.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                              <p className="text-sm text-muted-foreground">{stream.username}</p>
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

            <TabsContent value="maenner">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveStreams
                  .filter((stream) => stream.category === "Männer")
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
                              <AvatarFallback>{stream.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                              <p className="text-sm text-muted-foreground">{stream.username}</p>
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

            <TabsContent value="paare">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveStreams
                  .filter((stream) => stream.category === "Paare")
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
                              <AvatarFallback>{stream.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                              <p className="text-sm text-muted-foreground">{stream.username}</p>
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

            <TabsContent value="trans">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveStreams
                  .filter((stream) => stream.category === "Trans")
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
                              <AvatarFallback>{stream.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                              <p className="text-sm text-muted-foreground">{stream.username}</p>
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
          </Tabs>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="sm" className="bg-rose-500 text-white hover:bg-rose-600">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm">
                {totalPages}
              </Button>
              <Button variant="outline" size="sm">
                &gt;
              </Button>
            </div>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <FilterSidebar />
        </div>
      </div>
    </div>
  )
}

