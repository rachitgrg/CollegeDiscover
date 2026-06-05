import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format fees in INR to abbreviated form
 * 200000 → "₹2L/year", 1500000 → "₹15L/year", 50000 → "₹50K/year"
 */
export function formatFees(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)}L/year`
  }
  if (amount >= 1000) {
    const thousands = amount / 1000
    return `₹${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K/year`
  }
  return `₹${amount}/year`
}

/**
 * Format package in INR to LPA
 * 800000 → "8 LPA", 2500000 → "25 LPA"
 */
export function formatPackage(amount: number): string {
  const lpa = amount / 100000
  return `${lpa % 1 === 0 ? lpa : lpa.toFixed(1)} LPA`
}

/**
 * Generate star array for rating display
 */
export function getStars(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push('full')
    } else if (rating >= i - 0.5) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }
  return stars
}

/**
 * Truncate text to specified character length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

/**
 * Get initials from a college name (up to 3 letters)
 */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()
  if (words.length === 2) return (words[0][0] + words[1][0]).toUpperCase()
  return (words[0][0] + words[1][0] + words[2][0]).toUpperCase()
}

/**
 * Get a deterministic gradient class based on college name
 */
export function getCollegeGradient(name: string): string {
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-lime-500 to-green-600',
    'from-sky-500 to-cyan-600',
    'from-fuchsia-500 to-violet-600',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % gradients.length
  }
  return gradients[Math.abs(hash) % gradients.length]
}
