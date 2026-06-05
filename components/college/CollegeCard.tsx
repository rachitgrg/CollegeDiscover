'use client'

import Link from 'next/link'
import { MapPin, Star, TrendingUp } from 'lucide-react'
import { College } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SaveButton } from './SaveButton'
import { CompareAddButton } from '@/components/compare/CompareAddButton'
import { formatFees, formatPackage, getCollegeGradient, getInitials, truncate } from '@/lib/utils'

interface CollegeCardProps {
  college: College
}

export function CollegeCard({ college }: CollegeCardProps) {
  const gradient = getCollegeGradient(college.name)
  const initials = getInitials(college.name)

  const stars = Math.round(college.rating)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image / Gradient */}
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
        <span className="text-white text-4xl font-bold opacity-90">{initials}</span>
        <div className="absolute top-3 right-3">
          <SaveButton collegeId={college.id} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1" title={college.name}>
          {truncate(college.name, 45)}
        </h3>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{college.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="category">{college.category}</Badge>
          <Badge variant="type">{college.type}</Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{college.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({college.reviewCount.toLocaleString()})</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-gray-500 mb-0.5">Annual Fees</p>
            <p className="font-semibold text-gray-900">{formatFees(college.annualFees)}</p>
          </div>
          {college.avgPackage && (
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-gray-500 mb-0.5">Avg Package</p>
              <p className="font-semibold text-gray-900">{formatPackage(college.avgPackage)}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/colleges/${college.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <CompareAddButton college={college} />
        </div>
      </div>
    </div>
  )
}
