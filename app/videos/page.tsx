"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, ChevronUp, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"

// Mock-Daten für Videos
const videoData = [
  {
    id: 1,
    username: "julia_hot",
    displayName: "Julia",
    avatar: "/placeholder.svg?height=40&width=40",
    videoUrl: "/placeholder.svg?height=600&width=400&text=Video+1",
    likes: 1245,
    comments: 89,
    description: "Schaut vorbei bei meinem nächsten Livestream! 🔥 #hot #live",
    tags: ["hot", "blonde", "live"],
  },
  {
    id: 2,
    username: "max_seductive",
    displayName: "Max",
    avatar: "/placeholder.svg?height=40&width=40",
    videoUrl: "/placeholder.svg?height=600&width=400&text=Video+2",
    likes: 876,
    comments: 45,
    description: "Heute Abend bin ich live für euch da! 💪 #fitness #male",
    tags: ["fitness", "male", "muscular"],
  },
  {
    id: 3,
    username: "sexy_couple",
    displayName: "Sexy Couple",
    avatar: "/placeholder.svg?height=40&width=40",
    videoUrl: "/placeholder.svg?height=600&width=400&text=Video+3",
    likes: 2134,
    comments: 156,
    description: "Gemeinsam sind wir unschlagbar! Kommt vorbei 💕 #couple #fun",
    tags: ["couple", "fun", "together"],
  },
  {
    id: 4,
    username: "trans_beauty",
    displayName: "Bella",
    avatar: "/placeholder.svg?height=40&width=40",
    videoUrl: "/placeholder.svg?height=600&width=400&text=Video+4",
    likes: 987,
    comments: 67,
    description: "Neue Show heute Abend! Nicht verpassen 💄 #trans #beauty",
    tags: ["trans", "beauty", "show"],
  },
  {
    id: 5,
    username: "fitness_girl",
    displayName: "Fitness Girl",
    avatar: "/placeholder.svg?height=40&width=40",
    videoUrl: "/placeholder.svg?height=600&width=400&text=Video+5",
    likes: 1567,
    comments: 103,
    description: "Workout und mehr in meinem Stream! 💪 #fitness #girl",
    tags: ["fitness", "girl", "workout"],
  },
]

export default function VideosPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({})
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  const currentVideo = videoData[currentVideoIndex]

  const handleNextVideo = () => {
    if (currentVideoIndex < videoData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
    }
  }

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1)
    }
  }

  const toggleLike = (videoId: number) => {
    setIsLiked((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }))
  }

  // Scroll-Handler für automatischen Wechsel
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling || !videoContainerRef.current) return

      setIsScrolling(true)
      setTimeout(() => setIsScrolling(false), 500)

      const scrollPosition = videoContainerRef.current.scrollTop
      const videoHeight = videoContainerRef.current.clientHeight

      const newIndex = Math.round(scrollPosition / videoHeight)
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videoData.length) {
        setCurrentVideoIndex(newIndex)
      }
    }

    const container = videoContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [currentVideoIndex, isScrolling])

  // Scroll zum aktuellen Video, wenn sich der Index ändert
  useEffect(() => {
    if (videoContainerRef.current && !isScrolling) {
      videoContainerRef.current.scrollTo({
        top: currentVideoIndex * videoContainerRef.current.clientHeight,
        behavior: "smooth",
      })
    }
  }, [currentVideoIndex, isScrolling])

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="container py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Kurzvideos</h1>
          <Button asChild>
            <Link href="/videos/upload">
              <Plus className="h-4 w-4 mr-2" />
              Video erstellen
            </Link>
          </Button>
        </div>
      </div>

      <div ref={videoContainerRef} className="flex-1 overflow-y-auto snap-y snap-mandatory">
        {videoData.map((video, index) => (
          <div key={video.id} className="h-full w-full snap-start flex flex-col md:flex-row">
            <div className="relative flex-1 bg-black flex items-center justify-center">
              <img
                src={video.videoUrl || "/placeholder.svg"}
                alt={`Video von ${video.username}`}
                className="max-h-full max-w-full object-contain"
              />

              {/* Navigation Controls */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/30 text-white border-0 hover:bg-black/50"
                  onClick={handlePrevVideo}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-6 w-6" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-black/30 text-white border-0 hover:bg-black/50"
                  onClick={handleNextVideo}
                  disabled={index === videoData.length - 1}
                >
                  <ChevronDown className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <Card className="w-full md:w-96 h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={video.avatar} alt={video.username} />
                    <AvatarFallback>{video.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{video.displayName}</h3>
                    <p className="text-sm text-muted-foreground">@{video.username}</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Folgen
                  </Button>
                </div>

                <p className="mb-4">{video.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isLiked[video.id] ? "text-rose-500" : ""}
                    onClick={() => toggleLike(video.id)}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {video.likes + (isLiked[video.id] ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {video.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Teilen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

