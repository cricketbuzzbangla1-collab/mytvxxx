import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '@/firebase'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Panel - Live TV',
  description: 'Admin panel for managing Live TV channels and settings',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [adminData, setAdminData] = useState(null)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.adminCode) {
      verifyAdminCode(session.user.adminCode)
    }
  }, [session])

  const verifyAdminCode = async (code) => {
    try {
      const response = await fetch(`/api/admin/${code}`)
      const data = await response.json()

      if (data.success) {
        setAdminData(data)
      } else {
        // Redirect to login
        window.location.href = '/admin/login'
      }
    } catch (error) {
      console.error('Error verifying admin code:', error)
    }
  }

  if (!adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-secondary-300">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  const navigation = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/channels', label: 'Channels' },
    { href: '/admin/live-events', label: 'Live Events' },
    { href: '/admin/categories', label: 'Categories' },
    { href: '/admin/countries', label: 'Countries' },
    { href: '/admin/admin-codes', label: 'Admin Codes' },
    { href: '/admin/settings', label: 'Settings' },
  ]

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-secondary-950">
          {/* Sidebar */}
          <div className="w-64 bg-glass border-r border-glass">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-secondary-100 mb-4">Admin Panel</h1>
              <p className="text-sm text-secondary-400">Role: {adminData.role}</p>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-4 py-3 text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-glass-active text-primary-400'
                      : 'text-secondary-300 hover:bg-glass-hover hover:text-primary-300'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <header className="bg-glass border-b border-glass p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-secondary-100">
                  {getTitleFromPathname(pathname)}
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      // Logout
                      window.location.href = '/admin/login'
                    }}
                    className="px-4 py-2 bg-accent hover:bg-accent-hover text-secondary-100 rounded-2xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </header>

            <main className="p-6 flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

function getTitleFromPathname(pathname: string) {
  const titles = {
    '/admin': 'Dashboard',
    '/admin/channels': 'Channels Management',
    '/admin/live-events': 'Live Events Management',
    '/admin/categories': 'Categories Management',
    '/admin/countries': 'Countries Management',
    '/admin/admin-codes': 'Admin Codes Management',
    '/admin/settings': 'App Settings',
  }
  return titles[pathname] || 'Admin Panel'
}
