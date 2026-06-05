'use client'

import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSavedIds, useSaveToggle } from '@/hooks/useSaved'

interface SaveButtonProps {
  collegeId: string
  showLabel?: boolean
}

export function SaveButton({ collegeId, showLabel = false }: SaveButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const savedIds = useSavedIds()
  const { save, unsave } = useSaveToggle()
  const isSaved = savedIds.has(collegeId)
  const isLoading = save.isPending || unsave.isPending

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!session) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    if (isSaved) {
      unsave.mutate(collegeId)
    } else {
      save.mutate(collegeId)
    }
  }

  if (showLabel) {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all',
          isSaved
            ? 'border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100'
            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
          'disabled:opacity-50'
        )}
      >
        <Heart className={cn('h-4 w-4', isSaved && 'fill-rose-500 text-rose-500')} />
        {isSaved ? 'Saved' : 'Save'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isSaved ? 'Remove from saved' : 'Save college'}
      className={cn(
        'p-2 rounded-lg transition-all',
        isSaved ? 'bg-white/90 text-rose-500' : 'bg-white/80 text-gray-400 hover:text-rose-500',
        'disabled:opacity-50'
      )}
    >
      <Heart className={cn('h-4 w-4', isSaved && 'fill-rose-500')} />
    </button>
  )
}
