'use client'

import Link from 'next/link'
import { X, BarChart2 } from 'lucide-react'
import { useCompareStore } from '@/store/compareStore'
import { truncate } from '@/lib/utils'

export function CompareTray() {
  const { selectedColleges, selectedIds, removeCollege, clearAll } = useCompareStore()

  if (selectedIds.length === 0) return null

  const compareUrl = `/compare?ids=${selectedIds.join(',')}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-700 shrink-0">
              Compare ({selectedIds.length}/3):
            </span>

            <div className="flex items-center gap-2 flex-wrap flex-1">
              {selectedColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-sm text-blue-700"
                >
                  <span>{truncate(college.name, 30)}</span>
                  <button
                    onClick={() => removeCollege(college.id)}
                    aria-label={`Remove ${college.name}`}
                    className="text-blue-400 hover:text-blue-600 ml-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear all
              </button>
              <Link
                href={compareUrl}
                className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BarChart2 className="h-4 w-4" />
                Compare Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
