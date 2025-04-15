"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Vibrate, Ticket, Settings, LinkIcon } from "lucide-react"

export default function LovenseApp() {
  const [isConnected, setIsConnected] = useState(false)
  const [deviceName, setDeviceName] = useState("")
  const [intensity, setIntensity] = useState(50)
  const [duration, setDuration] = useState(5)
  const [tokenPrice, setTokenPrice] = useState(20)
  const [privateShowPrice, setPrivateShowPrice] = useState(500)
  const [isPrivateShowEnabled, setIsPrivateShowEnabled] = useState(true)

  const handleConnect = () => {
    // In einer echten Anwendung würde hier die Verbindung zum Gerät hergestellt
    setIsConnected(true)
    setDeviceName("Lovense Lush 3")
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setDeviceName("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vibrate className="h-5 w-5 text-pink-500" />
          Lovense App
        </CardTitle>
        <CardDescription>Verbinde dein Lovense-Gerät und erstelle Ticket-Shows</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="connect">
          <TabsList className="mb-4">
            <TabsTrigger value="connect">Verbinden</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
            <TabsTrigger value="tickets">Ticket-Shows</TabsTrigger>
          </TabsList>

          <TabsContent value="connect">
            <div className="space-y-4">
              {!isConnected ? (
                <div className="flex flex-col items-center justify-center p-6 space-y-4 border rounded-md">
                  <Smartphone className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <h3 className="font-medium">Kein Gerät verbunden</h3>
                    <p className="text-sm text-muted-foreground">
                      Verbinde dein Lovense-Gerät, um interaktive Shows anzubieten
                    </p>
                  </div>
                  <Button onClick={handleConnect}>Mit Gerät verbinden</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Vibrate className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{deviceName}</h3>
                        <p className="text-sm text-green-600 dark:text-green-400">Verbunden</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleDisconnect}>
                      Trennen
                    </Button>
                  </div>

                  <div className="space-y-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label>Vibrations-Intensität testen</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[intensity]}
                          onValueChange={(value) => setIntensity(value[0])}
                          min={0}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-10 text-right">{intensity}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Vibrations-Dauer (Sekunden)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[duration]}
                          onValueChange={(value) => setDuration(value[0])}
                          min={1}
                          max={30}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-10 text-right">{duration}s</span>
                      </div>
                    </div>

                    <Button className="w-full">Vibration testen</Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenPrice">Token-Preis pro Vibration</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="tokenPrice"
                    type="number"
                    value={tokenPrice}
                    onChange={(e) => setTokenPrice(Number.parseInt(e.target.value))}
                    min={1}
                  />
                  <span>Tokens</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Zuschauer können {tokenPrice} Tokens ausgeben, um dein Gerät für {duration} Sekunden zu aktivieren
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="intensity">Standard-Intensität</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="intensity"
                    value={[intensity]}
                    onValueChange={(value) => setIntensity(value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-10 text-right">{intensity}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Standard-Dauer (Sekunden)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="duration"
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-10 text-right">{duration}s</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoConnect">Automatisch verbinden</Label>
                <Switch id="autoConnect" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="saveSettings">Einstellungen speichern</Label>
                <Switch id="saveSettings" defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enablePrivateShows">Private Shows aktivieren</Label>
                <Switch
                  id="enablePrivateShows"
                  checked={isPrivateShowEnabled}
                  onCheckedChange={setIsPrivateShowEnabled}
                />
              </div>

              {isPrivateShowEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="privateShowPrice">Preis für private Show</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="privateShowPrice"
                        type="number"
                        value={privateShowPrice}
                        onChange={(e) => setPrivateShowPrice(Number.parseInt(e.target.value))}
                        min={100}
                      />
                      <span>Tokens</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Zuschauer können ein Ticket für eine private Show für {privateShowPrice} Tokens kaufen
                    </p>
                  </div>

                  <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket className="h-5 w-5 text-yellow-600" />
                      <h3 className="font-medium">Ticket-Show erstellen</h3>
                    </div>
                    <p className="text-sm mb-4">
                      Erstelle eine private Show mit Ticket-Zugang. Nur Zuschauer mit einem Ticket können teilnehmen.
                    </p>
                    <Button className="w-full">Ticket-Show starten</Button>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <LinkIcon className="h-3 w-3" />
            <span>Kompatibel mit Lovense, We-Vibe und mehr</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Erweiterte Einstellungen
        </Button>
      </CardFooter>
    </Card>
  )
}

