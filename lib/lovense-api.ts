// Lovense API Service

export interface LovenseToy {
  id: string
  name: string
  status: "connected" | "disconnected"
  battery: number
  version: string
  type: string
}

export interface LovenseCommand {
  command: string
  value: number
  timeSec?: number
  toy?: string
}

class LovenseApiService {
  private baseUrl = "http://127.0.0.1:3000"
  private toys: LovenseToy[] = []
  private isConnected = false
  private connectionListeners: ((connected: boolean) => void)[] = []
  private toyListeners: ((toys: LovenseToy[]) => void)[] = []

  constructor() {
    // In einer echten Anwendung würde hier die Verbindung initialisiert
    this.simulateConnection()
  }

  // Simuliert eine Verbindung für Demo-Zwecke
  private simulateConnection() {
    setTimeout(() => {
      this.isConnected = true
      this.toys = [
        {
          id: "toy1",
          name: "Lush 3",
          status: "connected",
          battery: 85,
          version: "1.2.3",
          type: "vibrator",
        },
      ]
      this.notifyConnectionListeners()
      this.notifyToyListeners()
    }, 1500)
  }

  // Benachrichtigt alle Verbindungs-Listener
  private notifyConnectionListeners() {
    this.connectionListeners.forEach((listener) => listener(this.isConnected))
  }

  // Benachrichtigt alle Toy-Listener
  private notifyToyListeners() {
    this.toyListeners.forEach((listener) => listener(this.toys))
  }

  // Fügt einen Verbindungs-Listener hinzu
  public addConnectionListener(listener: (connected: boolean) => void) {
    this.connectionListeners.push(listener)
    // Sofort den aktuellen Status mitteilen
    listener(this.isConnected)
    return () => {
      this.connectionListeners = this.connectionListeners.filter((l) => l !== listener)
    }
  }

  // Fügt einen Toy-Listener hinzu
  public addToyListener(listener: (toys: LovenseToy[]) => void) {
    this.toyListeners.push(listener)
    // Sofort die aktuellen Toys mitteilen
    listener(this.toys)
    return () => {
      this.toyListeners = this.toyListeners.filter((l) => l !== listener)
    }
  }

  // Verbindet mit der Lovense API
  public async connect(): Promise<boolean> {
    try {
      // In einer echten Anwendung würde hier die Verbindung hergestellt
      // const response = await fetch(`${this.baseUrl}/connect`);
      // const data = await response.json();
      // this.isConnected = data.success;

      // Für Demo-Zwecke simulieren wir eine erfolgreiche Verbindung
      this.isConnected = true
      this.notifyConnectionListeners()
      return true
    } catch (error) {
      console.error("Fehler beim Verbinden mit der Lovense API:", error)
      return false
    }
  }

  // Trennt die Verbindung zur Lovense API
  public async disconnect(): Promise<boolean> {
    try {
      // In einer echten Anwendung würde hier die Verbindung getrennt
      // const response = await fetch(`${this.baseUrl}/disconnect`);
      // const data = await response.json();

      // Für Demo-Zwecke simulieren wir eine erfolgreiche Trennung
      this.isConnected = false
      this.toys = []
      this.notifyConnectionListeners()
      this.notifyToyListeners()
      return true
    } catch (error) {
      console.error("Fehler beim Trennen der Lovense API:", error)
      return false
    }
  }

  // Ruft alle verbundenen Toys ab
  public async getToys(): Promise<LovenseToy[]> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      // In einer echten Anwendung würden hier die Toys abgerufen
      // const response = await fetch(`${this.baseUrl}/getToys`);
      // this.toys = await response.json();

      // Für Demo-Zwecke simulieren wir eine Liste von Toys
      if (this.toys.length === 0) {
        this.toys = [
          {
            id: "toy1",
            name: "Lush 3",
            status: "connected",
            battery: 85,
            version: "1.2.3",
            type: "vibrator",
          },
        ]
        this.notifyToyListeners()
      }

      return this.toys
    } catch (error) {
      console.error("Fehler beim Abrufen der Toys:", error)
      return []
    }
  }

  // Sendet einen Befehl an ein Toy
  public async sendCommand(command: LovenseCommand): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      // In einer echten Anwendung würde hier der Befehl gesendet
      // const url = `${this.baseUrl}/${command.command}?v=${command.value}${command.timeSec ? `&t=${command.timeSec}` : ''}${command.toy ? `&toy=${command.toy}` : ''}`;
      // const response = await fetch(url);
      // const data = await response.json();

      console.log(
        `Lovense-Befehl gesendet: ${command.command}, Wert: ${command.value}, Zeit: ${command.timeSec || "unbegrenzt"}, Toy: ${command.toy || "alle"}`,
      )

      // Für Demo-Zwecke simulieren wir eine erfolgreiche Befehlsausführung
      return true
    } catch (error) {
      console.error("Fehler beim Senden des Befehls:", error)
      return false
    }
  }

  // Sendet einen Vibrationsbefehl
  public async vibrate(intensity: number, timeSec?: number, toyId?: string): Promise<boolean> {
    return this.sendCommand({
      command: "Vibrate",
      value: intensity,
      timeSec,
      toy: toyId,
    })
  }

  // Sendet einen Rotationsbefehl
  public async rotate(intensity: number, timeSec?: number, toyId?: string): Promise<boolean> {
    return this.sendCommand({
      command: "Rotate",
      value: intensity,
      timeSec,
      toy: toyId,
    })
  }

  // Sendet einen Pump-Befehl
  public async pump(intensity: number, timeSec?: number, toyId?: string): Promise<boolean> {
    return this.sendCommand({
      command: "Pump",
      value: intensity,
      timeSec,
      toy: toyId,
    })
  }

  // Sendet einen Stoß-Befehl
  public async thrust(intensity: number, timeSec?: number, toyId?: string): Promise<boolean> {
    return this.sendCommand({
      command: "Thrust",
      value: intensity,
      timeSec,
      toy: toyId,
    })
  }

  // Stoppt alle Aktionen
  public async stopAll(): Promise<boolean> {
    return this.sendCommand({
      command: "Stop",
      value: 0,
    })
  }
}

// Singleton-Instanz
export const lovenseApi = new LovenseApiService()

