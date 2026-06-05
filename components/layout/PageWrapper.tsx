import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  hasCompareTray?: boolean
}

export function PageWrapper({ children, className, hasCompareTray = false }: PageWrapperProps) {
  return (
    <main className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8', hasCompareTray && 'pb-28', className)}>
      {children}
    </main>
  )
}
