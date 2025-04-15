"use client"

import { useEffect, useState } from "react"
import { adminService } from "@/lib/admin-service"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function TokensChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(adminService.getTokenSalesData())
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => value.toLocaleString("de-DE")} />
        <Legend />
        <Bar dataKey="sales" name="Verkaufte Tokens" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

