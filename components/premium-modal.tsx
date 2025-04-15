"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Crown, MapPin, Clock, Users, Lock } from "lucide-react"
import { tokenService } from "@/lib/token-service"
import Link from "next/link"

interface PremiumModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PremiumModal({ open, onOpenChange }: PremiumModalProps) {
  const [activeTab, setActiveTab] = useState("events")
  const isPremium = tokenService.getMembershipType() === "Premium Mitglied"

  // Mock-Daten für Events
  const events = [
    {
      id: 1,
      title: "VIP Sexparty Berlin",
      date: "2025-04-15",
      time: "22:00",
      location: "Berlin, Privatclub",
      host: "julia_hot",
      hostAvatar: "/placeholder.svg?height=40&width=40",
      participants: 12,
      maxParticipants: 20,
      price: 500,
      description: "Exklusive VIP-Party nur für Premium-Mitglieder. Dresscode: Elegant oder nackt.",
    },
    {
      id: 2,
      title: "Erotische Massage Workshop",
      date: "2025-04-20",
      time: "19:00",
      location: "Hamburg, Wellness-Studio",
      host: "massage_master",
      hostAvatar: "/placeholder.svg?height=40&width=40",
      participants: 8,
      maxParticipants: 10,
      price: 300,
      description: "Lerne die Kunst der erotischen Massage in diesem exklusiven Workshop.",
    },
    {
      id: 3,
      title: "Live Cam Show Special",
      date: "2025-04-10",
      time: "21:00",
      location: "Online",
      host: "sexy_couple",
      hostAvatar: "/placeholder.svg?height=40&width=40",
      participants: 45,
      maxParticipants: 100,
      price: 100,
      description: "Exklusives Online-Event mit interaktiven Elementen für Premium-Mitglieder.",
    },
  ]

  // Mock-Daten für Geschenke
  const gifts = [
    { id: 1, name: "Leuchtende Katze", price: 10, icon: "🐱", animation: "glow" },
    { id: 2, name: "Regenbogen", price: 50, icon: "🌈", animation: "rainbow" },
    { id: 3, name: "Einhorn", price: 100, icon: "🦄", animation: "sparkle" },
    { id: 4, name: "Drink", price: 20, icon: "🍸", animation: "shake" },
    { id: 5, name: "Eis", price: 15, icon: "🍦", animation: "melt" },
    { id: 6, name: "Nackte Frau", price: 1000, icon: "👩", animation: "dance" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Premium Bereich
          </DialogTitle>
          <DialogDescription>Exklusive Inhalte und Events nur für Premium-Mitglieder</DialogDescription>
        </DialogHeader>

        {isPremium ? (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="events">Events & Partys</TabsTrigger>
                <TabsTrigger value="messages">Nachrichten</TabsTrigger>
                <TabsTrigger value="gifts">Geschenke</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Kommende Events</h3>
                  <Button size="sm">Event erstellen</Button>
                </div>

                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{event.title}</CardTitle>
                        <Badge className="bg-yellow-500">{event.price} Tokens</Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{event.time} Uhr</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{event.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={event.hostAvatar} alt={event.host} />
                          <AvatarFallback>{event.host.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          Veranstaltet von <span className="font-medium">{event.host}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">
                          {event.participants}/{event.maxParticipants} Teilnehmer
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Teilnehmen</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="messages" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Premium Nachrichten</h3>
                  <Button size="sm">Neue Nachricht</Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <p>
                      Als Premium-Mitglied kannst du private Nachrichten mit anderen Premium-Mitgliedern austauschen und
                      besondere Geschenke senden.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Button className="w-full">Posteingang</Button>
                      <Button className="w-full">Kontakte</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gifts" className="space-y-4 mt-4">
                <h3 className="text-lg font-semibold">Animations-Geschenke</h3>
                <p className="text-sm text-muted-foreground">Sende animierte Geschenke an andere Mitglieder im Chat</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                  {gifts.map((gift) => (
                    <Card key={gift.id} className="overflow-hidden">
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <div className="text-4xl mb-2">{gift.icon}</div>
                        <h4 className="font-medium text-center">{gift.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{gift.price} Tokens</p>
                        <Button size="sm" className="mt-2 w-full">
                          Senden
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-8 rounded-full">
              <Lock className="h-12 w-12 text-yellow-500" />
            </div>
            <div className="text-center space-y-2 max-w-md">
              <h3 className="text-xl font-bold">Upgrade auf Premium</h3>
              <p>
                Werde Premium-Mitglied, um Zugang zu exklusiven Events, privaten Nachrichten und besonderen Geschenken
                zu erhalten.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-center">Premium</CardTitle>
                  <CardDescription className="text-center">Monatlich</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold">
                    19,90€ <span className="text-sm font-normal">/Monat</span>
                  </p>
                  <p className="text-sm mt-1 text-green-500">+ 100 Tokens monatlich geschenkt</p>
                  <ul className="text-sm mt-4 space-y-2">
                    <li>✓ Zugang zu allen Events</li>
                    <li>✓ Private Nachrichten</li>
                    <li>✓ Geschenke senden</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-center">Premium+</CardTitle>
                  <CardDescription className="text-center">Jährlich</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold">
                    199€ <span className="text-sm font-normal">/Jahr</span>
                  </p>
                  <p className="text-sm mt-1 text-green-500">+ 1200 Tokens jährlich geschenkt</p>
                  <ul className="text-sm mt-4 space-y-2">
                    <li>✓ Alles von Premium</li>
                    <li>✓ VIP-Events</li>
                    <li>✓ Eigene Events erstellen</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Jetzt upgraden</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Schließen
          </Button>
          {isPremium && (
            <Link href="/premium">
              <Button>Zum Premium-Bereich</Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

