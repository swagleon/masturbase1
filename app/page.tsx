"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MiniLogo from "@/components/mini-logo"
import { Crown, Ticket } from "lucide-react"

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
    timestamp: Date.now(),
  }
})

// Total number of pages (mock data)
const totalPages = 1429 // 100,000 streams / 70 per page ≈ 1429 pages

export default function Home() {
  const [streams, setStreams] = useState(liveStreams)

  // Aktualisiere die Thumbnails alle 30 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setStreams((prevStreams) =>
        prevStreams.map((stream) => ({
          ...stream,
          timestamp: Date.now(), // Aktualisiere den Timestamp, um ein neues Bild zu erzwingen
        })),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Funktion zum Öffnen eines neuen Fensters für den Stream
  const openStreamWindow = (streamId: number) => {
    window.open(`/stream/${streamId}`, `stream_${streamId}`, "width=1200,height=800")
    return false // Verhindert die normale Navigation
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/80 to-sky-500/80 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center text-center text-white p-10 md:p-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-script">Erwachsenen-Unterhaltung Live</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Verbinde dich mit Models, genieße private Shows und erlebe intime Unterhaltung in Echtzeit
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-sky-400 hover:bg-sky-500">
                <Link href="/explore">Entdecken</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="/register">Jetzt Registrieren</Link>
              </Button>
            </div>
          </div>
          <div className="w-full h-[500px] bg-gradient-to-b from-gray-900 to-black" />
        </div>
      </section>

      {/* Premium Banner */}
      <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-yellow-600/20 via-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-bold">Werde jetzt Premium Mitglied</h3>
              <p className="text-sm">Erhalte exklusiven Zugang zu SexPartys/Events von Mitgliedern in deiner Stadt</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="transform rotate-3 bg-gradient-to-r from-yellow-600 to-yellow-400 p-3 rounded-lg border-2 border-yellow-300 shadow-lg">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-white" />
                <span className="text-white font-bold">250 Tokens jeden Monat geschenkt!</span>
              </div>
            </div>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Link href="/premium">Nur 19,90€ mtl.</Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <Tabs defaultValue="frauen">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Live Streams</h2>
            <TabsList>
              <TabsTrigger value="frauen">Frauen</TabsTrigger>
              <TabsTrigger value="maenner">Männer</TabsTrigger>
              <TabsTrigger value="paare">Paare</TabsTrigger>
              <TabsTrigger value="trans">Trans</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frauen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {streams
                .filter((stream) => stream.category === "Frauen")
                .slice(0, 70)
                .map((stream) => (
                  <Card
                    key={stream.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openStreamWindow(stream.id)}
                  >
                    <div className="relative">
                      <img
                        src={`${stream.thumbnail}?t=${stream.timestamp}`} // Füge Timestamp hinzu, um Caching zu verhindern
                        alt={stream.title}
                        className="w-full aspect-video object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-500">LIVE</Badge>
                      {/* Logo oben rechts im Stream-Thumbnail */}
                      <div className="absolute top-2 right-12">
                        <MiniLogo />
                      </div>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="maenner">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {streams
                .filter((stream) => stream.category === "Männer")
                .slice(0, 70)
                .map((stream) => (
                  <Card
                    key={stream.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openStreamWindow(stream.id)}
                  >
                    <div className="relative">
                      <img
                        src={`${stream.thumbnail}?t=${stream.timestamp}`}
                        alt={stream.title}
                        className="w-full aspect-video object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-500">LIVE</Badge>
                      {/* Logo oben rechts im Stream-Thumbnail */}
                      <div className="absolute top-2 right-12">
                        <MiniLogo />
                      </div>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="paare">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {streams
                .filter((stream) => stream.category === "Paare")
                .slice(0, 70)
                .map((stream) => (
                  <Card
                    key={stream.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openStreamWindow(stream.id)}
                  >
                    <div className="relative">
                      <img
                        src={`${stream.thumbnail}?t=${stream.timestamp}`}
                        alt={stream.title}
                        className="w-full aspect-video object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-500">LIVE</Badge>
                      {/* Logo oben rechts im Stream-Thumbnail */}
                      <div className="absolute top-2 right-12">
                        <MiniLogo />
                      </div>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="trans">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {streams
                .filter((stream) => stream.category === "Trans")
                .slice(0, 70)
                .map((stream) => (
                  <Card
                    key={stream.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openStreamWindow(stream.id)}
                  >
                    <div className="relative">
                      <img
                        src={`${stream.thumbnail}?t=${stream.timestamp}`}
                        alt={stream.title}
                        className="w-full aspect-video object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-500">LIVE</Badge>
                      {/* Logo oben rechts im Stream-Thumbnail */}
                      <div className="absolute top-2 right-12">
                        <MiniLogo />
                      </div>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
            <Button variant="outline" size="sm" className="bg-sky-400 text-white hover:bg-sky-500">
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
      </section>
    </div>
  )
}

