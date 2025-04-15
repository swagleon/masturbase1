"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, Share2, Gift, DollarSign, Flag } from "lucide-react"
import LiveStreamPlayer from "@/components/live-stream-player"
import TokenPurchaseModal from "@/components/token-purchase-modal"
import { tokenService } from "@/lib/token-service"

export default function StreamPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [isFollowing, setIsFollowing] = useState(false)
  const [tipAmount, setTipAmount] = useState("10")
  const [canSendTip, setCanSendTip] = useState(true)
  const [hasEnoughTokens, setHasEnoughTokens] = useState(true)
  const [tipSent, setTipSent] = useState(false)
  const [isSendingTip, setIsSendingTip] = useState(false)

  // Mock data for the stream
  const stream = {
    id: params.id,
    title: "Heiße Freitag Nacht Show",
    description:
      "Willkommen zu meiner heißen Show! Heute erfülle ich eure Wünsche und wir haben viel Spaß zusammen. Trinkgelder werden mit speziellen Aktionen belohnt!",
    username: "julia_hot",
    avatar: "/placeholder.svg?height=40&width=40",
    viewers: 1245,
    followers: 45600,
    category: "Frauen",
    tags: ["Blond", "Lovesense", "Dildo"],
    isLive: true,
    country: "Deutschland",
    age: 24,
    language: "Deutsch",
  }

  // Mock chat messages
  const chatMessages = [
    {
      id: 1,
      username: "max_viewer",
      message: "Du siehst heute fantastisch aus!",
      time: "19:30",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    {
      id: 2,
      username: "sarah123",
      message: "Ich habe 50 Tokens gesendet 💖",
      time: "19:31",
      avatar: "/placeholder.svg?height=30&width=30",
      tip: 50,
    },
    {
      id: 3,
      username: "tom_fan",
      message: "Kannst du dich umdrehen?",
      time: "19:32",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    {
      id: 4,
      username: "lisa_viewer",
      message: "Die Show ist super!",
      time: "19:33",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    {
      id: 5,
      username: "john_doe",
      message: "Hier sind 100 Tokens für dich! 🔥",
      time: "19:34",
      avatar: "/placeholder.svg?height=30&width=30",
      tip: 100,
    },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Here you would normally send the message to your backend
      setMessage("")
    }
  }

  const handleSendTip = () => {
    const tipAmountNum = Number.parseInt(tipAmount, 10)
    if (isNaN(tipAmountNum) || tipAmountNum <= 0) return

    setHasEnoughTokens(tokenService.hasTokens(tipAmountNum))

    if (canSendTip && !isSendingTip) {
      setIsSendingTip(true)
      if (hasEnoughTokens) {
        tokenService.useTokens(tipAmountNum)
        setTipSent(true)
        alert(`Trinkgeld von ${tipAmount} Tokens gesendet!`)
      } else {
        alert("Nicht genügend Tokens! Kaufe mehr Tokens, um Trinkgeld zu geben.")
      }
      setIsSendingTip(false)
    } else {
      alert("Warte kurz, bevor du ein weiteres Trinkgeld sendest.")
    }
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <LiveStreamPlayer
            streamId={params.id}
            username={stream.username}
            viewers={stream.viewers}
            isLive={stream.isLive}
            autoConnect={false}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={stream.avatar} alt={stream.username} />
                <AvatarFallback>{stream.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{stream.title}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{stream.username}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{stream.followers.toLocaleString()} Follower</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs py-0 h-5 flex items-center gap-1">
                    <Flag className="h-3 w-3" />
                    {stream.country}
                  </Badge>
                  <Badge variant="outline" className="text-xs py-0 h-5">
                    {stream.age} Jahre
                  </Badge>
                  <Badge variant="outline" className="text-xs py-0 h-5">
                    {stream.language}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isFollowing ? "outline" : "default"}
                className={isFollowing ? "" : "bg-orange-500 hover:bg-orange-600"}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Entfolgen" : "Folgen"}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">Über</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="photos">Fotos</TabsTrigger>
              <TabsTrigger value="schedule">Zeitplan</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Beschreibung</h2>
                <p className="text-muted-foreground">{stream.description}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Kategorie & Tags</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{stream.category}</Badge>
                  {stream.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Trinkgeld-Menü</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Button variant="outline" className="flex flex-col h-auto py-2">
                    <span className="text-lg font-bold">2</span>
                    <span className="text-xs">Kuss</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-2">
                    <span className="text-lg font-bold">5</span>
                    <span className="text-xs">Ausziehen</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-2">
                    <span className="text-lg font-bold">10</span>
                    <span className="text-xs">Toy Control</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-2">
                    <span className="text-lg font-bold">20</span>
                    <span className="text-xs">Nahaufnahme</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-2">
                    <span className="text-lg font-bold">50</span>
                    <span className="text-xs">Privat Show (5min)</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-2">
                    <span className="text-lg font-bold">100</span>
                    <span className="text-xs">Spezial Wunsch</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="videos">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <Card>
                  <div className="aspect-video bg-muted relative">
                    <img
                      src="/placeholder.svg?height=200&width=350"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">12:34</div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium">Highlights vom letzten Stream</h3>
                    <p className="text-xs text-muted-foreground">Vor 2 Tagen • 1.2K Aufrufe</p>
                  </CardContent>
                </Card>
                <Card>
                  <div className="aspect-video bg-muted relative">
                    <img
                      src="/placeholder.svg?height=200&width=350"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">8:45</div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium">Spezial Show für Fans</h3>
                    <p className="text-xs text-muted-foreground">Vor 5 Tagen • 3.4K Aufrufe</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="photos">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="aspect-square rounded-md overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=200&text=Foto+${i + 1}`}
                      alt={`Foto ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="schedule">
              <div className="py-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded text-center min-w-[60px]">
                    <div className="text-sm font-medium">MO</div>
                    <div className="text-lg font-bold">15</div>
                  </div>
                  <div>
                    <h3 className="font-medium">Montags-Show: Spielzeug-Special</h3>
                    <p className="text-sm text-muted-foreground">19:00 - 22:00 Uhr</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded text-center min-w-[60px]">
                    <div className="text-sm font-medium">MI</div>
                    <div className="text-lg font-bold">17</div>
                  </div>
                  <div>
                    <h3 className="font-medium">Mittwochs-Show: Wunscherfüllung</h3>
                    <p className="text-sm text-muted-foreground">20:00 - 22:30 Uhr</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded text-center min-w-[60px]">
                    <div className="text-sm font-medium">FR</div>
                    <div className="text-lg font-bold">19</div>
                  </div>
                  <div>
                    <h3 className="font-medium">Freitag Nacht Special</h3>
                    <p className="text-sm text-muted-foreground">21:00 - 00:00 Uhr</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card className="h-[calc(100vh-12rem)] flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <h2 className="font-medium">Live Chat</h2>
              </div>
              <Badge variant="outline" className="text-xs">
                {stream.viewers} Zuschauer
              </Badge>
            </div>
            <CardContent className="flex-1 overflow-y-auto p-3 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={msg.avatar} alt={msg.username} />
                    <AvatarFallback>{msg.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{msg.username}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm">
                      {msg.tip && <span className="text-rose-500 font-bold mr-1">[{msg.tip} Tokens]</span>}
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-3 border-t">
              <div className="flex gap-2 mb-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Gift className="h-4 w-4 mr-2" />
                  Geschenk
                </Button>
                <div className="flex flex-1">
                  <Input
                    type="number"
                    min="1"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button className="rounded-l-none bg-green-500 hover:bg-green-600" onClick={handleSendTip}>
                    <DollarSign className="h-4 w-4 mr-1" />
                    Tip
                  </Button>
                </div>
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Nachricht senden..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" className="bg-rose-500 hover:bg-rose-600">
                  Senden
                </Button>
              </form>
            </div>
          </Card>

          <TokenPurchaseModal />
        </div>
      </div>
    </div>
  )
}

