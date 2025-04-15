"use client"

import { useEffect, useState } from "react"
import { adminService } from "@/lib/admin-service"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface FinanceChartProps {
  timeframe: "day" | "month" | "year"
}

export default function FinanceChart({ timeframe }: FinanceChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(adminService.getFinanceData(timeframe))
  }, [timeframe])

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString("de-DE")} €`} />
          <Legend />
          <Line type="monotone" dataKey="revenue" name="Umsatz" stroke="#3b82f6" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="profit" name="Profit" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

