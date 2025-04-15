"use client"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Bell, Shield, Eye, Heart, Calendar } from "lucide-react"
import ProfileSettings from "@/components/profile-settings"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock-Daten für das Benutzerprofil
  const user = {
    username: "max_mustermann",
    email: "max@example.com",
    avatar: "/placeholder.svg?height=100&width=100&text=MM",
    bio: "Ich bin ein begeisterter Zuschauer und genieße die Zeit auf dieser Plattform.",
    location: "Berlin, Deutschland",
    joinDate: "Januar 2023",
    following: 42,
    followers: 12,
  }

  // Mock-Daten für die Aktivitätshistorie
  const activities = [
    {
      id: 1,
      type: "follow",
      user: "julia_hot",
      avatar: "/placeholder.svg?height=40&width=40&text=JH",
      date: "Heute, 14:30",
    },
    {
      id: 2,
      type: "tip",
      user: "sexy_couple",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      amount: 50,
      date: "Gestern, 20:15",
    },
    {
      id: 3,
      type: "watch",
      user: "fitness_model",
      avatar: "/placeholder.svg?height=40&width=40&text=FM",
      duration: "45 Minuten",
      date: "Vor 2 Tagen",
    },
    {
      id: 4,
      type: "follow",
      user: "dance_queen",
      avatar: "/placeholder.svg?height=40&width=40&text=DQ",
      date: "Vor 3 Tagen",
    },
    {
      id: 5,
      type: "tip",
      user: "julia_hot",
      avatar: "/placeholder.svg?height=40&width=40&text=JH",
      amount: 20,
      date: "Vor 5 Tagen",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{user.location}</Badge>
                  <Badge variant="outline">Seit {user.joinDate}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div>
                    <div className="font-bold">{user.following}</div>
                    <div className="text-sm text-muted-foreground">Folge ich</div>
                  </div>
                  <div>
                    <div className="font-bold">{user.followers}</div>
                    <div className="text-sm text-muted-foreground">Follower</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Profil bearbeiten</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Aktivitäten
              </CardTitle>
              <CardDescription>Deine letzten Aktivitäten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>{activity.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        {activity.type === "follow" && (
                          <>
                            Du folgst <span className="font-medium">{activity.user}</span>
                          </>
                        )}
                        {activity.type === "tip" && (
                          <>
                            Du hast <span className="font-medium">{activity.user}</span>{" "}
                            <span className="text-yellow-500 font-medium">{activity.amount} Tokens</span> gegeben
                          </>
                        )}
                        {activity.type === "watch" && (
                          <>
                            Du hast <span className="font-medium">{activity.user}</span> für{" "}
                            <span className="font-medium">{activity.duration}</span> angesehen
                          </>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="profile" className="flex-1">
                <User className="h-4 w-4 mr-2" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Einstellungen
              </TabsTrigger>
              <TabsTrigger value="display" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                Anzeige
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                Sicherheit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profil bearbeiten</CardTitle>
                  <CardDescription>Aktualisiere deine Profilinformationen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Benutzername</Label>
                    <Input id="username" defaultValue={user.username} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Über mich</Label>
                    <Textarea id="bio" defaultValue={user.bio} rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Standort</Label>
                    <Input id="location" defaultValue={user.location} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Abbrechen</Button>
                  <Button>Speichern</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kontoeinstellungen</CardTitle>
                  <CardDescription>Verwalte deine Kontoeinstellungen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Sprache</Label>
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="de">Deutsch</option>
                      <option value="en">Englisch</option>
                      <option value="fr">Französisch</option>
                      <option value="es">Spanisch</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Zeitzone</Label>
                    <select
                      id="timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="europe/berlin">Europe/Berlin</option>
                      <option value="europe/london">Europe/London</option>
                      <option value="america/new_york">America/New York</option>
                      <option value="asia/tokyo">Asia/Tokyo</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notifications">Benachrichtigungseinstellungen</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          E-Mail-Benachrichtigungen
                        </Label>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="stream-notifications" className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Stream-Benachrichtigungen
                        </Label>
                        <Switch id="stream-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-notifications" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Marketing-Benachrichtigungen
                        </Label>
                        <Switch id="marketing-notifications" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Zurücksetzen</Button>
                  <Button>Speichern</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="display" className="mt-6">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sicherheitseinstellungen</CardTitle>
                  <CardDescription>Verwalte deine Sicherheitseinstellungen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Aktuelles Passwort</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Neues Passwort</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Zwei-Faktor-Authentifizierung</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="2fa" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        2FA aktivieren
                      </Label>
                      <Switch id="2fa" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Erhöhe die Sicherheit deines Kontos mit Zwei-Faktor-Authentifizierung
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Abbrechen</Button>
                  <Button>Speichern</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

