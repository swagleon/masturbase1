"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { tokenPackages, paymentMethods, tokenService } from "@/lib/token-service"
import { Coins } from "lucide-react"

export default function TokenPurchaseModal() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePurchase = () => {
    if (!selectedPackage || !selectedPaymentMethod) return

    setIsProcessing(true)

    // Simuliere eine Zahlungsverarbeitung
    setTimeout(() => {
      const packageInfo = tokenPackages.find((pkg) => pkg.id === selectedPackage)
      if (packageInfo) {
        tokenService.addTokens(packageInfo.amount)
      }

      setIsProcessing(false)
      setIsSuccess(true)

      // Zurücksetzen nach 3 Sekunden
      setTimeout(() => {
        setIsSuccess(false)
        setSelectedPackage(null)
        setSelectedPaymentMethod(null)
      }, 3000)
    }, 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <span>Tokens kaufen</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tokens kaufen</DialogTitle>
          <DialogDescription>Je mehr Tokens du kaufst, desto weniger kosten sie! 1 Token = 0,10 €</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="packages">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="packages">Token-Pakete</TabsTrigger>
            <TabsTrigger value="payment">Zahlungsmethode</TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {tokenPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all ${selectedPackage === pkg.id ? "border-rose-500 bg-rose-50 dark:bg-rose-950/20" : ""}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{pkg.amount} Tokens</CardTitle>
                    <CardDescription>Spare {Math.round((1 - pkg.price / (pkg.amount * 0.1)) * 100)}%</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {pkg.price} {pkg.currency}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <RadioGroup value={selectedPaymentMethod || ""} onValueChange={setSelectedPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    {method.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            onClick={handlePurchase}
            disabled={!selectedPackage || !selectedPaymentMethod || isProcessing || isSuccess}
            className="w-full bg-orange-500 hover:bg-orange-600" // Geändert von rose-500/600 zu orange-500/600
          >
            {isProcessing ? "Verarbeite Zahlung..." : isSuccess ? "Tokens erfolgreich gekauft!" : "Jetzt kaufen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

