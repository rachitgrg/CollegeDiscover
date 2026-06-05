import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { College } from '@/types'

interface CompareStore {
  selectedIds: string[]
  selectedColleges: College[]
  addCollege: (college: College) => void
  removeCollege: (id: string) => void
  clearAll: () => void
  isSelected: (id: string) => boolean
  isFull: () => boolean
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      selectedIds: [],
      selectedColleges: [],
      addCollege: (college: College) => {
        const { selectedIds, selectedColleges } = get()
        if (selectedIds.length >= 3) return
        if (selectedIds.includes(college.id)) return
        set({
          selectedIds: [...selectedIds, college.id],
          selectedColleges: [...selectedColleges, college],
        })
      },
      removeCollege: (id: string) => {
        set((state) => ({
          selectedIds: state.selectedIds.filter((sid) => sid !== id),
          selectedColleges: state.selectedColleges.filter((c) => c.id !== id),
        }))
      },
      clearAll: () => set({ selectedIds: [], selectedColleges: [] }),
      isSelected: (id: string) => get().selectedIds.includes(id),
      isFull: () => get().selectedIds.length >= 3,
    }),
    {
      name: 'college-compare-store',
    }
  )
)
