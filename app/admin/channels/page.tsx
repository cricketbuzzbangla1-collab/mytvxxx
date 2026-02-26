import { useState, useEffect } from 'react'
import { db } from '@/firebase'
import ChannelTable from '@/components/admin/ChannelTable'
import AddChannelModal from '@/components/admin/AddChannelModal'

export default function ChannelsPage() {
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadChannels()
  }, [])

  const loadChannels = async () => {
    try {
      const response = await fetch('/api/admin/channels')
      const data = await response.json()
      setChannels(data.channels)
    } catch (error) {
      console.error('Error loading channels:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddChannel = async (channelData) => {
    try {
      const response = await fetch('/api/admin/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channelData),
      })
      const data = await response.json()
      setChannels([...channels, data])
      setShowAddModal(false)
      // Reload channels
      loadChannels()
    } catch (error) {
      console.error('Error adding channel:', error)
    }
  }

  const handleUpdateChannel = async (id, channelData) => {
    try {
      const response = await fetch(`/api/admin/channels?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channelData),
      })
      await response.json()
      // Update channels state
      setChannels(channels.map(channel => channel.id === id ? { ...channel, ...channelData } : channel))
    } catch (error) {
      console.error('Error updating channel:', error)
    }
  }

  const handleDeleteChannel = async (id) => {
    try {
      await fetch(`/api/admin/channels?id=${id}`, { method: 'DELETE' })
      setChannels(channels.filter(channel => channel.id !== id))
    } catch (error) {
      console.error('Error deleting channel:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-100">Channels Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-secondary-100 rounded-2xl transition-colors"
        >
          Add Channel
        </button>
      </div>

      <ChannelTable
        channels={channels}
        onUpdate={handleUpdateChannel}
        onDelete={handleDeleteChannel}
      />

      <AddChannelModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddChannel={handleAddChannel}
      />
    </div>
  )
}
