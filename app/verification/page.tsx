"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { db } from "@/lib/database-schema"

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState("camera")
  const [frontImage, setFrontImage] = useState<string | null>(null)
  const [backImage, setBackImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError(
        "Kamera konnte nicht gestartet werden. Bitte überprüfen Sie die Berechtigungen oder verwenden Sie die Upload-Option.",
      )
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCapturing(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageDataUrl = canvas.toDataURL("image/jpeg")

        if (!frontImage) {
          setFrontImage(imageDataUrl)
        } else if (!backImage) {
          setBackImage(imageDataUrl)
          stopCamera()
        }
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (side === "front") {
          setFrontImage(event.target?.result as string)
        } else {
          setBackImage(event.target?.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const resetImage = (side: "front" | "back") => {
    if (side === "front") {
      setFrontImage(null)
    } else {
      setBackImage(null)
    }
  }

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      setError("Bitte laden Sie Bilder von beiden Seiten Ihres Ausweises hoch.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Hier würde in einer echten Anwendung die Altersverifikation stattfinden
      // Entweder durch eine KI oder durch manuelle Überprüfung

      // Simuliere eine Verzögerung für die Verarbeitung
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simuliere eine erfolgreiche Verifizierung
      // In einer echten Anwendung würde hier das Ergebnis der Altersverifikation verwendet
      const isOver18 = true

      if (isOver18) {
        // Aktualisiere den Benutzer in der Datenbank
        // In einer echten Anwendung würde hier die Benutzer-ID aus der Session verwendet
        const userId = "user123"
        db.updateUser(userId, {
          isAgeVerified: true,
          idDocuments: {
            frontImage: frontImage,
            backImage: backImage,
            verificationStatus: "approved",
            verificationDate: new Date(),
          },
        })

        setSuccess(true)
      } else {
        setError(
          "Die Altersverifikation war nicht erfolgreich. Bitte stellen Sie sicher, dass Sie mindestens 18 Jahre alt sind und Ihr Ausweis gültig ist.",
        )
      }
    } catch (err) {
      console.error("Error during verification:", err)
      setError(
        "Bei der Verarbeitung Ihrer Ausweisdaten ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Altersverifikation</CardTitle>
            <CardDescription>
              Um als Streamer aktiv zu werden, müssen Sie Ihr Alter verifizieren. Bitte laden Sie Bilder der Vorder- und
              Rückseite Ihres Ausweises hoch.
            </CardDescription>
          </CardHeader>

          {success ? (
            <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-bold">Verifizierung erfolgreich!</h3>
              <p className="text-center">
                Ihre Altersverifikation war erfolgreich. Sie können jetzt mit dem Streaming beginnen.
              </p>
              <Button asChild className="mt-4">
                <a href="/go-live">Zum Streaming-Bereich</a>
              </Button>
            </CardContent>
          ) : (
            <>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="camera">Kamera</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>

                  <TabsContent value="camera" className="space-y-4">
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

                      {!isCapturing && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button onClick={startCamera}>
                            <Camera className="mr-2 h-4 w-4" />
                            Kamera starten
                          </Button>
                        </div>
                      )}
                    </div>

                    {isCapturing && (
                      <div className="flex justify-center">
                        <Button onClick={captureImage}>
                          {!frontImage ? "Vorderseite aufnehmen" : "Rückseite aufnehmen"}
                        </Button>
                      </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Vorderseite des Ausweises</h3>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                          {frontImage ? (
                            <div className="relative">
                              <img
                                src={frontImage || "/placeholder.svg"}
                                alt="Vorderseite des Ausweises"
                                className="max-h-40 mx-auto"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => resetImage("front")}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <label className="cursor-pointer block">
                              <div className="flex flex-col items-center justify-center py-4">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm font-medium">Klicken Sie hier, um ein Bild hochzuladen</p>
                                <p className="text-xs text-muted-foreground mt-1">JPG, PNG oder GIF, max. 5MB</p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, "front")}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Rückseite des Ausweises</h3>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                          {backImage ? (
                            <div className="relative">
                              <img
                                src={backImage || "/placeholder.svg"}
                                alt="Rückseite des Ausweises"
                                className="max-h-40 mx-auto"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => resetImage("back")}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <label className="cursor-pointer block">
                              <div className="flex flex-col items-center justify-center py-4">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm font-medium">Klicken Sie hier, um ein Bild hochzuladen</p>
                                <p className="text-xs text-muted-foreground mt-1">JPG, PNG oder GIF, max. 5MB</p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, "back")}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Wichtige Hinweise:</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Stellen Sie sicher, dass alle Informationen auf dem Ausweis deutlich lesbar sind.</li>
                    <li>Die Bilder werden sicher gespeichert und nur für die Altersverifikation verwendet.</li>
                    <li>Nach erfolgreicher Verifizierung können Sie sofort mit dem Streaming beginnen.</li>
                    <li>
                      Die Verifizierung kann bis zu 24 Stunden dauern, wenn eine manuelle Überprüfung erforderlich ist.
                    </li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={handleSubmit} disabled={!frontImage || !backImage || isSubmitting} className="w-full">
                  {isSubmitting ? "Wird verarbeitet..." : "Ausweis zur Überprüfung einreichen"}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

