"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { adminService } from "@/lib/admin-service"

export default function TransferSystem() {
  const [amount, setAmount] = useState("")
  const [bankName, setBankName] = useState("")
  const [iban, setIban] = useState("")
  const [bic, setBic] = useState("")
  const [accountHolder, setAccountHolder] = useState("André Kindt")
  const [transferType, setTransferType] = useState("profit")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleTransfer = async () => {
    if (!amount || !bankName || !iban || !bic || !accountHolder) {
      setError("Bitte füllen Sie alle Felder aus.")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Simuliere API-Aufruf
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simuliere erfolgreiche Überweisung
      adminService.transferFunds({
        amount: Number.parseFloat(amount),
        bankName,
        iban,
        bic,
        accountHolder,
        type: transferType,
      })

      setSuccess(true)
      setAmount("")
    } catch (err) {
      setError("Bei der Überweisung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Überweisungssystem</CardTitle>
        <CardDescription>Überweisen Sie Profit oder andere Gelder auf Ihr Bankkonto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="transfer-type">Überweisungstyp</Label>
          <Select value={transferType} onValueChange={setTransferType}>
            <SelectTrigger id="transfer-type">
              <SelectValue placeholder="Wählen Sie einen Überweisungstyp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="revenue">Umsatz</SelectItem>
              <SelectItem value="other">Sonstige</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Betrag (€)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="account-holder">Kontoinhaber</Label>
          <Input id="account-holder" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bank-name">Bank</Label>
          <Input
            id="bank-name"
            placeholder="Deutsche Bank"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="iban">IBAN</Label>
          <Input
            id="iban"
            placeholder="DE89 3704 0044 0532 0130 00"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bic">BIC</Label>
          <Input id="bic" placeholder="COBADEFFXXX" value={bic} onChange={(e) => setBic(e.target.value)} />
        </div>

        {error && (
          <div className="flex items-center text-red-500 text-sm mt-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center text-green-500 text-sm mt-2">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Überweisung erfolgreich initiiert. Die Bearbeitung kann 1-3 Werktage dauern.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleTransfer} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Überweisung wird durchgeführt...
            </>
          ) : (
            "Überweisung durchführen"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

