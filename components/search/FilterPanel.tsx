'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Puducherry', 'Chandigarh',
]

const CATEGORIES = ['Engineering', 'Medical', 'Management', 'Arts', 'Science']
const TYPES = ['Public', 'Private', 'Deemed']

interface FilterPanelProps {
  onClose?: () => void
}

export function FilterPanel({ onClose }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set('page', '1')
    router.push(`/colleges?${params.toString()}`)
  }

  const clearAll = () => {
    router.push('/colleges')
    onClose?.()
  }

  const currentCategory = searchParams.get('category') ?? ''
  const currentType = searchParams.get('type') ?? ''
  const currentState = searchParams.get('state') ?? ''
  const currentMinFees = searchParams.get('minFees') ?? ''
  const currentMaxFees = searchParams.get('maxFees') ?? ''
  const currentMinRating = searchParams.get('minRating') ?? ''
  const currentSortBy = searchParams.get('sortBy') ?? ''

  const hasFilters = !!(currentCategory || currentType || currentState || currentMinFees || currentMaxFees || currentMinRating || currentSortBy)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            <X className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={currentSortBy}
          onChange={(e) => updateParam('sortBy', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Best Match (Rating)</option>
          <option value="fees_asc">Fees: Low to High</option>
          <option value="fees_desc">Fees: High to Low</option>
          <option value="rating_desc">Highest Rated</option>
          <option value="name_asc">Name: A–Z</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCategory === cat}
                onChange={() => updateParam('category', currentCategory === cat ? '' : cat)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="space-y-2">
          {TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={t}
                checked={currentType === t}
                onChange={() => updateParam('type', currentType === t ? '' : t)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* State */}
      <div>
        <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">State</label>
        <select
          id="state-select"
          value={currentState}
          onChange={(e) => updateParam('state', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All States</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Fees Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Fees (₹)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={currentMinFees}
            onChange={(e) => updateParam('minFees', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={0}
          />
          <input
            type="number"
            placeholder="Max"
            value={currentMaxFees}
            onChange={(e) => updateParam('maxFees', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={0}
          />
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating: {currentMinRating || 'Any'}
        </label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => updateParam('minRating', currentMinRating === String(r) ? '' : String(r))}
              className={`flex-1 py-1.5 text-sm rounded-lg border transition-all ${
                currentMinRating === String(r)
                  ? 'bg-amber-400 border-amber-400 text-white font-semibold'
                  : 'border-gray-200 text-gray-600 hover:border-amber-300'
              }`}
            >
              {r}★
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
