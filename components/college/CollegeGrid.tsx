import { College } from '@/types'
import { CollegeCard } from './CollegeCard'
import { CollegeCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchX } from 'lucide-react'

interface CollegeGridProps {
  colleges?: College[]
  isLoading?: boolean
  onClearFilters?: () => void
}

export function CollegeGrid({ colleges, isLoading, onClearFilters }: CollegeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <CollegeCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!colleges || colleges.length === 0) {
    return (
      <EmptyState
        icon={<SearchX className="h-8 w-8" />}
        title="No colleges found"
        description="Try adjusting your search or filters to find what you're looking for."
        actionLabel={onClearFilters ? 'Clear Filters' : undefined}
        onAction={onClearFilters}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  )
}
