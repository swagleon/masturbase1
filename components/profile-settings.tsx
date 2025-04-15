"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { SunMedium, MapPin, Eye, Bell, Lock, Shield } from "lucide-react"

export default function ProfileSettings() {
  const [brightness, setBrightness] = useState(80)
  const [locationEnabled, setLocationEnabled] = useState(true)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Anzeigeeinstellungen
        </CardTitle>
        <CardDescription>Passe die Helligkeit und andere Anzeigeoptionen an</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="brightness" className="flex items-center gap-2">
              <SunMedium className="h-4 w-4" />
              Helligkeit
            </Label>
            <span className="text-sm">{brightness}%</span>
          </div>
          <Slider
            id="brightness"
            value={[brightness]}
            onValueChange={(value) => setBrightness(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Standort aktivieren
            </Label>
            <Switch id="location" checked={locationEnabled} onCheckedChange={setLocationEnabled} />
          </div>
          <p className="text-sm text-muted-foreground">
            {locationEnabled
              ? "Dein ungefährer Standort wird anderen Nutzern angezeigt"
              : "Dein Standort wird nicht angezeigt"}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="font-medium">Weitere Einstellungen</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Benachrichtigungen
            </Label>
            <Switch id="notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="privacy" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Privatsphäre-Modus
            </Label>
            <Switch id="privacy" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Erweiterte Sicherheit
            </Label>
            <Switch id="security" defaultChecked />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Zurücksetzen</Button>
        <Button>Speichern</Button>
      </CardFooter>
    </Card>
  )
}

