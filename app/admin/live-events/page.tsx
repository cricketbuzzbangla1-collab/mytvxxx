import { useState, useEffect } from 'react'
import { db } from '@/firebase'
import LiveEventTable from '@/components/admin/LiveEventTable'
import AddLiveEventModal from '@/components/admin/AddLiveEventModal'

export default function LiveEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/admin/live-events')
      const data = await response.json()
      setEvents(data.events)
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch('/api/admin/live-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      })
      const data = await response.json()
      setEvents([...events, data])
      setShowAddModal(false)
      // Reload events
      loadEvents()
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  const handleUpdateEvent = async (id, eventData) => {
    try {
      const response = await fetch(`/api/admin/live-events?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      })
      await response.json()
      // Update events state
      setEvents(events.map(event => event.id === id ? { ...event, ...eventData } : event))
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const handleDeleteEvent = async (id) => {
    try {
      await fetch(`/api/admin/live-events?id=${id}`, { method: 'DELETE' })
      setEvents(events.filter(event => event.id !== id))
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-100">Live Events Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-secondary-100 rounded-2xl transition-colors"
        >
          Add Live Event
        </button>
      </div>

      <LiveEventTable
        events={events}
        onUpdate={handleUpdateEvent}
        onDelete={handleDeleteEvent}
      />

      <AddLiveEventModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  )
}
