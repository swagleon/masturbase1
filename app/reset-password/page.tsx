"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tokenValid, setTokenValid] = useState(false)

  useEffect(() => {
    // Überprüfe, ob der Token gültig ist
    if (!token) {
      setError("Ungültiger oder fehlender Token. Bitte fordere einen neuen Link an.")
      setIsValidating(false)
      return
    }

    // Simuliere die Überprüfung des Tokens
    setTimeout(() => {
      setTokenValid(true)
      setIsValidating(false)
    }, 1000)
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validiere die Passwörter
    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein.")
      setIsLoading(false)
      return
    }

    try {
      // Simuliere das Zurücksetzen des Passworts
      setTimeout(() => {
        setIsLoading(false)
        setIsSuccess(true)

        // Weiterleitung zum Login nach 3 Sekunden
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      }, 1500)
    } catch (err) {
      setError("Beim Zurücksetzen des Passworts ist ein Fehler aufgetreten. Bitte versuche es später erneut.")
      setIsLoading(false)
    }
  }

  if (isValidating) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500 mb-4" />
            <p>Token wird überprüft...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Passwort zurücksetzen</CardTitle>
          <CardDescription>Gib dein neues Passwort ein.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!tokenValid ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Der Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen. Bitte fordere einen neuen Link
                  an.
                </AlertDescription>
              </Alert>
              <Button asChild className="w-full">
                <Link href="/forgot-password">Neuen Link anfordern</Link>
              </Button>
            </div>
          ) : isSuccess ? (
            <div className="space-y-4">
              <Alert className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Dein Passwort wurde erfolgreich zurückgesetzt. Du wirst in Kürze zum Login weitergeleitet.
                </AlertDescription>
              </Alert>
              <Button asChild className="w-full">
                <Link href="/login">Zum Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Neues Passwort</Label>
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
              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
                {isLoading ? "Wird zurückgesetzt..." : "Passwort zurücksetzen"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

