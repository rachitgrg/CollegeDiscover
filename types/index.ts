export interface College {
  id: string
  name: string
  slug: string
  location: string
  city: string
  state: string
  type: 'Public' | 'Private' | 'Deemed'
  category: 'Engineering' | 'Medical' | 'Management' | 'Arts' | 'Science'
  rating: number
  reviewCount: number
  annualFees: number
  establishedYear: number
  totalStudents: number
  description: string
  website?: string
  imageUrl?: string
  avgPackage?: number
  highestPackage?: number
  placementRate?: number
  courses?: Course[]
  reviews?: Review[]
}

export interface Course {
  id: string
  name: string
  duration: number
  fees: number
  seats?: number
}

export interface Review {
  id: string
  rating: number
  title: string
  body: string
  userId: string
  createdAt: string
  user?: { name?: string | null; image?: string | null }
}

export interface CollegeQueryParams {
  q?: string
  category?: string
  type?: string
  state?: string
  minFees?: number
  maxFees?: number
  minRating?: number
  sortBy?: string
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface SavedCollege {
  id: string
  collegeId: string
  savedAt: string
  college: College
}
