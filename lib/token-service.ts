// Token-Pakete
export const tokenPackages = [
  { id: 1, amount: 100, price: 10, currency: "€" },
  { id: 2, amount: 200, price: 19, currency: "€" },
  { id: 3, amount: 450, price: 39, currency: "€" }, // Aktualisiert von 400 auf 450 Tokens
  { id: 4, amount: 600, price: 49, currency: "€" }, // Aktualisiert von 550 auf 600 Tokens
  { id: 5, amount: 800, price: 69, currency: "€" },
  { id: 6, amount: 1200, price: 99, currency: "€" },
  { id: 7, amount: 2500, price: 199, currency: "€" },
  { id: 8, amount: 6500, price: 499, currency: "€" },
]

// Zahlungsmethoden
export const paymentMethods = [
  { id: "card", name: "Kredit-/Debitkarte (Visa/Mastercard/Discover)" },
  { id: "paysafecard", name: "Paysafecard" },
  { id: "sofort", name: "Sofort" },
  { id: "paybybank", name: "Pay By Bank" },
  { id: "epoch", name: "Epoch (Credit Card/Sofort/PaySafeCard/SafetyPay)" },
  { id: "paypal", name: "PayPal" },
  { id: "transfer", name: "Elektronische Überweisung" },
  { id: "crypto", name: "Kryptowährung" },
  { id: "referral", name: "Werbe einen Freund und erhalte Token!" },
]

// Mitgliedschaftstypen
export const membershipTypes = {
  BASIC: "Basis Mitglied",
  PREMIUM: "Premium Mitglied",
}

// Token-Service
class TokenService {
  private tokenBalance = 0
  private membershipType: string = membershipTypes.BASIC
  private isAdmin = false // Flag für Admin-Status
  private tokenHistory: Array<{
    date: Date
    amount: number
    type: "purchase" | "gift" | "use" | "sell"
    description: string
  }> = []

  constructor() {
    // In einer echten Anwendung würden die Daten aus einer Datenbank geladen
    this.tokenBalance = 500 // Startguthaben für Testzwecke

    // Simuliere Admin-Status für Testzwecke (in einer echten Anwendung würde dies aus der Datenbank kommen)
    this.isAdmin = true // Für Testzwecke immer auf true setzen

    // Wenn Admin, dann immer Premium-Status
    this.membershipType = this.isAdmin ? membershipTypes.PREMIUM : membershipTypes.BASIC

    // Beispiel-Transaktionshistorie
    this.tokenHistory = [
      {
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 Tage zurück
        amount: 200,
        type: "purchase",
        description: "Token-Paket gekauft",
      },
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 Tage zurück
        amount: 50,
        type: "gift",
        description: "Geschenk von julia_hot",
      },
      {
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 Tage zurück
        amount: -20,
        type: "use",
        description: "Trinkgeld an max_model",
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 Tag zurück
        amount: 300,
        type: "purchase",
        description: "Token-Paket gekauft",
      },
    ]
  }

  getTokenBalance(): number {
    return this.tokenBalance
  }

  getTokenHistory(): Array<{
    date: Date
    amount: number
    type: "purchase" | "gift" | "use" | "sell"
    description: string
  }> {
    return this.tokenHistory
  }

  getMembershipType(): string {
    // Wenn Admin, dann immer Premium zurückgeben
    if (this.isAdmin) {
      return membershipTypes.PREMIUM
    }
    return this.membershipType
  }

  isAdminUser(): boolean {
    return this.isAdmin
  }

  addTokens(amount: number, description = "Token-Paket gekauft"): void {
    this.tokenBalance += amount
    this.tokenHistory.push({
      date: new Date(),
      amount: amount,
      type: "purchase",
      description,
    })
  }

  useTokens(amount: number, description = "Tokens verwendet"): boolean {
    if (this.tokenBalance >= amount) {
      this.tokenBalance -= amount
      this.tokenHistory.push({
        date: new Date(),
        amount: -amount,
        type: "use",
        description,
      })
      return true
    }
    return false
  }

  sellTokens(amount: number, description = "Tokens verkauft"): boolean {
    if (this.tokenBalance >= amount) {
      this.tokenBalance -= amount
      this.tokenHistory.push({
        date: new Date(),
        amount: -amount,
        type: "sell",
        description,
      })
      return true
    }
    return false
  }

  hasTokens(amount: number): boolean {
    return this.tokenBalance >= amount
  }

  upgradeToPremium(): void {
    this.membershipType = membershipTypes.PREMIUM
    // Füge 100 Tokens als Geschenk hinzu
    this.addTokens(100, "Geschenk für Premium-Mitgliedschaft")
  }

  downgradeToBasic(): void {
    // Admins können nicht heruntergestuft werden
    if (!this.isAdmin) {
      this.membershipType = membershipTypes.BASIC
    }
  }

  // Berechnet den Auszahlungsbetrag (geändert von 0.06 auf 0.05 € pro Token)
  calculateCashoutAmount(tokens: number): number {
    const tokenValue = 0.05 // 1 Token = 0.05 Euro
    return tokens * tokenValue
  }
}

// Singleton-Instanz
export const tokenService = new TokenService()

