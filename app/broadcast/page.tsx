"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Video, Users, Settings, Smartphone, Vibrate, Brain } from "lucide-react"
import LiveStreamPlayer from "@/components/live-stream-player"
import LovenseAppControl from "@/components/lovense-app-control"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function BroadcastPage() {
  const [isLive, setIsLive] = useState(false)
  const [streamTitle, setStreamTitle] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [showLovenseApp, setShowLovenseApp] = useState(false)
  const [isAppControlDialogOpen, setIsAppControlDialogOpen] = useState(false)

  const startStream = () => {
    if (!streamTitle || !category) {
      alert("Bitte fülle alle erforderlichen Felder aus")
      return
    }
    setIsLive(true)
  }

  const stopStream = () => {
    setIsLive(false)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="relative">
            <LiveStreamPlayer
              streamId="my-stream"
              username="Mein Stream"
              viewers={isLive ? 0 : 0}
              isLive={isLive}
              autoConnect={isLive}
            />
            {!isLive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-bold text-white mb-2">Stream starten</h2>
                  <p className="text-muted-foreground mb-4">
                    Fülle die Informationen rechts aus und klicke auf "Stream starten"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* App-Button unter dem Live-Video */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowLovenseApp(!showLovenseApp)}
            >
              <Vibrate className="h-4 w-4 text-pink-500" />
              {showLovenseApp ? "Lovense App ausblenden" : "Lovense App anzeigen"}
            </Button>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{isLive ? "0 Zuschauer" : "Offline"}</span>
            </div>
          </div>

          {/* Lovense App */}
          {showLovenseApp && <LovenseAppControl />}

          {isLive && (
            <Card>
              <CardHeader>
                <CardTitle>Stream-Chat</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Noch keine Chat-Nachrichten</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Input placeholder="Nachricht schreiben..." className="flex-1" />
                <Button>Senden</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="lg:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stream-Einstellungen</CardTitle>
              <CardDescription>Konfiguriere deinen Live-Stream</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Stream-Titel</Label>
                <Input
                  id="title"
                  placeholder="Gib deinem Stream einen Titel"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  disabled={isLive}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategorie</Label>
                <Select value={category} onValueChange={setCategory} disabled={isLive}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Wähle eine Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="women">Frauen</SelectItem>
                    <SelectItem value="men">Männer</SelectItem>
                    <SelectItem value="couples">Paare</SelectItem>
                    <SelectItem value="trans">Trans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (durch Kommas getrennt)</Label>
                <Input
                  id="tags"
                  placeholder="z.B. Blond, Tattoos, Fitness"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  disabled={isLive}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="mature">Ab 18 (Erwachseneninhalte)</Label>
                <Switch id="mature" defaultChecked disabled={isLive} />
              </div>
            </CardContent>
            <CardFooter>
              {!isLive ? (
                <Button onClick={startStream} className="w-full bg-rose-500 hover:bg-rose-600">
                  Stream starten
                </Button>
              ) : (
                <Button onClick={stopStream} variant="destructive" className="w-full">
                  Stream beenden
                </Button>
              )}
            </CardFooter>
          </Card>

          <Tabs defaultValue="settings">
            <TabsList className="w-full">
              <TabsTrigger value="settings" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Einstellungen
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex-1">
                <Smartphone className="h-4 w-4 mr-2" />
                Geräte
              </TabsTrigger>
            </TabsList>
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hd">HD-Qualität</Label>
                    <Switch id="hd" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoRecord">Automatisch aufzeichnen</Label>
                    <Switch id="autoRecord" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Stream-Benachrichtigungen</Label>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Stream-Beschreibung</Label>
                    <Textarea id="description" placeholder="Beschreibe deinen Stream (optional)" rows={4} />
                  </div>

                  {/* APP Control Button */}
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => setIsAppControlDialogOpen(true)}
                  >
                    <Brain className="h-4 w-4 text-purple-500" />
                    APP Control
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="devices" className="mt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="camera">Kamera</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="camera">
                        <SelectValue placeholder="Wähle eine Kamera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Standard-Webcam</SelectItem>
                        <SelectItem value="external">Externe Kamera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="microphone">Mikrofon</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="microphone">
                        <SelectValue placeholder="Wähle ein Mikrofon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Standard-Mikrofon</SelectItem>
                        <SelectItem value="headset">Headset-Mikrofon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="output">Audioausgabe</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="output">
                        <SelectValue placeholder="Wähle eine Audioausgabe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Standard-Lautsprecher</SelectItem>
                        <SelectItem value="headphones">Kopfhörer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* APP Control Dialog */}
      <Dialog open={isAppControlDialogOpen} onOpenChange={setIsAppControlDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Lovense KI-Steuerung
            </DialogTitle>
            <DialogDescription>Konfiguriere die KI-gesteuerte Interaktion mit deinem Lovense-Gerät</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-purple-50 dark:bg-purple-900/20">
              <h3 className="font-medium mb-2">Lovense KI-Integration</h3>
              <p className="text-sm mb-4">
                Die Lovense KI-Integration ermöglicht eine automatisierte Steuerung deines Lovense-Geräts basierend auf
                Chat-Nachrichten, Trinkgeldern und KI-Analyse.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-sm">Automatisierte KI-Steuerung von Lovense über Live-Interaktionen.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-sm">Nahtlose API-Integration für Webcam-Performer.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-sm">Benutzerdefinierte Einstellungen für Streamer (z. B. Mindest-Tokens).</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-sm">Erweiterbar für verschiedene Lovense-Befehle (Rotieren, Stoßen, etc.).</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p className="text-sm">
                    Reaktionsfähig & Skalierbar – Unterstützung für mehrere Geräte gleichzeitig.
                  </p>
                </div>
              </div>
            </div>

            <LovenseAppControl />
          </div>

          <DialogFooter>
            <Button onClick={() => setIsAppControlDialogOpen(false)}>Schließen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

