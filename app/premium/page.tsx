"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Crown, MapPin, Clock, Users, Plus, MessageSquare, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { tokenService } from "@/lib/token-service"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function PremiumPage() {
  const [isPremium, setIsPremium] = useState(false)
  const [activeTab, setActiveTab] = useState("calendar")
  const [paymentMethod, setPaymentMethod] = useState("sepa")
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  useEffect(() => {
    // Überprüfe Premium-Status
    setIsPremium(tokenService.getMembershipType() === "Premium Mitglied")
  }, [])

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
      type: "party",
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
      type: "workshop",
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
      type: "online",
    },
    {
      id: 4,
      title: "Fetisch-Nacht München",
      date: "2025-04-25",
      time: "23:00",
      location: "München, Secret Club",
      host: "fetish_queen",
      hostAvatar: "/placeholder.svg?height=40&width=40",
      participants: 18,
      maxParticipants: 30,
      price: 400,
      description: "Eine Nacht voller Fetische und Fantasien. Nur für experimentierfreudige Erwachsene.",
      type: "party",
    },
    {
      id: 5,
      title: "Tantra-Workshop für Paare",
      date: "2025-05-05",
      time: "18:00",
      location: "Köln, Tantra-Studio",
      host: "tantra_guru",
      hostAvatar: "/placeholder.svg?height=40&width=40",
      participants: 6,
      maxParticipants: 8,
      price: 350,
      description: "Entdeckt gemeinsam die Kunst des Tantra und vertieft eure Verbindung.",
      type: "workshop",
    },
  ]

  // Sortiere Events nach Datum
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Gruppiere Events nach Monat für den Kalender
  const eventsByMonth: Record<string, typeof events> = {}
  sortedEvents.forEach((event) => {
    const date = new Date(event.date)
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`
    if (!eventsByMonth[monthYear]) {
      eventsByMonth[monthYear] = []
    }
    eventsByMonth[monthYear].push(event)
  })

  // Mock-Daten für Geschenke
  const gifts = [
    { id: 1, name: "Leuchtende Katze", price: 10, icon: "🐱", animation: "glow" },
    { id: 2, name: "Regenbogen", price: 50, icon: "🌈", animation: "rainbow" },
    { id: 3, name: "Einhorn", price: 100, icon: "🦄", animation: "sparkle" },
    { id: 4, name: "Drink", price: 20, icon: "🍸", animation: "shake" },
    { id: 5, name: "Eis", price: 15, icon: "🍦", animation: "melt" },
    { id: 6, name: "Nackte Frau", price: 1000, icon: "👩", animation: "dance" },
    { id: 7, name: "Feuerwerk", price: 200, icon: "🎆", animation: "explode" },
    { id: 8, name: "Herz", price: 30, icon: "❤", animation: "pulse" },
    { id: 9, name: "Diamant", price: 500, icon: "💎", animation: "shine" },
    { id: 10, name: "Kuss", price: 25, icon: "💋", animation: "float" },
    { id: 11, name: "Champagner", price: 75, icon: "🍾", animation: "pop" },
    { id: 12, name: "Rosen", price: 40, icon: "🌹", animation: "grow" },
  ]

  // Mock-Daten für Kontakte
  const contacts = [
    {
      id: 1,
      username: "julia_hot",
      displayName: "Julia",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Hast du Lust auf ein privates Treffen?",
    },
    {
      id: 2,
      username: "max_seductive",
      displayName: "Max",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "Danke für das Geschenk!",
    },
    {
      id: 3,
      username: "sexy_couple",
      displayName: "Sexy Couple",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Wir freuen uns auf dich bei unserem nächsten Event!",
    },
    {
      id: 4,
      username: "trans_beauty",
      displayName: "Bella",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastMessage: "Schau mal bei meinem neuen Video vorbei.",
    },
  ]

  const handleUpgrade = (type: string) => {
    setShowPaymentForm(true)
  }

  if (!isPremium) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-12 space-y-8">
          {!showPaymentForm ? (
            <>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-8 rounded-full">
                <Crown className="h-16 w-16 text-yellow-500" />
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Premium-Bereich</h1>
                <p className="text-xl">Dieser Bereich ist nur für Premium-Mitglieder zugänglich.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Premium</CardTitle>
                    <CardDescription className="text-center">Monatlich</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-3xl font-bold">
                      19,90€ <span className="text-sm font-normal">/Monat</span>
                    </p>
                    <p className="text-sm mt-1 text-green-500">+ 250 Tokens monatlich geschenkt</p>
                    <ul className="text-sm mt-4 space-y-2">
                      <li>✓ Zugang zu allen Events</li>
                      <li>✓ Private Nachrichten</li>
                      <li>✓ Geschenke senden</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleUpgrade("monthly")}>
                      Jetzt upgraden
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
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
                    <Button className="w-full" onClick={() => handleUpgrade("yearly")}>
                      Jetzt upgraden
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          ) : (
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Premium-Mitgliedschaft abschließen</CardTitle>
                <CardDescription>Wähle deine bevorzugte Zahlungsmethode und gib deine Daten ein</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Zahlungsmethode</Label>
                    <RadioGroup
                      defaultValue="sepa"
                      onValueChange={setPaymentMethod}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sepa" id="sepa" />
                        <Label htmlFor="sepa" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" /> SEPA-Lastschrift
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "sepa" && (
                    <div className="space-y-4 border p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Vorname</Label>
                          <Input id="firstName" placeholder="Max" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nachname</Label>
                          <Input id="lastName" placeholder="Mustermann" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input id="address" placeholder="Musterstraße 123" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">PLZ</Label>
                          <Input id="postalCode" placeholder="12345" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Stadt</Label>
                          <Input id="city" placeholder="Berlin" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthdate">Geburtsdatum</Label>
                        <Input id="birthdate" type="date" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="iban">IBAN</Label>
                        <Input id="iban" placeholder="DE89 3704 0044 0532 0130 00" />
                      </div>

                      <div className="flex items-start space-x-2 mt-4">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          Ich ermächtige Masturbase, Zahlungen von meinem Konto mittels Lastschrift einzuziehen.
                          Zugleich weise ich mein Kreditinstitut an, die von Masturbase auf mein Konto gezogenen
                          Lastschriften einzulösen.
                        </Label>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="border p-4 rounded-md text-center">
                      <p>Du wirst zur PayPal-Website weitergeleitet, um die Zahlung abzuschließen.</p>
                    </div>
                  )}

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <p className="font-medium">Premium-Vorteile</p>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> 250 Tokens monatlich geschenkt
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> Zugang zu exklusiven Events in deiner Stadt
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> Unbegrenzte Nachrichten an andere Mitglieder
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                  Zurück
                </Button>
                <Button>Jetzt abonnieren für 19,90€/Monat</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          <h1 className="text-3xl font-bold">Premium-Bereich</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Event erstellen
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="messages">Nachrichten</TabsTrigger>
          <TabsTrigger value="gifts">Geschenke</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <div className="space-y-8">
            {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => {
              const [year, month] = monthYear.split("-").map(Number)
              const monthName = new Date(year, month - 1).toLocaleString("de-DE", { month: "long" })

              return (
                <div key={monthYear} className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {monthName} {year}
                  </h2>

                  <div className="space-y-4">
                    {monthEvents.map((event) => {
                      const eventDate = new Date(event.date)
                      const formattedDate = eventDate.toLocaleDateString("de-DE", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })

                      return (
                        <Card key={event.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="md:w-1/4 flex flex-col">
                                <div className="text-lg font-bold">{formattedDate}</div>
                                <div className="text-muted-foreground">{event.time} Uhr</div>
                                <div className="flex items-center gap-1 mt-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                <Badge className="mt-2 w-fit bg-yellow-500">{event.price} Tokens</Badge>
                              </div>

                              <div className="md:w-3/4">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-xl font-bold">{event.title}</h3>
                                  <Badge variant="outline">
                                    {event.type === "party"
                                      ? "Party"
                                      : event.type === "workshop"
                                        ? "Workshop"
                                        : "Online"}
                                  </Badge>
                                </div>

                                <p className="mt-2">{event.description}</p>

                                <div className="flex items-center gap-2 mt-4">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={event.hostAvatar} alt={event.host} />
                                    <AvatarFallback>{event.host.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">
                                    Veranstaltet von <span className="font-medium">{event.host}</span>
                                  </span>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">
                                      {event.participants}/{event.maxParticipants} Teilnehmer
                                    </span>
                                  </div>

                                  <Button>Teilnehmen</Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
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
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Kontakte</CardTitle>
                  <CardDescription>Deine Premium-Kontakte</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="p-4 hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} alt={contact.username} />
                              <AvatarFallback>{contact.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                                contact.status === "online"
                                  ? "bg-green-500"
                                  : contact.status === "away"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                              }`}
                            ></span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{contact.displayName}</div>
                            <div className="text-sm text-muted-foreground truncate">{contact.lastMessage}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button className="w-full">Neue Nachricht</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Nachrichten</CardTitle>
                  <CardDescription>Wähle einen Kontakt aus, um Nachrichten zu senden</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center p-6 text-center text-muted-foreground">
                  <div>
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Wähle einen Kontakt aus der Liste aus, um eine Konversation zu starten</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gifts">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Animations-Geschenke</h2>
              <p className="text-muted-foreground">
                Sende animierte Geschenke an andere Mitglieder im Chat. Geschenke kosten zwischen 1 und 1000 Tokens.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

