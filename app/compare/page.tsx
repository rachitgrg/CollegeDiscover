'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { CompareTable } from '@/components/compare/CompareTable'
import { Spinner } from '@/components/ui/Spinner'
import { useMultipleColleges } from '@/hooks/useCollege'

function CompareContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rawIds = searchParams.get('ids') ?? ''
  const ids = rawIds.split(',').filter((id) => id.trim().length > 0).slice(0, 3)

  const { data: colleges, isLoading, isError } = useMultipleColleges(ids)

  useEffect(() => {
    if (!isLoading && ids.length === 0) {
      router.replace('/colleges')
    }
  }, [isLoading, ids.length, router])

  if (ids.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center py-24">
          <p className="text-gray-500 mb-4">No colleges selected for comparison.</p>
          <Link href="/colleges" className="text-blue-600 hover:underline">Browse colleges</Link>
        </div>
      </PageWrapper>
    )
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-24">
          <Spinner size="lg" />
        </div>
      </PageWrapper>
    )
  }

  if (isError || !colleges || colleges.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center py-24">
          <p className="text-red-600 mb-4">Failed to load college data.</p>
          <Link href="/colleges" className="text-blue-600 hover:underline">Browse colleges</Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compare Colleges</h1>
        <p className="text-sm text-gray-500 mt-1">
          Comparing {colleges.length} college{colleges.length !== 1 ? 's' : ''}. Best values highlighted in green.
        </p>
      </div>
      <CompareTable colleges={colleges} />
      <div className="mt-6 text-center">
        <Link
          href="/colleges"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Add more colleges to compare
        </Link>
      </div>
    </PageWrapper>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={<PageWrapper><div className="flex justify-center py-24"><Spinner size="lg" /></div></PageWrapper>}>
      <CompareContent />
    </Suspense>
  )
}
