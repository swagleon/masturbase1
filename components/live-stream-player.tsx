"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Maximize, Minimize, Volume2, VolumeX, Users } from "lucide-react"
import { signalingService } from "@/lib/webrtc-service"
import Logo from "@/components/logo"

interface LiveStreamPlayerProps {
  streamId: string
  username: string
  viewers: number
  isLive?: boolean
  autoConnect?: boolean
}

export default function LiveStreamPlayer({
  streamId,
  username,
  viewers,
  isLive = true,
  autoConnect = false,
}: LiveStreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFullView, setIsFullView] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (autoConnect && isLive) {
      connectToStream()
    }

    return () => {
      // Cleanup
      if (isConnected) {
        disconnectFromStream()
      }
    }
  }, [autoConnect, isLive])

  const connectToStream = async () => {
    if (isConnected || isConnecting) return

    setIsConnecting(true)

    try {
      // In einer echten Anwendung würde hier die Verbindung zum Stream hergestellt
      await signalingService.joinRoom(streamId)
      await signalingService.watchBroadcast(streamId)

      // Event-Listener für eingehende Streams
      const handleRemoteStream = ({ id, stream }: { id: string; stream: MediaStream | null }) => {
        if (id === streamId && videoRef.current && stream) {
          videoRef.current.srcObject = stream
        }
      }

      signalingService.on("remoteStream", handleRemoteStream)

      setIsConnected(true)
      setIsConnecting(false)

      return () => {
        signalingService.off("remoteStream", handleRemoteStream)
      }
    } catch (error) {
      console.error("Error connecting to stream:", error)
      setIsConnecting(false)
    }
  }

  const disconnectFromStream = async () => {
    if (!isConnected) return

    try {
      await signalingService.leaveRoom()
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setIsConnected(false)
    } catch (error) {
      console.error("Error disconnecting from stream:", error)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const toggleView = () => {
    setIsFullView(!isFullView)
  }

  return (
    <div className={`relative video-container rounded-lg overflow-hidden ${isFullView ? "fixed inset-0 z-50" : ""}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        muted={isMuted}
        poster={`/placeholder.svg?height=400&width=600&text=${username}`}
      />

      {!isConnected && isLive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <Button onClick={connectToStream} disabled={isConnecting} className="bg-rose-500 hover:bg-rose-600">
            {isConnecting ? "Verbinde..." : "Stream starten"}
          </Button>
        </div>
      )}

      {/* Logo in der oberen rechten Ecke - halbierte Größe */}
      <div className="absolute top-2 right-2 transform scale-50 origin-top-right">
        <Logo />
      </div>

      {isLive && <Badge className="absolute top-4 left-4 bg-red-500">LIVE</Badge>}

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <Badge variant="outline" className="bg-black/70 text-white border-0">
          <Users className="h-3 w-3 mr-1" />
          {viewers}
        </Badge>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/70 text-white border-0 hover:bg-black/90"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/70 text-white border-0 hover:bg-black/90"
          onClick={toggleView}
        >
          {isFullView ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

