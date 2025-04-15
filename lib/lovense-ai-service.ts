import { lovenseApi, type LovenseToy } from "./lovense-api"

export interface TipAction {
  minAmount: number
  maxAmount: number
  intensity: number
  duration: number
  message: string
}

export interface ChatTrigger {
  keywords: string[]
  intensity: number
  duration: number
  cooldown: number
  message: string
}

export interface LovenseAISettings {
  enabled: boolean
  tipActions: TipAction[]
  chatTriggers: ChatTrigger[]
  autoRespond: boolean
  randomActions: boolean
  randomActionFrequency: number // Minuten
  lastRandomAction: Date | null
}

class LovenseAIService {
  private settings: LovenseAISettings = {
    enabled: false,
    tipActions: [
      { minAmount: 1, maxAmount: 10, intensity: 5, duration: 5, message: "Danke für das Trinkgeld! 💕" },
      {
        minAmount: 11,
        maxAmount: 50,
        intensity: 10,
        duration: 10,
        message: "Wow, vielen Dank! Das fühlt sich gut an! 🔥",
      },
      { minAmount: 51, maxAmount: 100, intensity: 15, duration: 15, message: "Oh mein Gott! Das ist unglaublich! 💦" },
      {
        minAmount: 101,
        maxAmount: 999999,
        intensity: 20,
        duration: 20,
        message: "AHHH! DAS IST INTENSIV! DANKE! 💦💦💦",
      },
    ],
    chatTriggers: [
      {
        keywords: ["schneller", "härter", "stärker"],
        intensity: 15,
        duration: 10,
        cooldown: 60,
        message: "Oh ja, das gefällt mir! 🔥",
      },
      {
        keywords: ["langsam", "sanft", "zart"],
        intensity: 5,
        duration: 15,
        cooldown: 60,
        message: "Mmm, das ist so angenehm... 💕",
      },
      {
        keywords: ["pulsieren", "puls", "rhythmus"],
        intensity: 10,
        duration: 8,
        cooldown: 60,
        message: "Ich liebe diesen Rhythmus! 💓",
      },
    ],
    autoRespond: true,
    randomActions: false,
    randomActionFrequency: 5,
    lastRandomAction: null,
  }

  private cooldowns: Map<string, Date> = new Map()
  private toys: LovenseToy[] = []
  private isActive = false

  constructor() {
    // Toys abrufen und auf Änderungen hören
    lovenseApi.addToyListener((toys) => {
      this.toys = toys
      console.log("Lovense AI Service: Toys aktualisiert", toys)
    })
  }

  // Gibt die aktuellen Einstellungen zurück
  public getSettings(): LovenseAISettings {
    return { ...this.settings }
  }

  // Aktualisiert die Einstellungen
  public updateSettings(settings: Partial<LovenseAISettings>): void {
    this.settings = { ...this.settings, ...settings }
    console.log("Lovense AI Service: Einstellungen aktualisiert", this.settings)
  }

  // Aktiviert oder deaktiviert den KI-Service
  public setActive(active: boolean): void {
    this.isActive = active
    console.log(`Lovense AI Service: ${active ? "Aktiviert" : "Deaktiviert"}`)
  }

  // Verarbeitet ein Trinkgeld
  public handleTip(amount: number, username: string): void {
    if (!this.isActive || !this.settings.enabled || this.toys.length === 0) {
      return
    }

    // Passende Aktion finden
    const action = this.settings.tipActions.find((a) => amount >= a.minAmount && amount <= a.maxAmount)

    if (action) {
      console.log(`Lovense AI Service: Trinkgeld von ${username} (${amount} Tokens) verarbeitet`)

      // Vibration senden
      lovenseApi.vibrate(action.intensity, action.duration)

      // Nachricht zurückgeben (in einer echten Anwendung würde dies an den Chat gesendet)
      if (this.settings.autoRespond) {
        console.log(`Lovense AI Service: Automatische Antwort an ${username}: ${action.message}`)
      }
    }
  }

  // Verarbeitet eine Chat-Nachricht
  public handleChatMessage(message: string, username: string): void {
    if (!this.isActive || !this.settings.enabled || this.toys.length === 0) {
      return
    }

    // Nachricht in Kleinbuchstaben umwandeln
    const lowerMessage = message.toLowerCase()

    // Alle passenden Trigger finden
    const triggers = this.settings.chatTriggers.filter((trigger) =>
      trigger.keywords.some((keyword) => lowerMessage.includes(keyword.toLowerCase())),
    )

    for (const trigger of triggers) {
      // Prüfen, ob der Trigger im Cooldown ist
      const triggerId = trigger.keywords.join("-")
      const lastTriggered = this.cooldowns.get(triggerId)
      const now = new Date()

      if (lastTriggered && (now.getTime() - lastTriggered.getTime()) / 1000 < trigger.cooldown) {
        console.log(`Lovense AI Service: Trigger "${triggerId}" ist im Cooldown`)
        continue
      }

      console.log(`Lovense AI Service: Chat-Trigger von ${username} aktiviert: ${triggerId}`)

      // Cooldown setzen
      this.cooldowns.set(triggerId, now)

      // Vibration senden
      lovenseApi.vibrate(trigger.intensity, trigger.duration)

      // Nachricht zurückgeben (in einer echten Anwendung würde dies an den Chat gesendet)
      if (this.settings.autoRespond) {
        console.log(`Lovense AI Service: Automatische Antwort an ${username}: ${trigger.message}`)
      }
    }
  }

  // Führt eine zufällige Aktion aus
  public performRandomAction(): void {
    if (!this.isActive || !this.settings.enabled || !this.settings.randomActions || this.toys.length === 0) {
      return
    }

    const now = new Date()

    // Prüfen, ob die letzte zufällige Aktion lange genug her ist
    if (this.settings.lastRandomAction) {
      const minutesSinceLastAction = (now.getTime() - this.settings.lastRandomAction.getTime()) / (1000 * 60)
      if (minutesSinceLastAction < this.settings.randomActionFrequency) {
        return
      }
    }

    // Zufällige Intensität und Dauer wählen
    const intensity = Math.floor(Math.random() * 10) + 5 // 5-15
    const duration = Math.floor(Math.random() * 10) + 5 // 5-15 Sekunden

    console.log(`Lovense AI Service: Zufällige Aktion ausgeführt (Intensität: ${intensity}, Dauer: ${duration}s)`)

    // Vibration senden
    lovenseApi.vibrate(intensity, duration)

    // Letzte zufällige Aktion aktualisieren
    this.settings.lastRandomAction = now
  }

  // Analysiert eine Nachricht mit KI und reagiert entsprechend
  public async analyzeMessageWithAI(message: string, username: string): Promise<void> {
    if (!this.isActive || !this.settings.enabled || this.toys.length === 0) {
      return
    }

    // In einer echten Anwendung würde hier eine KI-API aufgerufen werden
    console.log(`Lovense AI Service: Nachricht von ${username} mit KI analysiert: "${message}"`)

    // Simulierte KI-Analyse
    const sentiment = Math.random() // 0-1, wobei 1 sehr positiv ist

    if (sentiment > 0.8) {
      // Sehr positive Nachricht
      const intensity = Math.floor(sentiment * 15) + 5 // 5-20
      const duration = Math.floor(sentiment * 10) + 5 // 5-15 Sekunden

      console.log(`Lovense AI Service: Positive Stimmung erkannt (${sentiment.toFixed(2)}), Vibration gesendet`)

      // Vibration senden
      lovenseApi.vibrate(intensity, duration)
    }
  }
}

// Singleton-Instanz
export const lovenseAIService = new LovenseAIService()

