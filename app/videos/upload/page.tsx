"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, X, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VideoUploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Überprüfe, ob es sich um ein Video handelt
    if (!file.type.startsWith("video/")) {
      setError("Bitte wähle eine Videodatei aus.")
      return
    }

    // Überprüfe die Dateigröße (max. 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("Die Videodatei darf maximal 100MB groß sein.")
      return
    }

    setVideoFile(file)
    setError(null)

    // Erstelle eine URL für die Vorschau
    const previewUrl = URL.createObjectURL(file)
    setVideoPreview(previewUrl)
  }

  const handleAddTag = () => {
    if (!newTag.trim()) return

    // Entferne Leerzeichen und Sonderzeichen
    const formattedTag = newTag
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")

    if (formattedTag && !tags.includes(formattedTag)) {
      setTags([...tags, formattedTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleUpload = async () => {
    // Validierung
    if (!videoFile) {
      setError("Bitte wähle ein Video aus.")
      return
    }

    if (!title.trim()) {
      setError("Bitte gib einen Titel ein.")
      return
    }

    setIsUploading(true)
    setError(null)

    // Simuliere Upload-Fortschritt
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simuliere API-Aufruf
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)
      setSuccess(true)

      // Weiterleitung nach 2 Sekunden
      setTimeout(() => {
        router.push("/videos")
      }, 2000)
    }, 4000)
  }

  const handleCancel = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
    setVideoFile(null)
    setVideoPreview(null)
    setTitle("")
    setDescription("")
    setTags([])
    setError(null)
    setSuccess(false)
    setUploadProgress(0)
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Video hochladen</h1>

        <Card>
          <CardHeader>
            <CardTitle>Neues Kurzvideo</CardTitle>
            <CardDescription>Lade ein kurzes Video hoch (max. 1 Minute), um für dein Profil zu werben</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Dein Video wurde erfolgreich hochgeladen! Du wirst weitergeleitet...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="video">Video (max. 1 Minute, max. 100MB)</Label>

              {!videoPreview ? (
                <div
                  className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Klicke hier, um ein Video hochzuladen</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, WebM oder MOV</p>
                  <input
                    ref={fileInputRef}
                    id="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="relative rounded-md overflow-hidden">
                  <video src={videoPreview} className="w-full h-auto max-h-[400px] object-contain bg-black" controls />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Gib deinem Video einen aussagekräftigen Titel"
                maxLength={50}
                disabled={isUploading || success}
              />
              <p className="text-xs text-muted-foreground text-right">{title.length}/50</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschreibe dein Video (optional)"
                maxLength={200}
                disabled={isUploading || success}
              />
              <p className="text-xs text-muted-foreground text-right">{description.length}/200</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Füge Tags hinzu (z.B. blonde, fitness)"
                  disabled={isUploading || success}
                />
                <Button onClick={handleAddTag} disabled={!newTag.trim() || isUploading || success}>
                  Hinzufügen
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      #{tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTag(tag)}
                        disabled={isUploading || success}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Upload-Fortschritt</Label>
                  <span className="text-sm">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-rose-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Hinweis zur Videolänge</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Kurzvideos dürfen maximal 1 Minute lang sein. Längere Videos werden automatisch gekürzt. Für längere
                  Inhalte nutze bitte die Livestream-Funktion.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancel} disabled={isUploading || success}>
              Abbrechen
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!videoFile || !title.trim() || isUploading || success}
              className="bg-rose-500 hover:bg-rose-600"
            >
              {isUploading ? "Wird hochgeladen..." : "Video hochladen"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

