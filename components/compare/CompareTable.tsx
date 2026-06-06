'use client'

import Link from 'next/link'
import { X, Plus, Star } from 'lucide-react'
import { College } from '@/types'
import { SaveButton } from '@/components/college/SaveButton'
import { useCompareStore } from '@/store/compareStore'
import { formatFees, formatPackage, getCollegeGradient, getInitials } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CompareTableProps {
  colleges: College[]
}

type Row = {
  label: string
  key: keyof College | 'courses_count'
  format?: (value: unknown) => string
  isBest?: (values: (number | null)[]) => number  // returns index of best
  type?: 'text' | 'number' | 'progress' | 'rating'
}

const rows: Row[] = [
  { label: 'Location', key: 'location', type: 'text' },
  { label: 'Type', key: 'type', type: 'text' },
  { label: 'Category', key: 'category', type: 'text' },
  {
    label: 'Annual Fees',
    key: 'annualFees',
    format: (v) => formatFees(v as number),
    isBest: (vals) => {
      const idx = vals.reduce((bi: number, v, i, arr) => {
        const currentBest = arr[bi];
        return (v !== null && (currentBest === null || v < currentBest)) ? i : bi;
      }, 0);
      return idx;
    },
    type: 'number',
  },
  {
    label: 'Avg Package',
    key: 'avgPackage',
    format: (v) => (v ? formatPackage(v as number) : 'N/A'),
    isBest: (vals) => {
      const idx = vals.reduce((bi: number, v, i, arr) => {
        const currentBest = arr[bi];
        return (v !== null && (currentBest === null || v > currentBest)) ? i : bi;
      }, 0);
      return idx;
    },
    type: 'number',
  },
  {
    label: 'Highest Package',
    key: 'highestPackage',
    format: (v) => (v ? formatPackage(v as number) : 'N/A'),
    isBest: (vals) => {
      const idx = vals.reduce((bi: number, v, i, arr) => {
        const currentBest = arr[bi];
        return (v !== null && (currentBest === null || v > currentBest)) ? i : bi;
      }, 0);
      return idx;
    },
    type: 'number',
  },
  {
    label: 'Placement Rate',
    key: 'placementRate',
    format: (v) => (v ? `${v}%` : 'N/A'),
    isBest: (vals) => {
      const idx = vals.reduce((bi: number, v, i, arr) => {
        const currentBest = arr[bi];
        return (v !== null && (currentBest === null || v > currentBest)) ? i : bi;
      }, 0);
      return idx;
    },
    type: 'progress',
  },
  {
    label: 'Rating',
    key: 'rating',
    format: (v) => `${(v as number).toFixed(1)}/5`,
    isBest: (vals) => {
      const idx = vals.reduce((bi: number, v, i, arr) => {
        const currentBest = arr[bi];
        return (v !== null && (currentBest === null || v > currentBest)) ? i : bi;
      }, 0);
      return idx;
    },
    type: 'rating',
  },
  { label: 'Established', key: 'establishedYear', type: 'text' },
  {
    label: 'Total Students',
    key: 'totalStudents',
    format: (v) => (v as number).toLocaleString(),
    type: 'number',
  },
]

export function CompareTable({ colleges }: CompareTableProps) {
  const { removeCollege } = useCompareStore()
  const emptySlots = 3 - colleges.length

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              {/* Label column */}
              <th className="text-left p-4 w-36 bg-gray-50 text-sm font-semibold text-gray-500 sticky left-0 z-10">
                Category
              </th>
              {colleges.map((college) => {
                const gradient = getCollegeGradient(college.name)
                const initials = getInitials(college.name)
                return (
                  <th key={college.id} className="p-4 text-center min-w-[200px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg`}>
                        {initials}
                      </div>
                      <Link href={`/colleges/${college.id}`} className="text-sm font-semibold text-gray-900 hover:text-blue-600 text-center leading-tight">
                        {college.name}
                      </Link>
                      <div className="flex gap-1.5">
                        <SaveButton collegeId={college.id} showLabel />
                        <button
                          onClick={() => removeCollege(college.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:text-red-600 hover:border-red-200 transition-all"
                        >
                          <X className="h-3 w-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                )
              })}
              {/* Empty slots */}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <th key={`empty-${i}`} className="p-4 text-center min-w-[200px]">
                  <Link
                    href="/colleges"
                    className="flex flex-col items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <div className="h-16 w-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <Plus className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium">Add College</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const values = colleges.map((c) => {
                const val = c[row.key as keyof College]
                return typeof val === 'number' ? val : null
              })
              const bestIndex = row.isBest ? row.isBest(values) : -1

              return (
                <tr key={row.label} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-500 sticky left-0 bg-white hover:bg-gray-50/50 z-10">
                    {row.label}
                  </td>
                  {colleges.map((college, idx) => {
                    const rawVal = college[row.key as keyof College]
                    const displayVal = row.format
                      ? row.format(rawVal)
                      : rawVal !== null && rawVal !== undefined
                        ? String(rawVal)
                        : 'N/A'
                    const isBestCell = bestIndex === idx && typeof rawVal === 'number'

                    return (
                      <td key={college.id} className={cn('p-4 text-center', isBestCell && 'bg-emerald-50')}>
                        {row.type === 'progress' && typeof rawVal === 'number' ? (
                          <div className="flex flex-col items-center gap-1.5">
                            <span className={cn('text-sm font-semibold', isBestCell ? 'text-emerald-700' : 'text-gray-900')}>
                              {rawVal}%
                            </span>
                            <div className="w-full max-w-[120px] bg-gray-200 rounded-full h-2">
                              <div
                                className={cn('h-2 rounded-full transition-all', isBestCell ? 'bg-emerald-500' : 'bg-blue-500')}
                                style={{ width: `${rawVal}%` }}
                              />
                            </div>
                          </div>
                        ) : row.type === 'rating' && typeof rawVal === 'number' ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className={cn('text-sm font-semibold', isBestCell ? 'text-emerald-700' : 'text-gray-900')}>
                              {rawVal.toFixed(1)}/5
                            </span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.round(rawVal) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className={cn('text-sm', isBestCell ? 'text-emerald-700 font-semibold' : 'text-gray-900')}>
                            {displayVal}
                          </span>
                        )}
                      </td>
                    )
                  })}
                  {Array.from({ length: emptySlots }).map((_, i) => (
                    <td key={`empty-${i}`} className="p-4 text-center text-gray-200">—</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
