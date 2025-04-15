"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/logo"

export default function RegistrationConfirmationPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Überprüfen Sie Ihre E-Mail</CardTitle>
          <CardDescription className="text-center">
            Wir haben eine Bestätigungs-E-Mail an {email} gesendet.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-full">
            <Mail className="h-12 w-12 text-blue-500" />
          </div>

          <div className="text-center space-y-2">
            <p>Bitte klicken Sie auf den Aktivierungslink in der E-Mail, um Ihr Konto zu aktivieren.</p>
            <p className="text-sm text-muted-foreground">
              Wenn Sie keine E-Mail erhalten haben, überprüfen Sie bitte Ihren Spam-Ordner oder fordern Sie eine neue
              Bestätigungs-E-Mail an.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
            <Button variant="outline" className="flex-1">
              Neue E-Mail anfordern
            </Button>
            <Button asChild className="flex-1">
              <Link href="/login">
                Zum Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

