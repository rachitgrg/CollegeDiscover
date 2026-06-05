'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { SearchBar } from '@/components/search/SearchBar'
import { FilterPanel } from '@/components/search/FilterPanel'
import { FilterChip } from '@/components/search/FilterChip'
import { CollegeGrid } from '@/components/college/CollegeGrid'
import { useColleges } from '@/hooks/useColleges'
import { useCompareStore } from '@/store/compareStore'
import type { Metadata } from 'next'

function CollegesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { selectedIds } = useCompareStore()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const params = {
    q: searchParams.get('q') ?? undefined,
    category: searchParams.get('category') ?? undefined,
    type: searchParams.get('type') ?? undefined,
    state: searchParams.get('state') ?? undefined,
    minFees: searchParams.get('minFees') ? Number(searchParams.get('minFees')) : undefined,
    maxFees: searchParams.get('maxFees') ? Number(searchParams.get('maxFees')) : undefined,
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
    sortBy: searchParams.get('sortBy') ?? undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: 12,
  }

  const { data, isLoading, isError, refetch } = useColleges(params)

  const clearParam = (key: string) => {
    const p = new URLSearchParams(searchParams.toString())
    p.delete(key)
    p.set('page', '1')
    router.push(`/colleges?${p.toString()}`)
  }

  const clearAllFilters = () => router.push('/colleges')

  const goToPage = (page: number) => {
    const p = new URLSearchParams(searchParams.toString())
    p.set('page', String(page))
    router.push(`/colleges?${p.toString()}`)
  }

  // Active filter chips
  const activeFilters: { label: string; key: string }[] = []
  if (params.q) activeFilters.push({ label: `"${params.q}"`, key: 'q' })
  if (params.category) activeFilters.push({ label: params.category, key: 'category' })
  if (params.type) activeFilters.push({ label: params.type, key: 'type' })
  if (params.state) activeFilters.push({ label: params.state, key: 'state' })
  if (params.minFees) activeFilters.push({ label: `Min ₹${(params.minFees / 100000).toFixed(1)}L`, key: 'minFees' })
  if (params.maxFees) activeFilters.push({ label: `Max ₹${(params.maxFees / 100000).toFixed(1)}L`, key: 'maxFees' })
  if (params.minRating) activeFilters.push({ label: `${params.minRating}★ & above`, key: 'minRating' })

  const pagination = data?.pagination
  const colleges = data?.data ?? []
  const hasCompareTray = selectedIds.length > 0

  return (
    <PageWrapper hasCompareTray={hasCompareTray}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search + Mobile filter toggle */}
          <div className="flex gap-2 mb-4">
            <SearchBar className="flex-1" />
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilters.length > 0 && (
                <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Active filters row */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {activeFilters.map((f) => (
                <FilterChip key={f.key} label={f.label} onRemove={() => clearParam(f.key)} />
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Clear all
              </button>
            </div>
          )}

          {/* Results count */}
          {!isLoading && pagination && (
            <p className="text-sm text-gray-500 mb-4">
              Showing {Math.min((params.page - 1) * 12 + 1, pagination.total)}–
              {Math.min(params.page * 12, pagination.total)} of {pagination.total} colleges
            </p>
          )}

          {/* Error state */}
          {isError && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Failed to load colleges</p>
              <button onClick={() => refetch()} className="text-blue-600 hover:underline text-sm">
                Try again
              </button>
            </div>
          )}

          {/* College Grid */}
          {!isError && (
            <CollegeGrid
              colleges={colleges}
              isLoading={isLoading}
              onClearFilters={activeFilters.length > 0 ? clearAllFilters : undefined}
            />
          )}

          {/* Pagination */}
          {!isLoading && pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: pagination.totalPages }).map((_, i) => {
                const page = i + 1
                const isCurrent = page === params.page
                if (
                  page === 1 ||
                  page === pagination.totalPages ||
                  Math.abs(page - params.page) <= 2
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                }
                if (Math.abs(page - params.page) === 3) {
                  return <span key={page} className="text-gray-400">…</span>
                }
                return null
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <FilterPanel onClose={() => setMobileFiltersOpen(false)} />
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<PageWrapper><div className="h-96 animate-pulse bg-gray-100 rounded-xl" /></PageWrapper>}>
      <CollegesContent />
    </Suspense>
  )
}
