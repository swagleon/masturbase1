import { EventEmitter } from "events"

// Einfacher Signalisierungsservice (in einer echten Anwendung würde dies mit einem Server kommunizieren)
class SignalingChannel extends EventEmitter {
  private peers: Map<string, RTCPeerConnection> = new Map()
  private localStream: MediaStream | null = null
  private roomId: string | null = null

  constructor() {
    super()
    // In einer echten Anwendung würde hier die Verbindung zum Signalisierungsserver hergestellt
  }

  async joinRoom(roomId: string): Promise<void> {
    this.roomId = roomId
    console.log(`Joining room: ${roomId}`)
    // Hier würde in einer echten Anwendung die Raumverbindung hergestellt
    this.emit("roomJoined", roomId)
  }

  async leaveRoom(): Promise<void> {
    if (this.roomId) {
      console.log(`Leaving room: ${this.roomId}`)
      // Alle Peer-Verbindungen schließen
      this.peers.forEach((peer) => {
        peer.close()
      })
      this.peers.clear()
      this.roomId = null

      // Lokalen Stream stoppen
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => track.stop())
        this.localStream = null
      }

      this.emit("roomLeft")
    }
  }

  async startBroadcast(constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints)
      this.emit("localStream", this.localStream)
      return this.localStream
    } catch (error) {
      console.error("Error accessing media devices:", error)
      throw error
    }
  }

  async watchBroadcast(broadcasterId: string): Promise<void> {
    if (!this.roomId) {
      throw new Error("Must join a room before watching a broadcast")
    }

    // In einer echten Anwendung würde hier die Verbindung zum Broadcaster hergestellt
    console.log(`Watching broadcast: ${broadcasterId}`)

    // Simuliere einen eingehenden Stream nach 1 Sekunde
    setTimeout(() => {
      // In einer echten Anwendung würde hier der Stream des Broadcasters empfangen
      this.emit("remoteStream", {
        id: broadcasterId,
        // Simulierter Stream (in einer echten Anwendung wäre dies ein MediaStream)
        stream: null,
      })
    }, 1000)
  }

  getLocalStream(): MediaStream | null {
    return this.localStream
  }
}

// Singleton-Instanz
export const signalingService = new SignalingChannel()

