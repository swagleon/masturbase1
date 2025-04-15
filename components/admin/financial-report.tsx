"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, Loader2 } from "lucide-react"
import { adminService } from "@/lib/admin-service"

export default function FinancialReport() {
  const [reportType, setReportType] = useState("monthly")
  const [period, setPeriod] = useState(new Date().getMonth().toString())
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [includeDetails, setIncludeDetails] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ]

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simuliere API-Aufruf
    setTimeout(() => {
      adminService.generateFinancialReport()
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="report-type">Berichtstyp</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger id="report-type">
              <SelectValue placeholder="Berichtstyp auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Tagesbericht</SelectItem>
              <SelectItem value="weekly">Wochenbericht</SelectItem>
              <SelectItem value="monthly">Monatsbericht</SelectItem>
              <SelectItem value="quarterly">Quartalsbericht</SelectItem>
              <SelectItem value="yearly">Jahresbericht</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {reportType === "monthly" && (
          <div className="space-y-2">
            <Label htmlFor="month">Monat</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="month">
                <SelectValue placeholder="Monat auswählen" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {reportType === "quarterly" && (
          <div className="space-y-2">
            <Label htmlFor="quarter">Quartal</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="quarter">
                <SelectValue placeholder="Quartal auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Q1 (Jan-Mär)</SelectItem>
                <SelectItem value="2">Q2 (Apr-Jun)</SelectItem>
                <SelectItem value="3">Q3 (Jul-Sep)</SelectItem>
                <SelectItem value="4">Q4 (Okt-Dez)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="year">Jahr</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Jahr auswählen" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(5)].map((_, i) => {
                const yearValue = (new Date().getFullYear() - i).toString()
                return (
                  <SelectItem key={yearValue} value={yearValue}>
                    {yearValue}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <Checkbox
            id="include-details"
            checked={includeDetails}
            onCheckedChange={(checked) => setIncludeDetails(!!checked)}
          />
          <Label htmlFor="include-details">Detaillierte Aufschlüsselung einbeziehen</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Im Bericht enthalten:</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Umsatz</span>
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Einnahmen</span>
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Ausgaben</span>
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Umsatzsteuer</span>
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Profit</span>
            </li>
            {includeDetails && (
              <>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Token-Verkäufe nach Paketen</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Rabatte und Sonderaktionen</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Tägliche Umsatzentwicklung</span>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Verfügbare Formate:</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="format-pdf" checked disabled />
              <Label htmlFor="format-pdf">PDF</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="format-excel" checked disabled />
              <Label htmlFor="format-excel">Excel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="format-csv" checked disabled />
              <Label htmlFor="format-csv">CSV</Label>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Bericht wird generiert...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Finanzbericht generieren und herunterladen
          </>
        )}
      </Button>
    </div>
  )
}

