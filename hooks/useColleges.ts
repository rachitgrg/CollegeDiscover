'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PaginatedResponse, College, CollegeQueryParams } from '@/types'

async function fetchColleges(params: CollegeQueryParams): Promise<PaginatedResponse<College>> {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      searchParams.set(key, String(value))
    }
  })
  const res = await fetch(`/api/colleges?${searchParams.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch colleges')
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.data
}

export function useColleges(params: CollegeQueryParams) {
  return useQuery({
    queryKey: ['colleges', params],
    queryFn: () => fetchColleges(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  })
}
