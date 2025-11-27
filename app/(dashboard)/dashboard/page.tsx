"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { storage, type Booking } from "@/lib/storage"

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState({
    todayBookings: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalSales: 0,
  })

  useEffect(() => {
    const allBookings = storage.getBookings()
    setBookings(allBookings)

    const today = new Date().toISOString().split("T")[0]
    const todayBookings = allBookings.filter((b) => b.dateFrom === today)

    const accommodations = storage.getAccommodations()
    const occupiedToday = new Set(
      allBookings
        .filter((b) => {
          const from = new Date(b.dateFrom)
          const to = new Date(b.dateTo)
          const now = new Date(today)
          return from <= now && now < to && b.status !== "cancelled"
        })
        .map((b) => b.accommodationId),
    ).size

    const totalSales = allBookings.filter((b) => b.paymentStatus === "paid").reduce((sum, b) => sum + b.totalAmount, 0)

    setStats({
      todayBookings: todayBookings.length,
      availableRooms: accommodations.length - occupiedToday,
      occupiedRooms: occupiedToday,
      totalSales,
    })
  }, [])

  const StatCard = ({ title, value }: { title: string; value: number | string }) => (
    <div className="bg-white border border-(--gray-light) rounded p-6 shadow-sm">
      <p className="text-sm text-(--gray-dark) mb-2">{title}</p>
      <p className="text-3xl font-bold text-(--primary-blue)">{value}</p>
    </div>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-(--primary-blue)">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Bookings Today" value={stats.todayBookings} />
        <StatCard title="Available Rooms" value={stats.availableRooms} />
        <StatCard title="Occupied Rooms" value={stats.occupiedRooms} />
        <StatCard title="Total Sales" value={`₱${stats.totalSales.toLocaleString()}`} />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Bookings Today Table */}
        <div className="col-span-2 bg-white border border-(--gray-light) rounded p-6">
          <h2 className="text-lg font-bold text-(--gray-dark) mb-4">Today's Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--gray-light)">
                  <th className="text-left py-2 px-2 font-bold text-(--gray-dark)">Time</th>
                  <th className="text-left py-2 px-2 font-bold text-(--gray-dark)">Client</th>
                  <th className="text-left py-2 px-2 font-bold text-(--gray-dark)">Room</th>
                  <th className="text-left py-2 px-2 font-bold text-(--gray-dark)">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="border-b border-(--gray-light)">
                    <td className="py-3 px-2">{new Date(b.createdAt).toLocaleTimeString()}</td>
                    <td className="py-3 px-2">
                      {storage.getClients().find((c) => c.id === b.clientId)?.firstName || "N/A"}
                    </td>
                    <td className="py-3 px-2">
                      {storage.getAccommodations().find((a) => a.id === b.accommodationId)?.name || "N/A"}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green"
                            : b.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions Panel */}
        <div className="bg-white border border-(--gray-light) rounded p-6 h-fit space-y-3">
          <h2 className="text-lg font-bold text-(--gray-dark) mb-4">Quick Actions</h2>
          <Link
            href="/booking/new"
            className="block w-full py-3 bg-(--yellow) text-(--gray-dark) font-bold rounded text-center hover:bg-yellow-400 transition-colors"
          >
            New Booking
          </Link>
          <Link
            href="/accommodations"
            className="block w-full py-2 bg-(--primary-blue) text-white font-bold rounded text-center hover:bg-blue-900 transition-colors"
          >
            Accommodations
          </Link>
          <Link
            href="/reports"
            className="block w-full py-2 bg-(--primary-blue) text-white font-bold rounded text-center hover:bg-blue-900 transition-colors"
          >
            Reports
          </Link>
          <Link
            href="/bookings"
            className="block w-full py-2 bg-(--primary-blue) text-white font-bold rounded text-center hover:bg-blue-900 transition-colors"
          >
            All Bookings
          </Link>
        </div>
      </div>
    </div>
  )
}
