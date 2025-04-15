"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Lock } from "lucide-react"
import Logo from "@/components/logo"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Hardcoded admin credentials check
    if (username === "andrekindt@hotmail.de" && password === "Tiger888$") {
      // Simulate API call
      setTimeout(() => {
        setIsAuthenticated(true)
        setIsLoading(false)
      }, 1000)
    } else {
      setError("Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.")
      setIsLoading(false)
    }
  }

  const handleUserLogin = () => {
    // Simulate premium user login
    localStorage.setItem("userAuthenticated", "true")
    localStorage.setItem("userRole", "premium")
    router.push("/")
  }

  const handleAdminLogin = () => {
    // Simulate admin login
    localStorage.setItem("adminAuthenticated", "true")
    router.push("/admin-dashboard")
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">Bitte melden Sie sich mit Ihren CEO-Zugangsdaten an</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isAuthenticated ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center">Herzlich Willkommen CEO von Masturbase: André Kindt</h3>
              <p className="text-center mb-4">Wie möchten Sie sich anmelden?</p>
              <div className="flex flex-col gap-3">
                <Button onClick={handleUserLogin} className="w-full bg-rose-500 hover:bg-rose-600">
                  Als Premium Mitglied anmelden
                </Button>
                <Button onClick={handleAdminLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                  Als Admin anmelden
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Benutzername</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Wird angemeldet..." : "Anmelden"}
              </Button>
            </form>
          )}

          <div className="mt-4 flex items-center justify-center text-sm">
            <Lock className="h-3 w-3 mr-1" />
            <span className="text-muted-foreground">Nur für autorisierte Administratoren</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

