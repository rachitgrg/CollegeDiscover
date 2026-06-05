import { X } from 'lucide-react'

interface FilterChipProps {
  label: string
  onRemove: () => void
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  )
}
