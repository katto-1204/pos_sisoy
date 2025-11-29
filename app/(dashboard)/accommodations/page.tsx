"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { storage, type Accommodation } from "@/lib/storage"

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState("")
  const [formData, setFormData] = useState<Omit<Accommodation, "id">>({
    name: "",
    type: "Room",
    description: "",
    capacity: 2,
    pricePerNight: 100,
    status: "active",
  })

  useEffect(() => {
    setAccommodations(storage.getAccommodations())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      storage.updateAccommodation(editingId, formData)
    } else {
      storage.addAccommodation({
        id: Date.now().toString(),
        ...formData,
      })
    }
    setAccommodations(storage.getAccommodations())
    resetForm()
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingId("")
    setFormData({
      name: "",
      type: "Room",
      description: "",
      capacity: 2,
      pricePerNight: 100,
      status: "active",
    })
  }

  const handleEdit = (accommodation: Accommodation) => {
    setFormData({
      name: accommodation.name,
      type: accommodation.type,
      description: accommodation.description,
      capacity: accommodation.capacity,
      pricePerNight: accommodation.pricePerNight,
      status: accommodation.status,
    })
    setEditingId(accommodation.id)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-(--primary-blue)">Accommodations</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-(--yellow) text-(--gray-dark) rounded font-bold hover:bg-yellow-400"
        >
          Add Accommodation
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white border border-(--gray-light) rounded p-6">
          <h2 className="text-xl font-bold text-(--gray-dark) mb-4">{editingId ? "Edit" : "Add"} Accommodation</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="px-3 py-2 border border-(--gray-light) rounded"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Accommodation["type"] })}
                className="px-3 py-2 border border-(--gray-light) rounded"
              >
                <option value="Villa">Villa</option>
                <option value="Cottage">Cottage</option>
                <option value="Room">Room</option>
              </select>
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-(--gray-light) rounded"
              rows={3}
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                className="px-3 py-2 border border-(--gray-light) rounded"
              />
              <input
                type="number"
                placeholder="Price per night"
                value={formData.pricePerNight}
                onChange={(e) => setFormData({ ...formData, pricePerNight: Number.parseFloat(e.target.value) })}
                className="px-3 py-2 border border-(--gray-light) rounded"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-3 py-2 border border-(--gray-light) rounded"
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-(--yellow) text-(--gray-dark) rounded font-bold hover:bg-yellow-400"
              >
                Save
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-(--gray-bg) border border-(--gray-light) rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid View */}
      <div className="grid grid-cols-3 gap-6">
        {accommodations.map((acc) => (
          <div key={acc.id} className="bg-white border border-(--gray-light) rounded p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-(--gray-dark)">{acc.name}</h3>
              <p className="text-sm text-(--gray-dark)">{acc.type}</p>
            </div>
            <p className="text-sm text-(--gray-dark) mb-4 line-clamp-2">{acc.description}</p>
            <div className="space-y-1 text-sm mb-4 border-t border-(--gray-light) pt-4">
              <p>
                <strong>Capacity:</strong> {acc.capacity} guests
              </p>
              <p>
                <strong>Price:</strong> ₱{acc.pricePerNight}/night
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={acc.status === "active" ? "text-green" : "text-red"}>{acc.status}</span>
              </p>
            </div>
            <button
              onClick={() => handleEdit(acc)}
              className="w-full py-2 bg-(--primary-blue) text-white rounded font-bold hover:bg-blue-900"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
