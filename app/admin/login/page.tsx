import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Login() {
  const [adminCode, setAdminCode] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/${adminCode}`)
      const data = await response.json()

      if (data.success) {
        // Login successful
        router.push('/admin')
      } else {
        alert('Invalid admin code')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-glass rounded-2xl p-8 text-center"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-secondary-100 mb-2">Admin Login</h1>
          <p className="text-sm text-secondary-400">Enter your admin code</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Enter admin code"
              className="w-full px-4 py-3 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-secondary-100 rounded-2xl transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-sm text-secondary-400">
          Super Admin Code: 258000
        </div>
      </motion.div>
    </div>
  )
}
