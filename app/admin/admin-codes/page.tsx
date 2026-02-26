import { useState, useEffect } from 'react'
import { db } from '@/firebase'
import AdminCodeTable from '@/components/admin/AdminCodeTable'
import AddAdminCodeModal from '@/components/admin/AddAdminCodeModal'

export default function AdminCodesPage() {
  const [adminCodes, setAdminCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadAdminCodes()
  }, [])

  const loadAdminCodes = async () => {
    try {
      const response = await fetch('/api/admin/admin-codes')
      const data = await response.json()
      setAdminCodes(data.adminCodes)
    } catch (error) {
      console.error('Error loading admin codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAdminCode = async (adminCodeData) => {
    try {
      const response = await fetch('/api/admin/admin-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCodeData),
      })
      const data = await response.json()
      setAdminCodes([...adminCodes, data])
      setShowAddModal(false)
      // Reload admin codes
      loadAdminCodes()
    } catch (error) {
      console.error('Error adding admin code:', error)
    }
  }

  const handleUpdateAdminCode = async (id, adminCodeData) => {
    try {
      const response = await fetch(`/api/admin/admin-codes?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCodeData),
      })
      await response.json()
      // Update admin codes state
      setAdminCodes(adminCodes.map(code => code.id === id ? { ...code, ...adminCodeData } : code))
    } catch (error) {
      console.error('Error updating admin code:', error)
    }
  }

  const handleDeleteAdminCode = async (id) => {
    try {
      await fetch(`/api/admin/admin-codes?id=${id}`, { method: 'DELETE' })
      setAdminCodes(adminCodes.filter(code => code.id !== id))
    } catch (error) {
      console.error('Error deleting admin code:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-100">Admin Codes Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-secondary-100 rounded-2xl transition-colors"
        >
          Generate Admin Code
        </button>
      </div>

      <AdminCodeTable
        adminCodes={adminCodes}
        onUpdate={handleUpdateAdminCode}
        onDelete={handleDeleteAdminCode}
      />

      <AddAdminCodeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddAdminCode={handleAddAdminCode}
      />
    </div>
  )
}
