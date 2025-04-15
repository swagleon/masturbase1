"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Shield, Eye, Heart, Calendar, CreditCard, User } from "lucide-react"
import ProfileSettings from "@/components/profile-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Einstellungen</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-5 gap-2">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Konto</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Anzeige</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Benachrichtigungen</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sicherheit</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Zahlungen</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
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
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input id="email" type="email" defaultValue="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Benutzername</Label>
                <Input id="username" defaultValue="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Über mich</Label>
                <Textarea
                  id="bio"
                  defaultValue="Ich bin ein begeisterter Zuschauer und genieße die Zeit auf dieser Plattform."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Standort</Label>
                <Input id="location" defaultValue="Berlin, Deutschland" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Abbrechen</Button>
              <Button>Speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benachrichtigungseinstellungen</CardTitle>
              <CardDescription>Verwalte deine Benachrichtigungen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="follower-notifications" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Neue Follower
                  </Label>
                  <Switch id="follower-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tip-notifications" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Trinkgeld-Benachrichtigungen
                  </Label>
                  <Switch id="tip-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Zurücksetzen</Button>
              <Button>Speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
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

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zahlungseinstellungen</CardTitle>
              <CardDescription>Verwalte deine Zahlungsmethoden und Abrechnungsinformationen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-method">Bevorzugte Zahlungsmethode</Label>
                <select
                  id="payment-method"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="card">Kredit-/Debitkarte</option>
                  <option value="paypal">PayPal</option>
                  <option value="sofort">Sofort</option>
                  <option value="crypto">Kryptowährung</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-name">Name des Karteninhabers</Label>
                <Input id="billing-name" defaultValue="Max Mustermann" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-address">Rechnungsadresse</Label>
                <Textarea
                  id="billing-address"
                  defaultValue="Musterstraße 123&#10;12345 Berlin&#10;Deutschland"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-email">Rechnungs-E-Mail</Label>
                <Input id="billing-email" type="email" defaultValue="user@example.com" />
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
  )
}

