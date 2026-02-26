import { useState, useEffect } from 'react'
import { db } from '@/firebase'
import { useForm } from 'react-hook-form'

export default function SettingsPage() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      setSettings(data)
      reset(data)
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      await response.json()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-100">App Settings</h2>
        {success && (
          <div className="px-4 py-2 bg-green-600 bg-green-600/20 text-green-400 rounded-2xl">
            Settings saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">App Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-100">
                App Name
              </label>
              <input
                {...register('appName', { required: true })}
                type="text"
                className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter app name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-100">
                Website URL
              </label>
              <input
                {...register('websiteUrl')}
                type="url"
                className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter website URL"
              />
            </div>
          </div>
        </div>

        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-100">
                Logo URL
              </label>
              <input
                {...register('logo')}
                type="url"
                className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter logo URL"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary-100">
                Favicon URL
              </label>
              <input
                {...register('favicon')}
                type="url"
                className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter favicon URL"
              />
            </div>
          </div>
        </div>

        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">Meta Information</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Meta Title
            </label>
            <input
              {...register('metaTitle')}
              type="text"
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter meta title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Meta Description
            </label>
            <textarea
              {...register('metaDescription')}
              rows={3}
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter meta description"
            />
          </div>
        </div>

        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">Notice Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Notice Text
            </label>
            <textarea
              {...register('noticeText')}
              rows={3}
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter notice text"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                {...register('noticeEnabled')}
                type="checkbox"
                className="h-4 w-4 text-primary-600 border-glass rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-secondary-300">Enable Notice</span>
            </label>
          </div>
        </div>

        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">Telegram Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Telegram Link
            </label>
            <input
              {...register('telegramLink')}
              type="url"
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter Telegram channel link"
            />
          </div>
        </div>

        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">Theme Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Default Theme
            </label>
            <select
              {...register('defaultTheme')}
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">Ads Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Ads Enabled
            </label>
            <select
              {...register('adsEnabled')}
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Ads Script
            </label>
            <textarea
              {...register('adsScript')}
              rows={4}
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter ads script (if any)"
            />
          </div>
        </div>

        <div className="bg-glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-secondary-100 mb-4">Player Settings</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Default Volume
            </label>
            <input
              {...register('defaultVolume', { valueAsNumber: true })}
              type="number"
              min="0"
              max="1"
              step="0.1"
              className="w-32 px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter default volume (0-1)"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-100">
              Autoplay
            </label>
            <select
              {...register('autoplay')}
              className="w-full px-3 py-2 border border-glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset(settings)}
            className="px-4 py-2 bg-glass border border-glass text-sm font-medium text-secondary-300 hover:bg-glass-hover transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-secondary-100 rounded-2xl transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
