"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { storage, type Booking } from "@/lib/storage"

type FilterStatus = "all" | "today" | "upcoming" | "completed" | "cancelled"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<FilterStatus>("all")

  useEffect(() => {
    // Sync bookings from server on mount
    const syncBookingsFromServer = async () => {
      const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : ''
      if (API_BASE) {
        try {
          const resp = await fetch(`${API_BASE}/bookings?action=list`)
          if (resp.ok) {
            const json = await resp.json()
            if (json && Array.isArray(json.data)) {
              // Convert server bookings to client format
              const clientBookings = json.data.map((b: any) => ({
                id: String(b.id),
                clientId: String(b.customer_id),
                accommodationId: String(b.accommodation_id),
                dateFrom: b.check_in,
                dateTo: b.check_out,
                status: b.status || 'confirmed',
                totalAmount: parseFloat(b.total_price) || 0,
                createdAt: b.created_at || new Date().toISOString(),
                paymentStatus: 'paid',
              }))
              localStorage.setItem('pos_bookings', JSON.stringify(clientBookings))
              setBookings(clientBookings)
              return
            }
          }
        } catch (e) {
          // fall back to local storage if server unavailable
        }
      }
      // Fallback: read from localStorage
      const allBookings = storage.getBookings()
      setBookings(allBookings)
    }
    
    syncBookingsFromServer()
  }, [])

  const getFilteredBookings = () => {
    const today = new Date().toISOString().split("T")[0]
    const now = new Date()

    return bookings.filter((b) => {
      switch (filter) {
        case "today":
          return b.dateFrom === today
        case "upcoming":
          return new Date(b.dateFrom) > now && b.status !== "cancelled"
        case "completed":
          return b.status === "completed"
        case "cancelled":
          return b.status === "cancelled"
        default:
          return true
      }
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      storage.deleteBooking(id)
      setBookings(storage.getBookings())
    }
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    storage.updateBooking(id, { status: newStatus as any })
    setBookings(storage.getBookings())
  }

  const filteredBookings = getFilteredBookings()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-(--primary-blue)">Bookings</h1>
        <Link
          href="/booking/new"
          className="px-4 py-2 bg-(--yellow) text-(--gray-dark) rounded font-bold hover:bg-yellow-400"
        >
          New Booking
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 bg-white p-4 rounded border border-(--gray-light)">
        {["all", "today", "upcoming", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as FilterStatus)}
            className={`px-4 py-2 rounded font-bold capitalize text-sm transition-colors ${
              filter === f ? "bg-(--primary-blue) text-white" : "bg-(--gray-bg) text-(--gray-dark) hover:bg-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-(--gray-light) rounded overflow-x-auto">
        <table className="w-full">
          <thead className="bg-(--gray-bg) border-b border-(--gray-light)">
            <tr>
              <th className="text-left py-3 px-4 font-bold text-(--gray-dark)">ID</th>
              <th className="text-left py-3 px-4 font-bold text-(--gray-dark)">Client</th>
              <th className="text-left py-3 px-4 font-bold text-(--gray-dark)">Room</th>
              <th className="text-left py-3 px-4 font-bold text-(--gray-dark)">Dates</th>
              <th className="text-left py-3 px-4 font-bold text-(--gray-dark)">Amount</th>
              <th className="text-left py-3 px-4 font-bold text-(--gray-dark)">Status</th>
              <th className="text-left py-3 px-4 font-bold text-(--gray-dark)">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => {
              const client = storage.getClients().find((c) => c.id === b.clientId)
              const room = storage.getAccommodations().find((a) => a.id === b.accommodationId)
              return (
                <tr key={b.id} className="border-b border-(--gray-light) hover:bg-(--gray-bg)">
                  <td className="py-3 px-4 text-sm font-mono">{b.id.substring(0, 8)}</td>
                  <td className="py-3 px-4 text-sm">
                    {client?.firstName} {client?.lastName}
                  </td>
                  <td className="py-3 px-4 text-sm">{room?.name}</td>
                  <td className="py-3 px-4 text-sm">
                    {b.dateFrom} to {b.dateTo}
                  </td>
                  <td className="py-3 px-4 text-sm font-bold">₱{b.totalAmount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm space-x-2">
                    <Link href={`/booking/${b.id}`} className="text-(--primary-blue) hover:underline">
                      View
                    </Link>
                    <button onClick={() => handleDelete(b.id)} className="text-red hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12 bg-(--gray-bg) rounded">
          <p className="text-(--gray-dark)">No bookings found.</p>
        </div>
      )}
    </div>
  )
}
