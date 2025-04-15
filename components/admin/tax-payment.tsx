"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, FileText } from "lucide-react"
import { adminService } from "@/lib/admin-service"

export default function TaxPayment() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  const taxData = adminService.getTaxData()

  const handleTaxPayment = () => {
    setError(null)
    setSuccess(false)
    setIsProcessing(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      const result = adminService.processTaxPayment(taxData.currentVat, {
        taxOffice: taxData.taxOffice,
        taxNumber: taxData.taxNumber,
        vatId: taxData.vatId,
      })

      if (result.success) {
        setSuccess(true)
        setTransactionId(result.transactionId)
      } else {
        setError("Bei der Verarbeitung der Steuerzahlung ist ein Fehler aufgetreten.")
      }

      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">
            Umsatzsteuer {taxData.currentMonth} {taxData.currentYear}
          </h3>
          <p className="text-2xl font-bold">{taxData.currentVat.toLocaleString("de-DE")} €</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Fällig am</p>
          <p>{taxData.dueDate}</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Finanzamt-Details</Label>
              <div className="p-3 bg-muted rounded-md">
                <p>
                  <strong>Finanzamt:</strong> {taxData.taxOffice}
                </p>
                <p>
                  <strong>Steuernummer:</strong> {taxData.taxNumber}
                </p>
                <p>
                  <strong>USt-IdNr.:</strong> {taxData.vatId}
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
                <AlertDescription>Steuerzahlung erfolgreich! Transaktions-ID: {transactionId}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleTaxPayment} disabled={isProcessing} className="w-full">
              {isProcessing ? "Wird verarbeitet..." : "Umsatzsteuer überweisen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 border rounded-md">
        <div className="flex items-center gap-2 text-blue-600">
          <FileText className="h-5 w-5" />
          <h3 className="font-medium">Umsatzsteuer-Voranmeldung</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Bitte denken Sie daran, die Umsatzsteuer-Voranmeldung über ELSTER einzureichen.
        </p>
        <Button variant="outline" className="mt-2 w-full">
          Zur ELSTER-Website
        </Button>
      </div>
    </div>
  )
}

