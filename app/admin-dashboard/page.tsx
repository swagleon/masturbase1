"use client"

import { useEffect, useState } from "react"
import AdminAuthCheck from "@/components/admin-auth-check"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Users, UserCheck, DollarSign, Coins, TrendingUp, FileText } from "lucide-react"
import { adminService } from "@/lib/admin-service"
import FinanceChart from "@/components/admin/finance-chart"
import TokensChart from "@/components/admin/tokens-chart"
import UsersChart from "@/components/admin/users-chart"
import PayoutSystem from "@/components/admin/payout-system"
import TaxPayment from "@/components/admin/tax-payment"
import FinancialReport from "@/components/admin/financial-report"
import ExpenseManagement from "@/components/admin/expense-management"
import TransferSystem from "@/components/admin/transfer-system"

export default function AdminDashboardPage() {
  const [timeframe, setTimeframe] = useState<"day" | "month" | "year">("month")
  const [stats, setStats] = useState(adminService.getStats())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Refresh stats every 30 seconds
    const interval = setInterval(() => {
      setStats(adminService.getStats())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleGenerateReport = () => {
    setIsLoading(true)
    setTimeout(() => {
      adminService.generateFinancialReport()
      setIsLoading(false)
    }, 1500)
  }

  return (
    <AdminAuthCheck>
      <AdminLayout>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Herzlich Willkommen CEO von Masturbase: André Kindt</h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Umsatz (Gesamt)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.revenue.toLocaleString("de-DE")} €</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.revenueChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={stats.revenueChange >= 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(stats.revenueChange)}% seit letztem Monat
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.profit.toLocaleString("de-DE")} €</div>
                <div className="text-xs text-muted-foreground">Nach Abzug von Kosten, Rabatten und USt.</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tokens verkauft</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.tokensSold.toLocaleString("de-DE")}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.tokensSoldChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={stats.tokensSoldChange >= 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(stats.tokensSoldChange)}% seit letztem Monat
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Umsatzsteuer (Monat)</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.vat.toLocaleString("de-DE")} €</div>
                <div className="text-xs text-muted-foreground">19% vom Nettoumsatz</div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tokens im Umlauf</CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.tokensCirculating.toLocaleString("de-DE")}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Registrierte User</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.registeredUsers.toLocaleString("de-DE")}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Aktive User</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString("de-DE")}</div>
                <div className="text-xs text-muted-foreground">
                  {((stats.activeUsers / stats.registeredUsers) * 100).toFixed(1)}% der registrierten User
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Card>
            <CardHeader>
              <CardTitle>Finanzübersicht</CardTitle>
              <CardDescription>Umsatz und Profit im Zeitverlauf</CardDescription>
              <div className="flex justify-end">
                <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as "day" | "month" | "year")}>
                  <TabsList>
                    <TabsTrigger value="day">Tag</TabsTrigger>
                    <TabsTrigger value="month">Monat</TabsTrigger>
                    <TabsTrigger value="year">Jahr</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <FinanceChart timeframe={timeframe} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Token-Verkäufe</CardTitle>
                <CardDescription>Verkaufte Tokens im Zeitverlauf</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <TokensChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User-Aktivität</CardTitle>
                <CardDescription>Registrierungen und aktive User</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <UsersChart />
              </CardContent>
            </Card>
          </div>

          {/* Payout System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Auszahlungssystem</CardTitle>
                <CardDescription>Profit auf Ihr Konto überweisen</CardDescription>
              </CardHeader>
              <CardContent>
                <PayoutSystem />
              </CardContent>
            </Card>

            <TransferSystem />

            <Card>
              <CardHeader>
                <CardTitle>Umsatzsteuer-Zahlung</CardTitle>
                <CardDescription>Umsatzsteuer an das Finanzamt überweisen</CardDescription>
              </CardHeader>
              <CardContent>
                <TaxPayment />
              </CardContent>
            </Card>
          </div>

          {/* Financial Report */}
          <Card>
            <CardHeader>
              <CardTitle>Finanzberichte</CardTitle>
              <CardDescription>Erstellen und herunterladen Sie detaillierte Finanzberichte</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialReport />
            </CardContent>
          </Card>

          {/* Expense Management */}
          <ExpenseManagement />
        </div>
      </AdminLayout>
    </AdminAuthCheck>
  )
}

