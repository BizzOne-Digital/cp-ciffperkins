import React, { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import ProductForm from './ProductForm'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

export default function Products() {
  useDocumentMeta('Manage Products', 'Manage books and music products.')
  const [typeFilter, setTypeFilter] = useState('')
  const { data, loading, error, retry } = useAdminApiData(`/products${typeFilter ? `?type=${typeFilter}` : ''}`, {
    deps: [typeFilter],
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { success, error: toastError } = useToast()

  const openCreate = () => {
    setEditingProduct(null)
    setModalOpen(true)
  }
  const openEdit = (product) => {
    setEditingProduct(product)
    setModalOpen(true)
  }
  const handleSaved = () => {
    setModalOpen(false)
    retry()
  }

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    try {
      await adminApi.delete(`/products/${product._id}`)
      success('Product deleted.')
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not delete this product.'))
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-espresso">Products</h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-5 py-2.5 rounded-sm hover:bg-softgold"
        >
          <Plus size={16} aria-hidden="true" /> Add Product
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        {[
          { value: '', label: 'All' },
          { value: 'book', label: 'Books' },
          { value: 'cd', label: 'Music' },
        ].map((t) => (
          <button
            key={t.value}
            onClick={() => setTypeFilter(t.value)}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wide border ${
              typeFilter === t.value ? 'bg-gold text-espresso border-gold' : 'bg-ivory text-espresso border-gold/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="Add your first product to get started."
        columns={[
          { key: 'name', label: 'Title', sortable: true },
          { key: 'type', label: 'Type' },
          { key: 'price', label: 'Price', render: (r) => (r.price != null ? `$${Number(r.price).toFixed(2)}` : '—') },
          { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') },
          { key: 'active', label: 'Active', render: (r) => (r.active === false ? 'No' : 'Yes') },
          {
            key: 'actions',
            label: 'Actions',
            render: (r) => (
              <div className="flex gap-3">
                <button aria-label="Edit product" onClick={() => openEdit(r)} className="text-gold hover:text-warmbrown">
                  <Pencil size={16} />
                </button>
                <button aria-label="Delete product" onClick={() => handleDelete(r)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            ),
          },
        ]}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add Product'}>
        <ProductForm product={editingProduct} onSaved={handleSaved} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
