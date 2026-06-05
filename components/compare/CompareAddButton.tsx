'use client'

import { BarChart2 } from 'lucide-react'
import { College } from '@/types'
import { useCompareStore } from '@/store/compareStore'
import { cn } from '@/lib/utils'

interface CompareAddButtonProps {
  college: College
  showLabel?: boolean
}

export function CompareAddButton({ college, showLabel = false }: CompareAddButtonProps) {
  const { addCollege, removeCollege, isSelected, isFull } = useCompareStore()
  const selected = isSelected(college.id)
  const full = isFull()
  const disabled = !selected && full

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (selected) {
      removeCollege(college.id)
    } else if (!full) {
      addCollege(college)
    }
  }

  const tooltip = disabled ? 'Remove a college first' : selected ? 'Remove from compare' : 'Add to compare'

  if (showLabel) {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        title={tooltip}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all',
          selected
            ? 'border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100'
            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <BarChart2 className="h-4 w-4" />
        {selected ? 'Comparing' : 'Compare'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      title={tooltip}
      aria-label={tooltip}
      className={cn(
        'p-2 rounded-lg border text-sm font-medium transition-all',
        selected
          ? 'border-blue-300 text-blue-600 bg-blue-50'
          : 'border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-300',
        disabled && 'opacity-40 cursor-not-allowed'
      )}
    >
      <BarChart2 className="h-4 w-4" />
    </button>
  )
}
