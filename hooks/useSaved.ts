'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { SavedCollege } from '@/types'

async function fetchSavedColleges(): Promise<SavedCollege[]> {
  const res = await fetch('/api/saved')
  if (!res.ok) {
    if (res.status === 401) return []
    throw new Error('Failed to fetch saved colleges')
  }
  const json = await res.json()
  return json.data ?? []
}

export function useSavedColleges() {
  return useQuery({
    queryKey: ['saved-colleges'],
    queryFn: fetchSavedColleges,
    staleTime: 1000 * 60 * 2,
  })
}

export function useSavedIds() {
  const { data } = useSavedColleges()
  return new Set(data?.map((s) => s.collegeId ?? s.college?.id) ?? [])
}

export function useSaveToggle() {
  const queryClient = useQueryClient()

  const save = useMutation({
    mutationFn: async (collegeId: string) => {
      const res = await fetch(`/api/saved/${collegeId}`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to save college')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-colleges'] })
    },
  })

  const unsave = useMutation({
    mutationFn: async (collegeId: string) => {
      const res = await fetch(`/api/saved/${collegeId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to unsave college')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-colleges'] })
    },
  })

  return { save, unsave }
}
