"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Vibrate, Settings, LinkIcon, Brain, MessageSquare, Coins } from "lucide-react"
import { lovenseApi, type LovenseToy } from "@/lib/lovense-api"
import { lovenseAIService, type TipAction, type ChatTrigger } from "@/lib/lovense-ai-service"

export default function LovenseAppControl() {
  const [isConnected, setIsConnected] = useState(false)
  const [toys, setToys] = useState<LovenseToy[]>([])
  const [selectedToy, setSelectedToy] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(50)
  const [duration, setDuration] = useState(5)
  const [aiSettings, setAiSettings] = useState(lovenseAIService.getSettings())
  const [tipActions, setTipActions] = useState<TipAction[]>(aiSettings.tipActions)
  const [chatTriggers, setChatTriggers] = useState<ChatTrigger[]>(aiSettings.chatTriggers)
  const [newKeyword, setNewKeyword] = useState("")

  // Verbindungsstatus und Toys überwachen
  useEffect(() => {
    const removeConnectionListener = lovenseApi.addConnectionListener((connected) => {
      setIsConnected(connected)
    })

    const removeToyListener = lovenseApi.addToyListener((updatedToys) => {
      setToys(updatedToys)
      if (updatedToys.length > 0 && !selectedToy) {
        setSelectedToy(updatedToys[0].id)
      }
    })

    return () => {
      removeConnectionListener()
      removeToyListener()
    }
  }, [selectedToy])

  // Verbindung herstellen
  const handleConnect = async () => {
    await lovenseApi.connect()
    await lovenseApi.getToys()
  }

  // Verbindung trennen
  const handleDisconnect = async () => {
    await lovenseApi.disconnect()
    setSelectedToy(null)
  }

  // Vibration testen
  const handleTestVibration = async () => {
    await lovenseApi.vibrate(intensity, duration, selectedToy || undefined)
  }

  // Alle Aktionen stoppen
  const handleStopAll = async () => {
    await lovenseApi.stopAll()
  }

  // AI-Einstellungen aktualisieren
  const updateAISettings = (settings: Partial<typeof aiSettings>) => {
    const updatedSettings = { ...aiSettings, ...settings }
    setAiSettings(updatedSettings)
    lovenseAIService.updateSettings(updatedSettings)
  }

  // Tip-Action hinzufügen
  const addTipAction = () => {
    const newAction: TipAction = {
      minAmount: 1,
      maxAmount: 10,
      intensity: 5,
      duration: 5,
      message: "Danke für das Trinkgeld!",
    }
    const updatedActions = [...tipActions, newAction]
    setTipActions(updatedActions)
    updateAISettings({ tipActions: updatedActions })
  }

  // Tip-Action aktualisieren
  const updateTipAction = (index: number, field: keyof TipAction, value: any) => {
    const updatedActions = [...tipActions]
    updatedActions[index] = { ...updatedActions[index], [field]: value }
    setTipActions(updatedActions)
    updateAISettings({ tipActions: updatedActions })
  }

  // Tip-Action entfernen
  const removeTipAction = (index: number) => {
    const updatedActions = tipActions.filter((_, i) => i !== index)
    setTipActions(updatedActions)
    updateAISettings({ tipActions: updatedActions })
  }

  // Chat-Trigger hinzufügen
  const addChatTrigger = () => {
    if (!newKeyword.trim()) return

    const newTrigger: ChatTrigger = {
      keywords: [newKeyword.trim()],
      intensity: 10,
      duration: 5,
      cooldown: 60,
      message: "Das gefällt mir!",
    }
    const updatedTriggers = [...chatTriggers, newTrigger]
    setChatTriggers(updatedTriggers)
    updateAISettings({ chatTriggers: updatedTriggers })
    setNewKeyword("")
  }

  // Chat-Trigger aktualisieren
  const updateChatTrigger = (index: number, field: keyof ChatTrigger, value: any) => {
    const updatedTriggers = [...chatTriggers]
    updatedTriggers[index] = { ...updatedTriggers[index], [field]: value }
    setChatTriggers(updatedTriggers)
    updateAISettings({ chatTriggers: updatedTriggers })
  }

  // Chat-Trigger entfernen
  const removeChatTrigger = (index: number) => {
    const updatedTriggers = chatTriggers.filter((_, i) => i !== index)
    setChatTriggers(updatedTriggers)
    updateAISettings({ chatTriggers: updatedTriggers })
  }

  // Keyword zu einem Chat-Trigger hinzufügen
  const addKeywordToTrigger = (index: number, keyword: string) => {
    if (!keyword.trim()) return

    const updatedTriggers = [...chatTriggers]
    updatedTriggers[index].keywords.push(keyword.trim())
    setChatTriggers(updatedTriggers)
    updateAISettings({ chatTriggers: updatedTriggers })
  }

  // Keyword aus einem Chat-Trigger entfernen
  const removeKeywordFromTrigger = (triggerIndex: number, keywordIndex: number) => {
    const updatedTriggers = [...chatTriggers]
    updatedTriggers[triggerIndex].keywords.splice(keywordIndex, 1)
    setChatTriggers(updatedTriggers)
    updateAISettings({ chatTriggers: updatedTriggers })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Lovense KI-Steuerung
        </CardTitle>
        <CardDescription>Verbinde dein Lovense-Gerät und konfiguriere die KI-gesteuerte Interaktion</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="connect">
          <TabsList className="mb-4 grid grid-cols-4">
            <TabsTrigger value="connect">Verbinden</TabsTrigger>
            <TabsTrigger value="tips">Trinkgeld</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="ai">KI-Einstellungen</TabsTrigger>
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
                  <Button onClick={handleConnect}>Mit Lovense verbinden</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Vibrate className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Lovense API</h3>
                        <p className="text-sm text-green-600 dark:text-green-400">Verbunden</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleDisconnect}>
                      Trennen
                    </Button>
                  </div>

                  {toys.length > 0 && (
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        {toys.map((toy) => (
                          <div
                            key={toy.id}
                            className={`p-4 border rounded-md cursor-pointer ${selectedToy === toy.id ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : ""}`}
                            onClick={() => setSelectedToy(toy.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                  <Vibrate className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{toy.name}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{toy.type}</span>
                                    <span>•</span>
                                    <span>{toy.battery}% Akku</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${toy.status === "connected" ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-sm">{toy.status === "connected" ? "Verbunden" : "Getrennt"}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4 p-4 border rounded-md">
                        <div className="space-y-2">
                          <Label>Vibrations-Intensität testen</Label>
                          <div className="flex items-center gap-4">
                            <Slider
                              value={[intensity]}
                              onValueChange={(value) => setIntensity(value[0])}
                              min={0}
                              max={20}
                              step={1}
                              className="flex-1"
                            />
                            <span className="w-10 text-right">{intensity}/20</span>
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

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={handleTestVibration}>
                            Vibration testen
                          </Button>
                          <Button variant="outline" onClick={handleStopAll}>
                            Stoppen
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableTips">Trinkgeld-Aktionen aktivieren</Label>
                <Switch
                  id="enableTips"
                  checked={aiSettings.enabled}
                  onCheckedChange={(checked) => updateAISettings({ enabled: checked })}
                />
              </div>

              <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Trinkgeld-Aktionen</h3>
                </div>
                <p className="text-sm mb-4">
                  Definiere, wie dein Lovense-Gerät auf verschiedene Trinkgeld-Beträge reagieren soll.
                </p>

                <div className="space-y-4">
                  {tipActions.map((action, index) => (
                    <div key={index} className="p-3 border rounded-md bg-white dark:bg-gray-800">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Aktion {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500"
                          onClick={() => removeTipAction(index)}
                        >
                          ×
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Min. Tokens</Label>
                          <Input
                            type="number"
                            min="1"
                            value={action.minAmount}
                            onChange={(e) => updateTipAction(index, "minAmount", Number.parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Max. Tokens</Label>
                          <Input
                            type="number"
                            min="1"
                            value={action.maxAmount}
                            onChange={(e) => updateTipAction(index, "maxAmount", Number.parseInt(e.target.value) || 1)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Intensität (1-20)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="20"
                            value={action.intensity}
                            onChange={(e) => updateTipAction(index, "intensity", Number.parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Dauer (Sekunden)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="30"
                            value={action.duration}
                            onChange={(e) => updateTipAction(index, "duration", Number.parseInt(e.target.value) || 1)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Automatische Antwort</Label>
                        <Input
                          value={action.message}
                          onChange={(e) => updateTipAction(index, "message", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full" onClick={addTipAction}>
                    + Neue Trinkgeld-Aktion
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableChat">Chat-Trigger aktivieren</Label>
                <Switch
                  id="enableChat"
                  checked={aiSettings.enabled}
                  onCheckedChange={(checked) => updateAISettings({ enabled: checked })}
                />
              </div>

              <div className="p-4 border rounded-md bg-pink-50 dark:bg-pink-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-pink-600" />
                  <h3 className="font-medium">Chat-Trigger</h3>
                </div>
                <p className="text-sm mb-4">
                  Definiere Schlüsselwörter im Chat, die dein Lovense-Gerät aktivieren sollen.
                </p>

                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Neues Schlüsselwort hinzufügen"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                  />
                  <Button onClick={addChatTrigger}>Hinzufügen</Button>
                </div>

                <div className="space-y-4">
                  {chatTriggers.map((trigger, index) => (
                    <div key={index} className="p-3 border rounded-md bg-white dark:bg-gray-800">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Trigger {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500"
                          onClick={() => removeChatTrigger(index)}
                        >
                          ×
                        </Button>
                      </div>

                      <div className="mb-3">
                        <Label className="text-xs mb-1 block">Schlüsselwörter</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {trigger.keywords.map((keyword, keywordIndex) => (
                            <div
                              key={keywordIndex}
                              className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                              {keyword}
                              <button
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => removeKeywordFromTrigger(index, keywordIndex)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Neues Schlüsselwort"
                            className="text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && e.currentTarget.value) {
                                addKeywordToTrigger(index, e.currentTarget.value)
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={(e) => {
                              const input = e.currentTarget.previousSibling as HTMLInputElement
                              if (input.value) {
                                addKeywordToTrigger(index, input.value)
                                input.value = ""
                              }
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Intensität (1-20)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="20"
                            value={trigger.intensity}
                            onChange={(e) =>
                              updateChatTrigger(index, "intensity", Number.parseInt(e.target.value) || 1)
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Dauer (Sekunden)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="30"
                            value={trigger.duration}
                            onChange={(e) => updateChatTrigger(index, "duration", Number.parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Cooldown (Sekunden)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={trigger.cooldown}
                            onChange={(e) => updateChatTrigger(index, "cooldown", Number.parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs">Automatische Antwort</Label>
                        <Input
                          value={trigger.message}
                          onChange={(e) => updateChatTrigger(index, "message", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full" onClick={addChatTrigger}>
                    + Neuen Chat-Trigger
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium">KI-Einstellungen</h3>
                </div>
                <p className="text-sm mb-4">Konfiguriere, wie die KI mit deinem Lovense-Gerät interagieren soll.</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoRespond">Automatisch auf Aktionen antworten</Label>
                    <Switch
                      id="autoRespond"
                      checked={aiSettings.autoRespond}
                      onCheckedChange={(checked) => updateAISettings({ autoRespond: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="randomActions">Zufällige Aktionen aktivieren</Label>
                    <Switch
                      id="randomActions"
                      checked={aiSettings.randomActions}
                      onCheckedChange={(checked) => updateAISettings({ randomActions: checked })}
                    />
                  </div>

                  {aiSettings.randomActions && (
                    <div className="space-y-2">
                      <Label>Häufigkeit zufälliger Aktionen (Minuten)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[aiSettings.randomActionFrequency]}
                          onValueChange={(value) => updateAISettings({ randomActionFrequency: value[0] })}
                          min={1}
                          max={30}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-10 text-right">{aiSettings.randomActionFrequency}m</span>
                      </div>
                    </div>
                  )}

                  <div className="p-3 border rounded-md bg-white dark:bg-gray-800">
                    <h4 className="font-medium mb-2">KI-Analyse von Chat-Nachrichten</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Die KI analysiert Chat-Nachrichten und reagiert basierend auf dem Inhalt und der Stimmung.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">KI-Analyse aktivieren</span>
                      <Switch
                        checked={aiSettings.chatAnalysisEnabled}
                        onCheckedChange={(checked) => updateAISettings({ chatAnalysisEnabled: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
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

