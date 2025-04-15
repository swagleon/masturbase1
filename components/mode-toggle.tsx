"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Languages, Sparkles, Waves, Code } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

// Sprachoptionen alphabetisch sortiert
const languages = [
  { code: "ar", name: "Arabisch" },
  { code: "bg", name: "Bulgarisch" },
  { code: "zh", name: "Chinesisch" },
  { code: "de", name: "Deutsch" },
  { code: "en", name: "Englisch" },
  { code: "et", name: "Estnisch" },
  { code: "fi", name: "Finnisch" },
  { code: "fr", name: "Französisch" },
  { code: "ka", name: "Georgisch" },
  { code: "hi", name: "Indisch" },
  { code: "it", name: "Italienisch" },
  { code: "ja", name: "Japanisch" },
  { code: "lv", name: "Lettisch" },
  { code: "lt", name: "Litauisch" },
  { code: "nl", name: "Niederländisch" },
  { code: "no", name: "Norwegisch" },
  { code: "pt", name: "Portugiesisch" },
  { code: "ro", name: "Rumänisch" },
  { code: "ru", name: "Russisch" },
  { code: "sv", name: "Schwedisch" },
  { code: "sr", name: "Serbisch" },
  { code: "es", name: "Spanisch" },
  { code: "tr", name: "Türkisch" },
  { code: "hu", name: "Ungarisch" },
]

