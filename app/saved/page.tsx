'use client'

import Link from 'next/link'
import { BookMarked } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { CollegeGrid } from '@/components/college/CollegeGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { useSavedColleges } from '@/hooks/useSaved'
import { useCompareStore } from '@/store/compareStore'
import { College } from '@/types'

export default function SavedPage() {
  const { data: savedItems, isLoading, isError, refetch } = useSavedColleges()
  const { selectedIds } = useCompareStore()
  const hasCompareTray = selectedIds.length > 0

  const colleges: College[] = savedItems?.map((s) => s.college) ?? []

  if (isError) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Failed to load saved colleges</p>
          <button onClick={() => refetch()} className="text-blue-600 hover:underline text-sm">
            Try again
          </button>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper hasCompareTray={hasCompareTray}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Saved Colleges</h1>
        <p className="text-sm text-gray-500 mt-1">
          {isLoading ? 'Loading…' : `${colleges.length} saved college${colleges.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {!isLoading && colleges.length === 0 ? (
        <EmptyState
          icon={<BookMarked className="h-8 w-8" />}
          title="No saved colleges yet"
          description="Start browsing colleges and save the ones you're interested in."
          actionLabel="Browse Colleges"
          onAction={() => window.location.href = '/colleges'}
        />
      ) : (
        <CollegeGrid colleges={colleges} isLoading={isLoading} />
      )}
    </PageWrapper>
  )
}
