"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Camera, Copy, Eye, Settings, Share2, Flag, Globe } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function GoLivePage() {
  const [isLive, setIsLive] = useState(false)
  const [streamTitle, setStreamTitle] = useState("Mein Stream")
  const [streamDescription, setStreamDescription] = useState("Willkommen zu meinem Stream! Viel Spaß!")
  const [category, setCategory] = useState("frauen")
  const [tags, setTags] = useState(["Blond", "Lovesense"])
  const [newTag, setNewTag] = useState("")
  const [country, setCountry] = useState("Deutschland")
  const [age, setAge] = useState("24")
  const [language, setLanguage] = useState("Deutsch")

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleGoLive = () => {
    setIsLive(true)
    // Here you would normally connect to your streaming service
  }

  const handleEndStream = () => {
    setIsLive(false)
    // Here you would normally disconnect from your streaming service
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Live gehen</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stream-Vorschau</CardTitle>
              <CardDescription>So sehen deine Zuschauer deinen Stream</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
                  {isLive ? (
                    <div className="text-white text-center">
                      <p className="text-lg">Live-Stream aktiv</p>
                      <p className="text-sm text-gray-400">Dein Stream ist jetzt live</p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <Camera className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                      <p className="text-lg">Kamera nicht aktiv</p>
                      <p className="text-sm text-gray-400">Starte deinen Stream, um live zu gehen</p>
                    </div>
                  )}
                </div>
                {isLive && <Badge className="absolute top-4 left-4 bg-red-500">LIVE</Badge>}
                {isLive && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <Badge variant="outline" className="bg-black/70 text-white border-0">
                      <Eye className="h-3 w-3 mr-1" />0 Zuschauer
                    </Badge>
                  </div>
                )}
                {isLive && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Badge variant="outline" className="bg-black/70 text-white border-0 flex items-center">
                      <Flag className="h-3 w-3 mr-1" />
                      {country}
                    </Badge>
                    <Badge variant="outline" className="bg-black/70 text-white border-0">
                      {age} Jahre
                    </Badge>
                    <Badge variant="outline" className="bg-black/70 text-white border-0 flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      {language}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isLive ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-medium">Live seit 00:00:00</span>
                  </div>
                  <Button variant="destructive" onClick={handleEndStream}>
                    Stream beenden
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" disabled>
                    <Settings className="h-4 w-4 mr-2" />
                    Kamera-Einstellungen
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600" onClick={handleGoLive}>
                    Live gehen
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stream-Informationen</CardTitle>
              <CardDescription>Füge Details zu deinem Stream hinzu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Stream-Titel</Label>
                <Input
                  id="title"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  placeholder="Gib deinem Stream einen Titel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={streamDescription}
                  onChange={(e) => setStreamDescription(e.target.value)}
                  placeholder="Beschreibe deinen Stream"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategorie</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Wähle eine Kategorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frauen">Frauen</SelectItem>
                      <SelectItem value="maenner">Männer</SelectItem>
                      <SelectItem value="paare">Paare</SelectItem>
                      <SelectItem value="trans">Trans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Land</Label>
                  <Select
                    defaultValue={country.toLowerCase()}
                    onValueChange={(val) => setCountry(val.charAt(0).toUpperCase() + val.slice(1))}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Wähle dein Land" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deutschland">Deutschland</SelectItem>
                      <SelectItem value="österreich">Österreich</SelectItem>
                      <SelectItem value="schweiz">Schweiz</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="frankreich">Frankreich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Sprache</Label>
                  <Select
                    defaultValue={language.toLowerCase()}
                    onValueChange={(val) => setLanguage(val.charAt(0).toUpperCase() + val.slice(1))}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Wähle deine Sprache" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deutsch">Deutsch</SelectItem>
                      <SelectItem value="englisch">Englisch</SelectItem>
                      <SelectItem value="spanisch">Spanisch</SelectItem>
                      <SelectItem value="französisch">Französisch</SelectItem>
                      <SelectItem value="italienisch">Italienisch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Alter</Label>
                <Input id="age" type="number" min="18" max="99" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <form onSubmit={handleAddTag} className="flex gap-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Füge Tags hinzu"
                  />
                  <Button type="submit">Hinzufügen</Button>
                </form>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stream-Einstellungen</CardTitle>
              <CardDescription>Konfiguriere deinen Stream</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="chat">Chat aktivieren</Label>
                  <p className="text-sm text-muted-foreground">Erlaube Zuschauern, im Chat zu schreiben</p>
                </div>
                <Switch id="chat" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="followers-only">Nur für Follower</Label>
                  <p className="text-sm text-muted-foreground">Nur Follower können im Chat schreiben</p>
                </div>
                <Switch id="followers-only" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Benachrichtigungen</Label>
                  <p className="text-sm text-muted-foreground">Benachrichtige Follower, wenn du live gehst</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="record">Stream aufzeichnen</Label>
                  <p className="text-sm text-muted-foreground">Speichere deinen Stream für später</p>
                </div>
                <Switch id="record" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="age-verification">Altersverifikation</Label>
                  <p className="text-sm text-muted-foreground">
                    Nur Zuschauer über 18 Jahre können deinen Stream sehen
                  </p>
                </div>
                <Switch id="age-verification" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stream-Informationen</CardTitle>
              <CardDescription>Technische Details für deinen Stream</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stream-key">Stream-Schlüssel</Label>
                <div className="flex">
                  <Input id="stream-key" type="password" value="••••••••••••••••" readOnly className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Teile deinen Stream-Schlüssel niemals mit anderen</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stream-url">Stream-URL</Label>
                <div className="flex">
                  <Input id="stream-url" value="rtmp://live.masturbase.com/app" readOnly className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Stream-Einstellungen</AlertTitle>
                <AlertDescription>
                  Verwende diese Einstellungen in deiner Streaming-Software (OBS, Streamlabs, etc.)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {isLive && (
            <Card>
              <CardHeader>
                <CardTitle>Teile deinen Stream</CardTitle>
                <CardDescription>Lass andere wissen, dass du live bist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="share-url">Stream-URL</Label>
                  <div className="flex">
                    <Input
                      id="share-url"
                      value="https://masturbase.com/julia_hot"
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

