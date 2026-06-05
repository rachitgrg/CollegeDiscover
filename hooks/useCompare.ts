'use client'

import { useCompareStore } from '@/store/compareStore'

export function useCompare() {
  const store = useCompareStore()
  return store
}
