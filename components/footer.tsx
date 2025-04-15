import Link from "next/link"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} MasturBase. Alle Rechte vorbehalten.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Rechtliches</h3>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Nutzungsbedingungen
            </Link>
            <Link href="/agb" className="text-muted-foreground hover:text-foreground">
              Allgemeine Geschäftsbedingungen
            </Link>
            <Link href="/datenschutz" className="text-muted-foreground hover:text-foreground">
              Datenschutzerklärung
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
              Cookie-Einstellungen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

