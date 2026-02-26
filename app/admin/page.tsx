import { useState, useEffect } from 'react'
import { db } from '@/firebase'
import DashboardStats from '@/components/admin/DashboardStats'
import RecentActivity from '@/components/admin/RecentActivity'

export default function AdminPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStats title="Total Channels" value={stats?.totalChannels} />
        <DashboardStats title="Active Channels" value={stats?.activeChannels} />
        <DashboardStats title="Live Events" value={stats?.totalLiveEvents} />
        <DashboardStats title="Categories" value={stats?.totalCategories} />
      </div>

      <div className="bg-glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-secondary-100 mb-4">Recent Activity</h3>
        <RecentActivity />
      </div>
    </div>
  )
}
