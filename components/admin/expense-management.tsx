"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, MoreHorizontal, Plus, Upload, Eye, Trash, FileCheck, FilePlus } from "lucide-react"
import type { Expense } from "@/lib/database-schema"

export default function ExpenseManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: "server",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    receiptImage: null as string | null,
  })

  // Simulierte Ausgaben
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "exp1",
      category: "server",
      amount: 299.99,
      description: "Monatliche Serverkosten für Streaming-Plattform",
      date: new Date(2023, 2, 15),
      status: "approved",
      approvalDate: new Date(2023, 2, 16),
    },
    {
      id: "exp2",
      category: "office",
      amount: 124.5,
      description: "Büromaterial (Drucker, Papier, Stifte)",
      date: new Date(2023, 2, 10),
      status: "approved",
      approvalDate: new Date(2023, 2, 11),
    },
    {
      id: "exp3",
      category: "business_meal",
      amount: 78.9,
      description: "Geschäftsessen mit Partnerfirma",
      date: new Date(2023, 3, 5),
      status: "pending",
      receiptImage: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "exp4",
      category: "other",
      amount: 450.0,
      description: "Softwarelizenzen für Videobearbeitung",
      date: new Date(2023, 3, 2),
      status: "pending",
    },
  ])

  const filteredExpenses = activeTab === "all" ? expenses : expenses.filter((expense) => expense.status === activeTab)

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const approvedExpenses = expenses
    .filter((expense) => expense.status === "approved")
    .reduce((sum, expense) => sum + expense.amount, 0)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setNewExpense({
          ...newExpense,
          receiptImage: event.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddExpense = () => {
    const amount = Number.parseFloat(newExpense.amount)
    if (isNaN(amount) || amount <= 0) return

    const newExpenseItem: Expense = {
      id: `exp${expenses.length + 1}`,
      category: newExpense.category as "server" | "office" | "business_meal" | "other",
      amount,
      description: newExpense.description,
      date: new Date(newExpense.date),
      status: "pending",
      receiptImage: newExpense.receiptImage || undefined,
    }

    setExpenses([...expenses, newExpenseItem])
    setIsAddExpenseOpen(false)
    setNewExpense({
      category: "server",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      receiptImage: null,
    })
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const handleApproveExpense = (id: string) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, status: "approved", approvalDate: new Date() } : expense,
      ),
    )
  }

  const handleGenerateReport = () => {
    setIsGeneratingReport(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      // In einer echten Anwendung würde hier ein PDF generiert werden

      // Simuliere einen Download
      const link = document.createElement("a")
      link.href = "#"
      link.download = `Ausgaben_Bericht_${new Date().toISOString().slice(0, 10)}.pdf`
      link.click()

      setIsGeneratingReport(false)
    }, 2000)
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "server":
        return "Server Miete"
      case "office":
        return "Büromaterial"
      case "business_meal":
        return "Geschäftsessen"
      case "other":
        return "Andere"
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Steuerlich absetzbare Ausgaben</h2>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre geschäftlichen Ausgaben und generieren Sie Berichte für das Finanzamt
          </p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Neue Ausgabe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Neue Ausgabe hinzufügen</DialogTitle>
                <DialogDescription>
                  Fügen Sie eine neue steuerlich absetzbare Ausgabe hinzu. Laden Sie wenn möglich einen Beleg hoch.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expense-category">Kategorie</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                    >
                      <SelectTrigger id="expense-category">
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="server">Server Miete</SelectItem>
                        <SelectItem value="office">Büromaterial</SelectItem>
                        <SelectItem value="business_meal">Geschäftsessen</SelectItem>
                        <SelectItem value="other">Andere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expense-amount">Betrag (€)</Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expense-date">Datum</Label>
                  <Input
                    id="expense-date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expense-description">Beschreibung</Label>
                  <Textarea
                    id="expense-description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="Beschreiben Sie die Ausgabe..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expense-receipt">Beleg hochladen</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                    {newExpense.receiptImage ? (
                      <div className="relative">
                        <img
                          src={newExpense.receiptImage || "/placeholder.svg"}
                          alt="Beleg"
                          className="max-h-40 mx-auto"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setNewExpense({ ...newExpense, receiptImage: null })}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <div className="flex flex-col items-center justify-center py-4">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Klicken Sie hier, um einen Beleg hochzuladen</p>
                          <p className="text-xs text-muted-foreground mt-1">JPG, PNG oder PDF, max. 5MB</p>
                        </div>
                        <input
                          id="expense-receipt"
                          type="file"
                          className="hidden"
                          accept="image/*,application/pdf"
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleAddExpense}>Ausgabe hinzufügen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleGenerateReport} disabled={isGeneratingReport}>
            {isGeneratingReport ? (
              <>Wird generiert...</>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Bericht erstellen
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gesamtausgaben</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpenses.toLocaleString("de-DE")} €</div>
            <p className="text-xs text-muted-foreground">Alle erfassten Ausgaben</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Genehmigte Ausgaben</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedExpenses.toLocaleString("de-DE")} €</div>
            <p className="text-xs text-muted-foreground">Steuerlich absetzbar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Steuerersparnis (ca.)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(approvedExpenses * 0.19).toLocaleString("de-DE")} €</div>
            <p className="text-xs text-muted-foreground">Bei 19% Umsatzsteuer</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ausgabenübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Alle</TabsTrigger>
              <TabsTrigger value="pending">Ausstehend</TabsTrigger>
              <TabsTrigger value="approved">Genehmigt</TabsTrigger>
              <TabsTrigger value="rejected">Abgelehnt</TabsTrigger>
            </TabsList>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Kategorie</TableHead>
                    <TableHead>Beschreibung</TableHead>
                    <TableHead className="text-right">Betrag</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        Keine Ausgaben gefunden
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.date.toLocaleDateString("de-DE")}</TableCell>
                        <TableCell>{getCategoryLabel(expense.category)}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell className="text-right font-medium">
                          {expense.amount.toLocaleString("de-DE")} €
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              expense.status === "approved"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : expense.status === "rejected"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {expense.status === "approved"
                              ? "Genehmigt"
                              : expense.status === "rejected"
                                ? "Abgelehnt"
                                : "Ausstehend"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Aktionen</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {expense.receiptImage && (
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Beleg anzeigen</span>
                                </DropdownMenuItem>
                              )}
                              {expense.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleApproveExpense(expense.id)}>
                                  <FileCheck className="mr-2 h-4 w-4" />
                                  <span>Genehmigen</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleDeleteExpense(expense.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Löschen</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Finanzamtberichte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="flex-1">
                <FilePlus className="mr-2 h-4 w-4" />
                Ausgabenübersicht für Finanzamt erstellen (PDF)
              </Button>

              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Alle Belege als ZIP herunterladen
              </Button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Hinweis zur steuerlichen Absetzbarkeit:</h4>
              <p className="text-sm">
                Geschäftliche Ausgaben können von der Steuer abgesetzt werden, wenn sie betrieblich veranlasst sind und
                angemessen dokumentiert wurden. Bewahren Sie alle Originalbelege auf und stellen Sie sicher, dass die
                Ausgaben einen klaren Bezug zu Ihrer Geschäftstätigkeit haben.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

