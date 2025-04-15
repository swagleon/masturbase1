"use client"

import { useEffect, useState } from "react"
import { adminService } from "@/lib/admin-service"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function UsersChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(adminService.getUsersData())
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => value.toLocaleString("de-DE")} />
        <Legend />
        <Area type="monotone" dataKey="registered" name="Registrierte User" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="active" name="Aktive User" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="new" name="Neue User" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

