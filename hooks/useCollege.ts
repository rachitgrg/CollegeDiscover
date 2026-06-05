'use client'

import { useQuery } from '@tanstack/react-query'
import { College } from '@/types'

async function fetchCollege(id: string): Promise<College> {
  const res = await fetch(`/api/colleges/${id}`)
  if (!res.ok) throw new Error('Failed to fetch college')
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.data
}

export function useCollege(id: string) {
  return useQuery({
    queryKey: ['college', id],
    queryFn: () => fetchCollege(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  })
}

export function useMultipleColleges(ids: string[]) {
  return useQuery({
    queryKey: ['colleges-multiple', ids],
    queryFn: async () => {
      if (ids.length === 0) return []
      const results = await Promise.allSettled(
        ids.map((id) => fetchCollege(id))
      )
      return results
        .filter((r): r is PromiseFulfilledResult<College> => r.status === 'fulfilled')
        .map((r) => r.value)
    },
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 5,
  })
}
