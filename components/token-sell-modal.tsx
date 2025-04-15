"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { tokenService } from "@/lib/token-service"
import { Coins, DollarSign, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TokenSellModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TokenSellModal({ open, onOpenChange }: TokenSellModalProps) {
  const [tokenAmount, setTokenAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("paypal")
  const [paypalEmail, setPaypalEmail] = useState<string>("")
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    iban: "",
    bic: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [availableTokens, setAvailableTokens] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [tokensToUse, setTokensToUse] = useState<number | null>(null)
  const [tokensUsed, setTokensUsed] = useState(false)

  const TOKEN_VALUE = 0.05 // € pro Token - geändert von 0.06 auf 0.05

  useEffect(() => {
    setAvailableTokens(tokenService.getTokenBalance())
  }, [open])

  useEffect(() => {
    if (tokensToUse !== null && !tokensUsed) {
      tokenService.useTokens(tokensToUse)
      setTokensUsed(true)
    }
  }, [tokensToUse, tokensUsed])

  const calculateValue = (tokens: number) => {
    return (tokens * TOKEN_VALUE).toFixed(2)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setTokenAmount(value)
      setError(null)
    }
  }

  const validateForm = () => {
    const amount = Number.parseInt(tokenAmount, 10)

    if (!tokenAmount || isNaN(amount) || amount <= 0) {
      setError("Bitte gib eine gültige Token-Anzahl ein.")
      return false
    }

    if (amount > availableTokens) {
      setError(`Du hast nur ${availableTokens} Tokens verfügbar.`)
      return false
    }

    if (paymentMethod === "paypal" && !paypalEmail) {
      setError("Bitte gib deine PayPal-E-Mail-Adresse ein.")
      return false
    }

    if (paymentMethod === "bank") {
      if (!bankDetails.accountHolder) {
        setError("Bitte gib den Kontoinhaber ein.")
        return false
      }
      if (!bankDetails.iban) {
        setError("Bitte gib deine IBAN ein.")
        return false
      }
      if (!bankDetails.bic) {
        setError("Bitte gib den BIC ein.")
        return false
      }
    }

    return true
  }

  const handleSellTokens = () => {
    if (!validateForm()) return

    const amount = Number.parseInt(tokenAmount, 10)
    setIsProcessing(true)
    setError(null)

    // Simuliere API-Aufruf
    setTimeout(() => {
      setTokensToUse(amount)
      setIsProcessing(false)
      setIsSuccess(true)

      // Zurücksetzen nach 3 Sekunden
      setTimeout(() => {
        setIsSuccess(false)
        setTokenAmount("")
        setPaypalEmail("")
        setBankDetails({
          accountHolder: "",
          iban: "",
          bic: "",
        })
        onOpenChange(false)
        setTokensUsed(false)
      }, 3000)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            Tokens verkaufen
          </DialogTitle>
          <DialogDescription>
            Tausche deine Tokens gegen Bargeld ein. Du erhältst {TOKEN_VALUE.toFixed(2)} € pro Token.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <span>Verfügbare Tokens:</span>
            <span className="font-bold">{availableTokens}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="token-amount">Eintauschen von</Label>
            <div className="flex items-center gap-2">
              <Input
                id="token-amount"
                type="text"
                value={tokenAmount}
                onChange={handleAmountChange}
                placeholder="Anzahl der Tokens"
                className="flex-1"
              />
              <span>Tokens</span>
            </div>
            <p className="text-sm text-muted-foreground">in Bargeld ({TOKEN_VALUE.toFixed(2)} € pro Token)</p>
          </div>

          {tokenAmount && !isNaN(Number.parseInt(tokenAmount, 10)) && Number.parseInt(tokenAmount, 10) > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span>Du erhältst:</span>
              <span className="font-bold text-lg flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {calculateValue(Number.parseInt(tokenAmount, 10))} €
              </span>
            </div>
          )}

          <div className="space-y-2">
            <Label>Auszahlungsmethode</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  PayPal
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer">
                  Banküberweisung
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "paypal" && (
            <div className="space-y-2">
              <Label htmlFor="paypal-email">PayPal E-Mail</Label>
              <Input
                id="paypal-email"
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="deine@email.com"
              />
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-holder">Kontoinhaber</Label>
                <Input
                  id="account-holder"
                  value={bankDetails.accountHolder}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                  placeholder="Max Mustermann"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  value={bankDetails.iban}
                  onChange={(e) => setBankDetails({ ...bankDetails, iban: e.target.value })}
                  placeholder="DE12 3456 7890 1234 5678 90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bic">BIC</Label>
                <Input
                  id="bic"
                  value={bankDetails.bic}
                  onChange={(e) => setBankDetails({ ...bankDetails, bic: e.target.value })}
                  placeholder="ABCDEFGHIJK"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSellTokens}
            disabled={isProcessing || isSuccess}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            {isProcessing ? "Wird verarbeitet..." : isSuccess ? "Erfolgreich eingetauscht!" : "In Bargeld umwandeln"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

