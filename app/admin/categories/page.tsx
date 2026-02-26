import { useState, useEffect } from 'react'
import { db } from '@/firebase'
import CategoryTable from '@/components/admin/CategoryTable'
import AddCategoryModal from '@/components/admin/AddCategoryModal'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      const data = await response.json()
      setCategories(data.categories)
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (categoryData) => {
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      })
      const data = await response.json()
      setCategories([...categories, data])
      setShowAddModal(false)
      // Reload categories
      loadCategories()
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleUpdateCategory = async (id, categoryData) => {
    try {
      const response = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      })
      await response.json()
      // Update categories state
      setCategories(categories.map(category => category.id === id ? { ...category, ...categoryData } : category))
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' })
      setCategories(categories.filter(category => category.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-100">Categories Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-secondary-100 rounded-2xl transition-colors"
        >
          Add Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
      />

      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  )
}
