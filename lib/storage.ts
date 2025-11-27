// Client-side storage utilities for POS system

interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address?: string
}

interface Accommodation {
  id: string
  name: string
  description: string
  type: "Villa" | "Cottage" | "Room"
  capacity: number
  pricePerNight: number
  status: "active" | "maintenance"
}

interface Booking {
  id: string
  clientId: string
  accommodationId: string
  dateFrom: string
  dateTo: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  totalAmount: number
  createdAt: string
  paymentStatus: "unpaid" | "paid"
  transactionId?: string
  receiptGenerated?: boolean
  receiptPath?: string
}

const STORAGE_KEYS = {
  CLIENTS: "pos_clients",
  ACCOMMODATIONS: "pos_accommodations",
  BOOKINGS: "pos_bookings",
  USER: "pos_user",
  VERSION: "pos_version",
}

const STORAGE_VERSION = 2 // increment version to force reset
const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : ''

export const storage = {
  initializeStorage: () => {
    const version = localStorage.getItem(STORAGE_KEYS.VERSION)
    if (version !== String(STORAGE_VERSION)) {
      localStorage.removeItem(STORAGE_KEYS.ACCOMMODATIONS)
      localStorage.removeItem(STORAGE_KEYS.BOOKINGS)
      localStorage.removeItem(STORAGE_KEYS.CLIENTS)
      localStorage.setItem(STORAGE_KEYS.VERSION, String(STORAGE_VERSION))
    }
  },

  // Clients
  getClients: (): Client[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || "[]")
    } catch {
      return []
    }
  },
  addClient: (client: Client) => {
    const clients = storage.getClients()
    clients.push(client)
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients))
    // Try to record to backend if API base is configured (fire-and-forget)
    if (typeof window !== 'undefined' && API_BASE) {
      try {
        fetch(`${API_BASE}/customers.php?action=create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: client.firstName,
            last_name: client.lastName,
            email: client.email,
            phone: client.phoneNumber,
            address: client.address || '',
          }),
        }).catch(() => {})
      } catch (e) {
        // ignore failures
      }
    }
    return client
  },

  // Accommodations
  getAccommodations: (): Accommodation[] => {
    try {
      storage.initializeStorage()
      const accom = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOMMODATIONS) || "[]")
      if (accom.length === 0) {
        const defaults: Accommodation[] = [
          ...Array.from({ length: 10 }, (_, i) => ({
            id: `room-${i + 1}`,
            name: `Room ${i + 1}`,
            description: `Standard room with all amenities`,
            type: "Room" as const,
            capacity: 2,
            pricePerNight: 80,
            status: "active" as const,
          })),
          ...Array.from({ length: 10 }, (_, i) => ({
            id: `cottage-regular-${i + 1}`,
            name: `Cottage Regular ${i + 1}`,
            description: `Cozy cottage for up to 5 guests`,
            type: "Cottage" as const,
            capacity: 5,
            pricePerNight: 150,
            status: "active" as const,
          })),
          ...Array.from({ length: 10 }, (_, i) => ({
            id: `cottage-large-${i + 1}`,
            name: `Cottage Large ${i + 1}`,
            description: `Spacious cottage for 15+ guests`,
            type: "Cottage" as const,
            capacity: 20,
            pricePerNight: 350,
            status: "active" as const,
          })),
          ...Array.from({ length: 5 }, (_, i) => ({
            id: `villa-${i + 1}`,
            name: `Villa ${i + 1}`,
            description: `Luxury villa with premium amenities`,
            type: "Villa" as const,
            capacity: 8,
            pricePerNight: 350,
            status: "active" as const,
          })),
        ]
        storage.setAccommodations(defaults)
        return defaults
      }
      return accom
    } catch {
      return []
    }
  },
  setAccommodations: (accommodations: Accommodation[]) => {
    localStorage.setItem(STORAGE_KEYS.ACCOMMODATIONS, JSON.stringify(accommodations))
    if (typeof window !== 'undefined' && API_BASE) {
      try {
        // send full list to backend (best-effort)
        fetch(`${API_BASE}/accommodations-updated.php?action=bulk_update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: accommodations }),
        }).catch(() => {})
      } catch {}
    }
  },
  addAccommodation: (accommodation: Accommodation) => {
    const accommodations = storage.getAccommodations()
    accommodations.push(accommodation)
    storage.setAccommodations(accommodations)
    if (typeof window !== 'undefined' && API_BASE) {
      try {
        fetch(`${API_BASE}/accommodations.php?action=create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: accommodation.name,
            type: accommodation.type,
            capacity: accommodation.capacity,
            price_per_night: accommodation.pricePerNight,
            description: accommodation.description || '',
          }),
        }).catch(() => {})
      } catch {}
    }
    return accommodation
  },
  updateAccommodation: (id: string, updates: Partial<Accommodation>) => {
    const accommodations = storage.getAccommodations()
    const index = accommodations.findIndex((a) => a.id === id)
    if (index !== -1) {
      accommodations[index] = { ...accommodations[index], ...updates }
      storage.setAccommodations(accommodations)
    }
  },

  // Bookings
  getBookings: (): Booking[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || "[]")
    } catch {
      return []
    }
  },
  addBooking: (booking: Booking) => {
    const bookings = storage.getBookings()
    bookings.push(booking)
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))
    if (typeof window !== 'undefined' && API_BASE) {
      try {
        fetch(`${API_BASE}/bookings.php?action=create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_id: booking.clientId,
            accommodation_id: booking.accommodationId,
            check_in: booking.dateFrom,
            check_out: booking.dateTo,
            guests: 1,
            total_price: booking.totalAmount,
          }),
        }).catch(() => {})
      } catch {}
    }
    return booking
  },
  updateBooking: (id: string, updates: Partial<Booking>) => {
    const bookings = storage.getBookings()
    const index = bookings.findIndex((b) => b.id === id)
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates }
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))
      if (typeof window !== 'undefined' && API_BASE) {
        try {
          fetch(`${API_BASE}/bookings.php?action=update&id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
          }).catch(() => {})
        } catch {}
      }
    }
  },
  deleteBooking: (id: string) => {
    const bookings = storage.getBookings()
    const filtered = bookings.filter((b) => b.id !== id)
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(filtered))
    if (typeof window !== 'undefined' && API_BASE) {
      try {
        fetch(`${API_BASE}/bookings.php?action=delete&id=${id}`, {
          method: 'DELETE',
        }).catch(() => {})
      } catch {}
    }
  },

  // Auth
  setUser: (user: { username: string }) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },
  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "{}")
    } catch {
      return null
    }
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER)
  },
}
