// Datenbank-Schema für Masturbase

// Benutzer-Schema
export interface User {
  id: string
  username: string
  email: string
  password: string // In der Praxis würde hier ein gehashtes Passwort gespeichert
  name?: string
  age?: number
  country?: string
  language?: string
  isEmailVerified: boolean
  isAgeVerified: boolean
  registrationDate: Date
  lastLoginDate?: Date
  role: "user" | "streamer" | "admin"
  status: "pending" | "active" | "suspended" | "banned"
  idDocuments?: {
    frontImage?: string // Pfad oder URL zum Bild
    backImage?: string // Pfad oder URL zum Bild
    verificationStatus: "pending" | "approved" | "rejected"
    verificationDate?: Date
    rejectionReason?: string
  }
  tokens: number
  membershipType: "basic" | "premium"
}

// Schema für Finanzielle Transaktionen
export interface Transaction {
  id: string
  userId: string
  type: "purchase" | "gift" | "use" | "sell" | "payout"
  amount: number
  tokens?: number
  description: string
  date: Date
  paymentMethod?: string
  status: "pending" | "completed" | "failed" | "refunded"
}

// Schema für Steuerlich absetzbare Ausgaben
export interface Expense {
  id: string
  category: "server" | "office" | "business_meal" | "other"
  amount: number
  description: string
  date: Date
  receiptImage?: string // Pfad oder URL zum Beleg
  status: "pending" | "approved" | "rejected"
  approvalDate?: Date
}

// Schema für Streams
export interface Stream {
  id: string
  userId: string
  title: string
  description?: string
  category: string
  tags: string[]
  startTime: Date
  endTime?: Date
  viewerCount: number
  tokensEarned: number
  status: "scheduled" | "live" | "ended"
}

// Beispiel für eine einfache In-Memory-Datenbank
export class InMemoryDatabase {
  users: User[] = []
  transactions: Transaction[] = []
  expenses: Expense[] = []
  streams: Stream[] = []

  // Beispiel-Methoden
  addUser(user: Omit<User, "id">) {
    const id = Math.random().toString(36).substring(2, 15)
    this.users.push({ ...user, id })
    return id
  }

  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  updateUser(id: string, updates: Partial<User>) {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates }
      return true
    }
    return false
  }

  // Weitere Methoden für Transaktionen, Ausgaben, Streams, etc.
}

// Singleton-Instanz
export const db = new InMemoryDatabase()

