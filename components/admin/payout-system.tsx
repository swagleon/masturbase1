"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { adminService } from "@/lib/admin-service"

export default function PayoutSystem() {
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  const payoutData = adminService.getPayoutData()

  const handlePayout = () => {
    setError(null)
    setSuccess(false)

    const payoutAmount = Number.parseFloat(amount)
    if (isNaN(payoutAmount) || payoutAmount <= 0) {
      setError("Bitte geben Sie einen gültigen Betrag ein.")
      return
    }

    if (payoutAmount > payoutData.availableProfit) {
      setError("Der Auszahlungsbetrag übersteigt den verfügbaren Profit.")
      return
    }

    setIsProcessing(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      const result = adminService.processPayout(payoutAmount, {
        accountHolder: "André Kindt",
        iban: "DE89 3704 0044 0532 0130 00",
        bic: "COBADEFFXXX",
      })

      if (result.success) {
        setSuccess(true)
        setTransactionId(result.transactionId)
      } else {
        setError("Bei der Verarbeitung der Auszahlung ist ein Fehler aufgetreten.")
      }

      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Verfügbarer Profit</h3>
          <p className="text-2xl font-bold">{payoutData.availableProfit.toLocaleString("de-DE")} €</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Letzte Auszahlung</p>
          <p>
            {payoutData.lastPayout.amount.toLocaleString("de-DE")} € am {payoutData.lastPayout.date}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payout-amount">Auszahlungsbetrag (€)</Label>
              <Input
                id="payout-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <Label>Bankverbindung</Label>
              <div className="p-3 bg-muted rounded-md">
                <p>
                  <strong>Kontoinhaber:</strong> André Kindt
                </p>
                <p>
                  <strong>IBAN:</strong> DE89 3704 0044 0532 0130 00
                </p>
                <p>
                  <strong>BIC:</strong> COBADEFFXXX
                </p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>Auszahlung erfolgreich! Transaktions-ID: {transactionId}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handlePayout} disabled={isProcessing || !amount} className="w-full">
              {isProcessing ? "Wird verarbeitet..." : "Sofortüberweisung durchführen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Profit im {payoutData.currentMonth} {payoutData.currentYear}
        </h3>
        <div className="space-y-2">
          {payoutData.monthlyProfits.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
              <span>{item.month}</span>
              <span className="font-medium">{item.profit.toLocaleString("de-DE")} €</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

