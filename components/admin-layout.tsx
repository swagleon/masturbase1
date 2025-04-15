"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
// Importiere das ID-Card-Icon
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  BarChart3,
  LogOut,
  Menu,
  ChevronRight,
  BadgeIcon as IdCard,
} from "lucide-react"
import Logo from "@/components/logo"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin-login")
  }

  // Füge den Menüpunkt für die Ausweisverifizierung hinzu (nach dem Benutzer-Menüpunkt)
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin-dashboard",
    },
    {
      title: "Finanzen",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin-dashboard/finances",
    },
    {
      title: "Benutzer",
      icon: <Users className="h-5 w-5" />,
      href: "/admin-dashboard/users",
    },
    {
      title: "Ausweisverifizierung",
      icon: <IdCard className="h-5 w-5" />,
      href: "/admin-dashboard/verification",
    },
    {
      title: "Zahlungen",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/admin-dashboard/payments",
    },
    {
      title: "Einstellungen",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin-dashboard/settings",
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-slate-900 text-white ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          <div className={`flex items-center ${!isSidebarOpen && "justify-center w-full"}`}>
            {isSidebarOpen ? (
              <Link href="/admin-dashboard" className="flex items-center">
                <Logo />
                <span className="ml-2 font-bold">Admin</span>
              </Link>
            ) : (
              <Link href="/admin-dashboard">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="font-bold text-lg">M</span>
                </div>
              </Link>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-slate-800"
          >
            {isSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md ${
                  pathname === item.href
                    ? "bg-blue-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                } ${!isSidebarOpen && "justify-center"}`}
              >
                {item.icon}
                {isSidebarOpen && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-700">
          <Button
            variant="ghost"
            className={`text-slate-300 hover:bg-slate-800 hover:text-white w-full ${
              !isSidebarOpen && "justify-center"
            }`}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-2">Abmelden</span>}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

