"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Importiere den E-Mail-Service
import { emailService } from "@/lib/email-service"
import { db } from "@/lib/database-schema"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [ageVerified, setAgeVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  // Ersetze die handleSubmit-Funktion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validiere die Eingaben
    if (password !== confirmPassword) {
      setIsLoading(false)
      // Hier würde eine Fehlermeldung angezeigt werden
      return
    }

    try {
      // Registriere den Benutzer in der Datenbank
      const userId = db.addUser({
        username,
        email,
        password, // In der Praxis würde das Passwort gehasht werden
        isEmailVerified: false,
        isAgeVerified: false,
        registrationDate: new Date(),
        role: "user",
        status: "pending",
        tokens: 0,
        membershipType: "basic",
      })

      // Sende die Willkommens-E-Mail mit Aktivierungslink
      const emailResult = await emailService.sendWelcomeEmail(email, username)

      if (emailResult.success) {
        // Weiterleitung zur Bestätigungsseite
        setTimeout(() => {
          setIsLoading(false)
          router.push("/register/confirmation?email=" + encodeURIComponent(email))
        }, 1500)
      } else {
        setIsLoading(false)
        // Hier würde eine Fehlermeldung angezeigt werden
      }
    } catch (error) {
      setIsLoading(false)
      // Hier würde eine Fehlermeldung angezeigt werden
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Konto erstellen</CardTitle>
          <CardDescription>Erstelle ein Konto, um mit dem Streaming zu beginnen</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-rose-500/10 text-rose-500 border-rose-500/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Diese Seite enthält Inhalte für Erwachsene. Du musst mindestens 18 Jahre alt sein, um dich zu
              registrieren.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                placeholder="dein_benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Passwort bestätigen</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="age"
                checked={ageVerified}
                onCheckedChange={(checked) => setAgeVerified(checked as boolean)}
                required
              />
              <Label htmlFor="age" className="text-sm font-normal">
                Ich bestätige, dass ich mindestens 18 Jahre alt bin
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                required
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                Ich stimme den{" "}
                <Link href="/terms" className="text-rose-500 hover:text-rose-600">
                  Nutzungsbedingungen
                </Link>{" "}
                und{" "}
                <Link href="/privacy" className="text-rose-500 hover:text-rose-600">
                  Datenschutzrichtlinien
                </Link>{" "}
                zu
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600"
              disabled={isLoading || !agreeTerms || !ageVerified}
            >
              {isLoading ? "Wird registriert..." : "Registrieren"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Bereits ein Konto?{" "}
            <Link href="/login" className="text-rose-500 hover:text-rose-600 font-medium">
              Anmelden
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

