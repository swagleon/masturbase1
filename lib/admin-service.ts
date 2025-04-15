// Simulierte Daten für das Admin-Dashboard
class AdminService {
  // Simulierte Statistiken
  getStats() {
    return {
      revenue: 1245678.9, // Gesamtumsatz in Euro
      revenueChange: 12.5, // Prozentuale Änderung zum Vormonat
      profit: 487654.32, // Profit nach Abzug aller Kosten
      profitChange: 8.3,
      tokensSold: 9876543, // Anzahl verkaufter Tokens
      tokensSoldChange: 15.2,
      tokensCirculating: 4567890, // Tokens im Umlauf
      registeredUsers: 87654, // Registrierte Benutzer
      activeUsers: 12345, // Aktuell aktive Benutzer
      vat: 198765.43, // Umsatzsteuer für den aktuellen Monat
    }
  }

  // Simulierte Finanzdaten für Charts
  getFinanceData(timeframe: "day" | "month" | "year") {
    // Generiere simulierte Daten basierend auf dem Zeitraum
    const dataPoints = timeframe === "day" ? 24 : timeframe === "month" ? 30 : 12
    const data = []

    let baseRevenue = 10000
    let baseProfit = 4000

    for (let i = 0; i < dataPoints; i++) {
      // Füge etwas Zufälligkeit hinzu
      const randomFactor = 0.8 + Math.random() * 0.4 // 0.8 bis 1.2
      const revenue = Math.round(baseRevenue * randomFactor)
      const profit = Math.round(baseProfit * randomFactor)

      // Leichte Steigerung über die Zeit
      baseRevenue *= 1.01
      baseProfit *= 1.01

      const label = timeframe === "day" ? `${i}:00` : timeframe === "month" ? `Tag ${i + 1}` : `Monat ${i + 1}`

      data.push({
        label,
        revenue,
        profit,
      })
    }

    return data
  }

  // Simulierte Token-Verkaufsdaten
  getTokenSalesData() {
    const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]

    return months.map((month, index) => {
      // Simuliere einen Trend mit saisonalen Schwankungen
      const baseSales = 500000
      const seasonalFactor = 1 + 0.3 * Math.sin((index / 11) * Math.PI * 2)
      const randomFactor = 0.9 + Math.random() * 0.2

      return {
        month,
        sales: Math.round(baseSales * seasonalFactor * randomFactor),
      }
    })
  }

  // Simulierte Benutzerdaten
  getUsersData() {
    const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]

    let registeredTotal = 20000
    let activeBase = 5000

    return months.map((month, index) => {
      // Simuliere Wachstum und saisonale Schwankungen
      const newUsers = Math.round(2000 * (1 + 0.2 * Math.sin((index / 11) * Math.PI * 2)))
      registeredTotal += newUsers

      const activeUsers = Math.round(activeBase * (0.9 + Math.random() * 0.2))
      activeBase *= 1.03 // Leichtes Wachstum der aktiven Nutzer

      return {
        month,
        registered: registeredTotal,
        active: activeUsers,
        new: newUsers,
      }
    })
  }

  // Simulierte Auszahlungsdaten
  getPayoutData() {
    const currentMonth = new Date().toLocaleString("de-DE", { month: "long" })
    const currentYear = new Date().getFullYear()

    return {
      availableProfit: 87654.32,
      lastPayout: {
        amount: 65432.1,
        date: "15.03.2023",
      },
      currentMonth,
      currentYear,
      monthlyProfits: [
        { month: "Januar", profit: 78234.56 },
        { month: "Februar", profit: 82345.67 },
        { month: "März", profit: 87654.32 },
      ],
    }
  }

  // Simulierte Umsatzsteuerdaten
  getTaxData() {
    return {
      currentVat: 19876.54,
      currentMonth: new Date().toLocaleString("de-DE", { month: "long" }),
      currentYear: new Date().getFullYear(),
      dueDate: "10.04.2023",
      taxOffice: "Finanzamt Berlin-Mitte",
      taxNumber: "123/456/78901",
      vatId: "DE123456789",
    }
  }

  // Simuliere Finanzberichtsgenerierung
  generateFinancialReport() {
    console.log("Generating financial report...")
    // In einer echten Anwendung würde hier ein PDF generiert werden

    // Simuliere einen Download
    const link = document.createElement("a")
    link.href = "#"
    link.download = `Finanzbericht_${new Date().toISOString().slice(0, 10)}.pdf`
    link.click()
  }

  // Simuliere Auszahlung
  processPayout(amount: number, bankDetails: any) {
    console.log(`Processing payout of ${amount}€ to ${bankDetails.accountHolder}`)
    // In einer echten Anwendung würde hier die Zahlung verarbeitet werden
    return {
      success: true,
      transactionId: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      date: new Date().toISOString(),
    }
  }

  // Simuliere Steuerzahlung
  processTaxPayment(amount: number, taxDetails: any) {
    console.log(`Processing tax payment of ${amount}€ to ${taxDetails.taxOffice}`)
    // In einer echten Anwendung würde hier die Steuerzahlung verarbeitet werden
    return {
      success: true,
      transactionId: `TAX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      date: new Date().toISOString(),
    }
  }
}

// Singleton-Instanz
export const adminService = new AdminService()

