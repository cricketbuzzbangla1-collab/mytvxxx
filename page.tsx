import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db, auth } from '@/firebase'
import { fetcher } from '@/lib/utils'
import Player from '@/components/Player'
import Sidebar from '@/components/Sidebar'
import MobileMenuToggle from '@/components/MobileMenuToggle'

export default function Home() {
  const [channels, setChannels] = useState([])
  const [featuredChannels, setFeaturedChannels] = useState([])
  const [categories, setCategories] = useState([])
  const [countries, setCountries] = useState([])
  const [liveEvents, setLiveEvents] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const [channelsRes, featuredRes, categoriesRes, countriesRes, eventsRes] = await Promise.all([
        fetcher('/api/channels?limit=20&country=Bangladesh'),
        fetcher('/api/channels?featured=true&limit=10'),
        fetcher('/api/categories'),
        fetcher('/api/countries'),
        fetcher('/api/live-events'),
      ])

      setChannels(channelsRes.channels)
      setFeaturedChannels(featuredRes.channels)
      setCategories(categoriesRes.categories)
      setCountries(countriesRes.countries)
      setLiveEvents(eventsRes.events)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel)
    setIsSidebarOpen(false)
  }

  const handleClosePlayer = () => {
    setSelectedChannel(null)
  }

  return (
    <div className="min-h-screen">
      <MobileMenuToggle isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onChannelClick={handleChannelClick}
        categories={categories}
        countries={countries}
      />

      <main className={`main-content transition-all ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-secondary-100">Live TV</h1>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mobile-menu-toggle"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Featured Slider */}
          {featuredChannels.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">Featured Channels</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {featuredChannels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => handleChannelClick(channel)}
                    className="cursor-pointer group neon-glow"
                  >
                    <div className="relative">
                      <img 
                        src={channel.poster || 'https://picsum.photos/seed/live-tv/400/225'} 
                        alt={channel.name}
                        className="w-full h-32 object-cover rounded-2xl"
                      />
                      {channel.live && (
                        <div className="live-badge">LIVE</div>
                      )}
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-secondary-100">{channel.name}</h3>
                      <p className="text-xs text-secondary-400">{channel.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">Categories</h2>
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => router.push(`/category/${category.id}`)}
                    className="px-4 py-2 rounded-2xl bg-glass border border-glass text-sm font-medium text-secondary-100 hover:bg-glass-hover transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bangladesh Channels */}
          {channels.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-secondary-100">Bangladesh Channels</h2>
                <button 
                  onClick={() => router.push('/bangladesh')}
                  className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => handleChannelClick(channel)}
                    className="cursor-pointer group neon-glow"
                  >
                    <div className="relative">
                      <img 
                        src={channel.poster || 'https://picsum.photos/seed/live-tv/400/225'} 
                        alt={channel.name}
                        className="w-full h-32 object-cover rounded-2xl"
                      />
                      {channel.live && (
                        <div className="live-badge">LIVE</div>
                      )}
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-secondary-100">{channel.name}</h3>
                      <p className="text-xs text-secondary-400">{channel.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending */}
          {channels.filter(c => c.trending).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">Trending</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {channels.filter(c => c.trending).map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => handleChannelClick(channel)}
                    className="cursor-pointer group neon-glow"
                  >
                    <div className="relative">
                      <img 
                        src={channel.poster || 'https://picsum.photos/seed/live-tv/400/225'} 
                        alt={channel.name}
                        className="w-full h-32 object-cover rounded-2xl"
                      />
                      {channel.live && (
                        <div className="live-badge">LIVE</div>
                      )}
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-secondary-100">{channel.name}</h3>
                      <p className="text-xs text-secondary-400">{channel.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Events */}
          {liveEvents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">Live Events</h2>
              <div className="space-y-4">
                {liveEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-4 bg-glass rounded-2xl"
                  >
                    <div className="flex-shrink-0">
                      <img 
                        src={event.logoA || 'https://picsum.photos/seed/team-a/100/100'} 
                        alt={event.teamA}
                        className="w-16 h-16 object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex-1 mx-4">
                      <h3 className="text-sm font-medium text-secondary-100">
                        {event.teamA} vs {event.teamB}
                      </h3>
                      <p className="text-xs text-secondary-400">{event.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary-400">
                        {event.status.toUpperCase()}
                      </p>
                      {event.status === 'upcoming' && (
                        <div className="countdown">
                          <div className="countdown-digit">{new Date(event.startTime).getHours()}</div>
                          <span>:</span>
                          <div className="countdown-digit">{new Date(event.startTime).getMinutes()}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Player Modal */}
        {selectedChannel && (
          <Player
            channel={selectedChannel}
            onClose={handleClosePlayer}
            onChannelChange={(channel) => setSelectedChannel(channel)}
          />
        )}
      </main>
    </div>
  )
}
