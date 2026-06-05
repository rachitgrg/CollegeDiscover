'use client'

import { MapPin, Star, ExternalLink } from 'lucide-react'
import { College } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { SaveButton } from './SaveButton'
import { CompareAddButton } from '@/components/compare/CompareAddButton'
import { formatFees, getCollegeGradient, getInitials } from '@/lib/utils'

interface CollegeHeaderProps {
  college: College
}

export function CollegeHeader({ college }: CollegeHeaderProps) {
  const gradient = getCollegeGradient(college.name)
  const initials = getInitials(college.name)
  const stars = Math.round(college.rating)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Hero */}
      <div className={`relative h-48 md:h-64 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-white text-6xl md:text-8xl font-bold opacity-25 select-none">
          {initials}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{college.name}</h1>

            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{college.location}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="category">{college.category}</Badge>
              <Badge variant="type">{college.type}</Badge>
              <Badge variant="state">{college.state}</Badge>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-700 ml-1">{college.rating.toFixed(1)}/5</span>
                <span className="text-sm text-gray-400">({college.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">{formatFees(college.annualFees)}</span>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2">
            <SaveButton collegeId={college.id} showLabel />
            <CompareAddButton college={college} showLabel />
            {college.website && (
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
