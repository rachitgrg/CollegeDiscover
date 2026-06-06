'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, ExternalLink } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { CollegeHeader } from '@/components/college/CollegeHeader'
import { CollegeStats } from '@/components/college/CollegeStats'
import { CollegeCard } from '@/components/college/CollegeCard'
import { CollegeDetailSkeleton } from '@/components/ui/Skeleton'
import { useCollege } from '@/hooks/useCollege'
import { useColleges } from '@/hooks/useColleges'
import { useCompareStore } from '@/store/compareStore'
import { formatFees, formatPackage } from '@/lib/utils'

export default function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { selectedIds } = useCompareStore()
  const hasCompareTray = selectedIds.length > 0

  const { data: college, isLoading, isError } = useCollege(id)

  const { data: similarData } = useColleges(
    college
      ? { category: college.category, state: college.state, limit: 5 }
      : { limit: 0 }
  )

  const similarColleges = similarData?.data?.filter((c) => c.id !== id).slice(0, 4) ?? []

  if (isLoading) {
    return (
      <PageWrapper>
        <CollegeDetailSkeleton />
      </PageWrapper>
    )
  }

  if (isError || !college) {
    return (
      <PageWrapper>
        <div className="text-center py-24">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">College Not Found</h1>
          <p className="text-gray-500 mb-6">The college you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/colleges" className="text-blue-600 hover:underline">
            ← Back to colleges
          </Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper hasCompareTray={hasCompareTray}>
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to colleges
      </button>

      <div className="space-y-6">
        {/* Header */}
        <CollegeHeader college={college} />

        {/* Quick Stats */}
        <CollegeStats college={college} />

        {/* About */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{college.description}</p>
          {college.website && (
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm mt-3 font-medium"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {college.website}
            </a>
          )}
        </div>

        {/* Courses */}
        {college.courses && college.courses.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Courses Offered</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-4 font-medium text-gray-500">Course Name</th>
                    <th className="text-left py-2 pr-4 font-medium text-gray-500">Duration</th>
                    <th className="text-left py-2 pr-4 font-medium text-gray-500">Annual Fees</th>
                    <th className="text-left py-2 font-medium text-gray-500">Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {college.courses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-3 pr-4 font-medium text-gray-900">{course.name}</td>
                      <td className="py-3 pr-4 text-gray-600">{course.duration} {course.duration === 1 ? 'year' : 'years'}</td>
                      <td className="py-3 pr-4 text-gray-900">{formatFees(course.fees)}</td>
                      <td className="py-3 text-gray-600">{course.seats ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placement Stats */}
        {(college.avgPackage || college.highestPackage || college.placementRate) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Placement Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {college.avgPackage && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Average Package</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatPackage(college.avgPackage)}</p>
                </div>
              )}
              {college.highestPackage && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Highest Package</p>
                  <p className="text-2xl font-bold text-blue-600">{formatPackage(college.highestPackage)}</p>
                </div>
              )}
              {college.placementRate !== undefined && college.placementRate !== null && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Placement Rate</p>
                  <p className="text-2xl font-bold text-violet-600">{college.placementRate}%</p>
                  <div className="mt-2 bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-violet-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${college.placementRate}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Student Reviews ({college.reviews?.length ?? 0})
          </h2>
          {!college.reviews || college.reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Star className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No reviews yet. Be the first to review this college!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {college.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{review.title}</p>
                      <p className="text-xs text-gray-400">
                        {review.user?.name ?? 'Anonymous'} •{' '}
                        {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-amber-700">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Colleges */}
        {similarColleges.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Colleges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarColleges.map((c) => (
                <CollegeCard key={c.id} college={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
