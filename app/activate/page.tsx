"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { emailService } from "@/lib/email-service"
import Logo from "@/components/logo"

export default function ActivatePage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setStatus("error")
        setMessage("Ungültiger Aktivierungslink. Bitte überprüfen Sie Ihre E-Mail oder registrieren Sie sich erneut.")
        return
      }

      try {
        const result = await emailService.verifyActivationToken(token, email)

        if (result.success) {
          setStatus("success")
          setMessage("Ihre E-Mail-Adresse wurde erfolgreich verifiziert. Sie können sich jetzt anmelden.")
        } else {
          setStatus("error")
          setMessage("Der Aktivierungslink ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen Link an.")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Bei der Aktivierung Ihres Kontos ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.")
      }
    }

    verifyEmail()
  }, [token, email])

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {status === "loading" && "Konto wird aktiviert..."}
            {status === "success" && "Konto aktiviert!"}
            {status === "error" && "Aktivierung fehlgeschlagen"}
          </CardTitle>
          <CardDescription className="text-center">
            {status === "loading" && "Bitte warten Sie, während wir Ihr Konto aktivieren."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {status === "loading" && <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />}

          {status === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-center">{message}</p>
              <Button asChild className="mt-4">
                <Link href="/login">Zum Login</Link>
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <p className="text-center">{message}</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/register">Zurück zur Registrierung</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

