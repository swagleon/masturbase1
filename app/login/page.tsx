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

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validiere die Eingaben
    if (!identifier || !password) {
      setError("Bitte gib deine Anmeldedaten ein.")
      setIsLoading(false)
      return
    }

    try {
      // Simuliere API-Aufruf
      setTimeout(() => {
        // In einer echten Anwendung würde hier die Authentifizierung stattfinden
        // und überprüft werden, ob es sich um eine E-Mail oder einen Benutzernamen handelt

        setIsLoading(false)

        // Erfolgreiche Anmeldung simulieren
        router.push("/")
      }, 1500)
    } catch (err) {
      setError("Bei der Anmeldung ist ein Fehler aufgetreten. Bitte versuche es später erneut.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Anmelden</CardTitle>
          <CardDescription>Gib deine Anmeldedaten ein, um auf dein Konto zuzugreifen</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">E-Mail oder Benutzername</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="name@example.com oder benutzername"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
                <Link href="/forgot-password" className="text-sm text-rose-500 hover:text-rose-600">
                  Passwort vergessen?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Angemeldet bleiben
              </Label>
            </div>
            <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
              {isLoading ? "Wird angemeldet..." : "Anmelden"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Noch kein Konto?{" "}
            <Link href="/register" className="text-rose-500 hover:text-rose-600 font-medium">
              Jetzt registrieren
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

