"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, Coins, Video, DollarSign, PlayCircle, Crown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle, getTranslation } from "./mode-toggle"
import TokenPurchaseModal from "./token-purchase-modal"
import TokenSellModal from "./token-sell-modal"
import { tokenService } from "@/lib/token-service"
import Logo from "@/components/logo"
import PremiumModal from "./premium-modal"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [membershipType, setMembershipType] = useState("")
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("de")

  // Mock data for followed streams
  const followedStats = {
    liveNow: 12,
    totalFollowed: 45,
  }

  useEffect(() => {
    // In einer echten Anwendung würden diese Daten vom Server geladen
    setTokenBalance(tokenService.getTokenBalance())
    setMembershipType(tokenService.getMembershipType())

    // Simuliere einen Login nach 2 Sekunden
    const timer = setTimeout(() => {
      setIsLoggedIn(true)
    }, 2000)

    // Holen der aktuellen Sprache
    const savedLanguage = localStorage.getItem("language") || "de"
    setCurrentLanguage(savedLanguage)

    // Event-Listener für Sprachänderungen
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail.language)
    }

    document.addEventListener("languageChanged", handleLanguageChange as EventListener)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("languageChanged", handleLanguageChange as EventListener)
    }
  }, [])

  const handleTokenClick = () => {
    setIsSellModalOpen(true)
  }

  const handlePremiumClick = () => {
    setIsPremiumModalOpen(true)
  }

  // Funktion zum Übersetzen
  const translate = (key: string) => {
    return getTranslation(key, currentLanguage)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link href="/explore" className="text-lg font-semibold">
                {translate("explore")}
              </Link>
              <Link href="/videos" className="text-lg font-semibold">
                Videos
              </Link>
              <Link href="/tags" className="text-lg font-semibold">
                Tags
              </Link>
              <Link href="/following" className="text-lg font-semibold">
                {translate("following")} ({followedStats.liveNow}/{followedStats.totalFollowed})
              </Link>
              <button onClick={handlePremiumClick} className="text-lg font-semibold text-left flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                Premium
              </button>
              {!isLoggedIn && (
                <>
                  <Link href="/login" className="text-lg font-semibold">
                    {translate("login")}
                  </Link>
                  <Link href="/register" className="text-lg font-semibold">
                    {translate("register")}
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link href="/broadcast" className="text-lg font-semibold">
                    {translate("goLive")}
                  </Link>
                  <button onClick={() => setIsSellModalOpen(true)} className="text-left text-lg font-semibold">
                    {translate("sellTokens")}
                  </button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/explore" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {translate("explore")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/videos" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Videos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/tags" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tags</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/following" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {translate("following")} ({followedStats.liveNow}/{followedStats.totalFollowed})
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={handlePremiumClick} className={navigationMenuTriggerStyle() + " flex items-center"}>
                  <Crown className="h-4 w-4 mr-1 text-yellow-500" />
                  Premium
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />

          {isLoggedIn ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm">{membershipType}</span>
                <button
                  onClick={handleTokenClick}
                  className="flex items-center gap-1 text-sm font-bold hover:text-primary transition-colors"
                >
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span>{tokenBalance}</span>
                </button>
                <TokenPurchaseModal />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-rose-500" />
                <span className="sr-only">Benachrichtigungen</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="@username" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">username</p>
                      <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      {translate("profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="w-full">
                      {translate("settings")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/broadcast" className="w-full flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      {translate("goLive")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsSellModalOpen(true)}>
                    <div className="w-full flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {translate("sellTokens")}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>{translate("logout")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">{translate("login")}</Link>
              </Button>
              <Button className="bg-rose-500 hover:bg-rose-600" asChild>
                <Link href="/register">{translate("register")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Token Sell Modal */}
      <TokenSellModal open={isSellModalOpen} onOpenChange={setIsSellModalOpen} />

      {/* Premium Modal */}
      <PremiumModal open={isPremiumModalOpen} onOpenChange={setIsPremiumModalOpen} />
    </header>
  )
}