// Übersetzungen für häufig verwendete Texte
const translations = {
  de: {
    login: "Anmelden",
    register: "Registrieren",
    explore: "Entdecken",
    following: "Gefolgt",
    tags: "Tags",
    settings: "Einstellungen",
    profile: "Profil",
    logout: "Abmelden",
    buyTokens: "Tokens kaufen",
    sellTokens: "Tokens verkaufen",
    goLive: "Live gehen",
    search: "Suche",
    welcome: "Willkommen",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    systemMode: "Systemmodus",
    beachMode: "Strandmodus",
    rainbowMode: "Regenbogenmodus",
    matrixMode: "Matrix-Modus",
    language: "Sprache",
    chooseLanguage: "Sprache wählen",
  },
  en: {
    login: "Login",
    register: "Register",
    explore: "Explore",
    following: "Following",
    tags: "Tags",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
    buyTokens: "Buy Tokens",
    sellTokens: "Sell Tokens",
    goLive: "Go Live",
    search: "Search",
    welcome: "Welcome",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    systemMode: "System Mode",
    beachMode: "Beach Mode",
    rainbowMode: "Rainbow Mode",
    matrixMode: "Matrix Mode",
    language: "Language",
    chooseLanguage: "Choose Language",
  },
  // Weitere Sprachen würden hier hinzugefügt
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [matrixMode, setMatrixMode] = useState(false)
  const [rainbowMode, setRainbowMode] = useState(false)
  const [raindrops, setRaindrops] = useState<
    Array<{ id: number; x: number; char: string; speed: number; opacity: number }>
  >([])
  const [unicorns, setUnicorns] = useState<
    Array<{ id: number; x: number; y: number; size: number; rotation: number; speed: number }>
  >([])
  const [rainbows, setRainbows] = useState<
    Array<{ id: number; x: number; y: number; width: number; height: number; opacity: number }>
  >([])
  const [cats, setCats] = useState<
    Array<{ id: number; x: number; y: number; size: number; opacity: number; speed: number; direction: number }>
  >([])
  const [rabbits, setRabbits] = useState<
    Array<{ id: number; x: number; y: number; size: number; rotation: number; speed: number }>
  >([])
  const [currentLanguage, setCurrentLanguage] = useState("de")

  // Initialisiere die Sprache beim Laden
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "de"
    setCurrentLanguage(savedLanguage)

    // Setze ein data-language Attribut auf dem HTML-Element
    document.documentElement.setAttribute("data-language", savedLanguage)

    // Löse ein benutzerdefiniertes Event aus, um andere Komponenten zu informieren
    const event = new CustomEvent("languageChanged", { detail: { language: savedLanguage } })
    document.dispatchEvent(event)
  }, [])

  // Matrix-Effekt
  useEffect(() => {
    if (!matrixMode) {
      document.documentElement.classList.remove("matrix-mode")
      return
    }

    document.documentElement.classList.add("matrix-mode")

    // Erstelle Regentropfen
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~"
    const screenWidth = window.innerWidth
    const initialDrops = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * screenWidth),
      char: chars.charAt(Math.floor(Math.random() * chars.length)),
      speed: Math.random() * 2 + 1,
      opacity: Math.random(),
    }))

    setRaindrops(initialDrops)

    const interval = setInterval(() => {
      setRaindrops((prev) =>
        prev.map((drop) => {
          // Wenn der Tropfen unten angekommen ist, setze ihn zurück nach oben
          if (drop.speed > window.innerHeight) {
            return {
              ...drop,
              speed: Math.random() * 2 + 1,
              char: chars.charAt(Math.floor(Math.random() * chars.length)),
              opacity: Math.random(),
            }
          }

          // Bewege den Tropfen nach unten
          return {
            ...drop,
            speed: drop.speed + Math.random() * 2 + 1,
            char: Math.random() > 0.9 ? chars.charAt(Math.floor(Math.random() * chars.length)) : drop.char,
          }
        }),
      )
    }, 50) // Schnellere Animation

    return () => {
      clearInterval(interval)
      document.documentElement.classList.remove("matrix-mode")
    }
  }, [matrixMode])

  // Regenbogen-Effekt mit Katzen und Hasen
  useEffect(() => {
    if (!rainbowMode) {
      document.documentElement.classList.remove("rainbow-mode")
      return
    }

    document.documentElement.classList.add("rainbow-mode")

    // Erstelle Einhörner
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const initialUnicorns = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      size: 30 + Math.random() * 30,
      rotation: Math.random() * 360,
      speed: 1 + Math.random() * 3,
    }))

    setUnicorns(initialUnicorns)

    // Erstelle Regenbögen
    const initialRainbows = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      width: 100 + Math.random() * 200,
      height: 50 + Math.random() * 100,
      opacity: 0.3 + Math.random() * 0.4,
    }))

    setRainbows(initialRainbows)

    // Erstelle bunte Katzen
    const initialCats = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      size: 25 + Math.random() * 20,
      opacity: 0.7 + Math.random() * 0.3,
      speed: 1 + Math.random() * 2,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))

    setCats(initialCats)

    // Erstelle weiße Hasen mit Taschenuhren
    const initialRabbits = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      size: 30 + Math.random() * 15,
      rotation: Math.random() * 20 - 10,
      speed: 1.5 + Math.random() * 1.5,
    }))

    setRabbits(initialRabbits)

    const interval = setInterval(() => {
      // Bewege Einhörner
      setUnicorns((prev) =>
        prev.map((unicorn) => {
          let newX = unicorn.x + unicorn.speed
          const newRotation = unicorn.rotation + 2

          if (newX > screenWidth + 100) {
            newX = -100
          }

          return {
            ...unicorn,
            x: newX,
            rotation: newRotation % 360,
          }
        }),
      )

      // Animiere Regenbögen
      setRainbows((prev) =>
        prev.map((rainbow) => {
          const newOpacity = rainbow.opacity + (Math.random() * 0.1 - 0.05)
          return {
            ...rainbow,
            opacity: Math.max(0.2, Math.min(0.7, newOpacity)),
          }
        }),
      )

      // Bewege und animiere Katzen
      setCats((prev) =>
        prev.map((cat) => {
          const newX = cat.x + cat.speed * cat.direction
          const newOpacity = cat.opacity + (Math.random() * 0.1 - 0.05)

          // Ändere Richtung, wenn Katze den Bildschirmrand erreicht
          if (newX > screenWidth || newX < 0) {
            return {
              ...cat,
              x: newX > screenWidth ? screenWidth : 0,
              direction: -cat.direction,
              opacity: Math.max(0.3, Math.min(1, newOpacity)),
            }
          }

          return {
            ...cat,
            x: newX,
            opacity: Math.max(0.3, Math.min(1, newOpacity)),
          }
        }),
      )

      // Bewege Hasen
      setRabbits((prev) =>
        prev.map((rabbit) => {
          let newX = rabbit.x - rabbit.speed // Hasen bewegen sich von rechts nach links
          const newRotation = rabbit.rotation + (Math.random() * 2 - 1)

          if (newX < -100) {
            newX = screenWidth + 50
          }

          return {
            ...rabbit,
            x: newX,
            rotation: Math.max(-15, Math.min(15, newRotation)),
          }
        }),
      )
    }, 50)

    return () => {
      clearInterval(interval)
      document.documentElement.classList.remove("rainbow-mode")
    }
  }, [rainbowMode])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    localStorage.setItem("language", langCode)

    // Setze ein data-language Attribut auf dem HTML-Element
    document.documentElement.setAttribute("data-language", langCode)

    // Löse ein benutzerdefiniertes Event aus, um andere Komponenten zu informieren
    const event = new CustomEvent("languageChanged", { detail: { language: langCode } })
    document.dispatchEvent(event)
  }

  // Funktion zum Übersetzen von Texten
  const translate = (key: string) => {
    if (
      translations[currentLanguage as keyof typeof translations] &&
      (translations[currentLanguage as keyof typeof translations] as any)[key]
    ) {
      return (translations[currentLanguage as keyof typeof translations] as any)[key]
    }
    // Fallback auf Deutsch
    return (translations["de"] as any)[key] || key
  }

  return (
    <>
      {matrixMode && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {raindrops.map((drop) => (
            <div
              key={drop.id}
              className="absolute text-green-500 font-mono text-sm"
              style={{
                left: `${drop.x}px`,
                top: `${drop.speed}px`,
                opacity: drop.opacity,
                textShadow: "0 0 5px #0f0, 0 0 10px #0f0",
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>
      )}

      {rainbowMode && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Regenbögen */}
          {rainbows.map((rainbow) => (
            <div
              key={rainbow.id}
              className="absolute rounded-full"
              style={{
                left: `${rainbow.x}px`,
                top: `${rainbow.y}px`,
                width: `${rainbow.width}px`,
                height: `${rainbow.height}px`,
                background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
                opacity: rainbow.opacity,
                filter: "blur(5px)",
              }}
            />
          ))}

          {/* Einhörner */}
          {unicorns.map((unicorn) => (
            <div
              key={unicorn.id}
              className="absolute"
              style={{
                left: `${unicorn.x}px`,
                top: `${unicorn.y}px`,
                transform: `rotate(${unicorn.rotation}deg)`,
                fontSize: `${unicorn.size}px`,
              }}
            >
              🦄
            </div>
          ))}

          {/* Bunte Katzen */}
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="absolute transition-opacity duration-1000"
              style={{
                left: `${cat.x}px`,
                top: `${cat.y}px`,
                fontSize: `${cat.size}px`,
                opacity: cat.opacity,
                transform: `scaleX(${cat.direction})`,
                filter: "hue-rotate(" + cat.id * 45 + "deg)",
              }}
            >
              🐱
            </div>
          ))}

          {/* Weiße Hasen mit Taschenuhren */}
          {rabbits.map((rabbit) => (
            <div
              key={rabbit.id}
              className="absolute"
              style={{
                left: `${rabbit.x}px`,
                top: `${rabbit.y}px`,
                fontSize: `${rabbit.size}px`,
                transform: `rotate(${rabbit.rotation}deg)`,
              }}
            >
              <div className="relative">
                <span className="text-white">🐇</span>
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs bg-white bg-opacity-80 rounded-full p-1 whitespace-nowrap"
                  style={{ fontSize: `${rabbit.size * 0.3}px` }}
                >
                  Alice im Wunderland
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Languages className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">{translate("chooseLanguage")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{translate("chooseLanguage")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={currentLanguage === lang.code ? "bg-accent" : ""}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{translate("lightMode")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setTheme("light")
                setMatrixMode(false)
                setRainbowMode(false)
              }}
            >
              <Sun className="mr-2 h-4 w-4" />
              {translate("lightMode")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("dark")
                setMatrixMode(false)
                setRainbowMode(false)
              }}
            >
              <Moon className="mr-2 h-4 w-4" />
              {translate("darkMode")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("system")
                setMatrixMode(false)
                setRainbowMode(false)
              }}
            >
              <Sun className="mr-2 h-4 w-4" />
              {translate("systemMode")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setTheme("beach")
                setMatrixMode(false)
                setRainbowMode(false)
              }}
            >
              <Waves className="mr-2 h-4 w-4" />
              {translate("beachMode")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("light")
                setMatrixMode(false)
                setRainbowMode(true)
              }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {translate("rainbowMode")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("dark")
                setMatrixMode(true)
                setRainbowMode(false)
              }}
            >
              <Code className="mr-2 h-4 w-4" />
              {translate("matrixMode")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

// Exportiere eine Hilfsfunktion für die Übersetzung, die andere Komponenten verwenden können
export function getTranslation(key: string, language = "de") {
  if (
    translations[language as keyof typeof translations] &&
    (translations[language as keyof typeof translations] as any)[key]
  ) {
    return (translations[language as keyof typeof translations] as any)[key]
  }
  // Fallback auf Deutsch
  return (translations["de"] as any)[key] || key
}

