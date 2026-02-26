import { useState, useEffect } from 'react'
import { db } from '@/firebase'
import CountryTable from '@/components/admin/CountryTable'
import AddCountryModal from '@/components/admin/AddCountryModal'

export default function CountriesPage() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadCountries()
  }, [])

  const loadCountries = async () => {
    try {
      const response = await fetch('/api/admin/countries')
      const data = await response.json()
      setCountries(data.countries)
    } catch (error) {
      console.error('Error loading countries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCountry = async (countryData) => {
    try {
      const response = await fetch('/api/admin/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(countryData),
      })
      const data = await response.json()
      setCountries([...countries, data])
      setShowAddModal(false)
      // Reload countries
      loadCountries()
    } catch (error) {
      console.error('Error adding country:', error)
    }
  }

  const handleUpdateCountry = async (id, countryData) => {
    try {
      const response = await fetch(`/api/admin/countries?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(countryData),
      })
      await response.json()
      // Update countries state
      setCountries(countries.map(country => country.id === id ? { ...country, ...countryData } : country))
    } catch (error) {
      console.error('Error updating country:', error)
    }
  }

  const handleDeleteCountry = async (id) => {
    try {
      await fetch(`/api/admin/countries?id=${id}`, { method: 'DELETE' })
      setCountries(countries.filter(country => country.id !== id))
    } catch (error) {
      console.error('Error deleting country:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-100">Countries Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-secondary-100 rounded-2xl transition-colors"
        >
          Add Country
        </button>
      </div>

      <CountryTable
        countries={countries}
        onUpdate={handleUpdateCountry}
        onDelete={handleDeleteCountry}
      />

      <AddCountryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddCountry={handleAddCountry}
      />
    </div>
  )
}
