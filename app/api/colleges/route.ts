import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { collegeQuerySchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const rawParams = Object.fromEntries(searchParams.entries())

    const parsed = collegeQuerySchema.safeParse(rawParams)
    if (!parsed.success) {
      return NextResponse.json(
        { data: null, error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { q, category, type, state, minFees, maxFees, minRating, sortBy, page, limit } =
      parsed.data

    const where: import('@prisma/client').Prisma.CollegeWhereInput = {}

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
        { state: { contains: q, mode: 'insensitive' } },
      ]
    }
    if (category) where.category = category
    if (type) where.type = type
    if (state) where.state = { contains: state, mode: 'insensitive' }
    if (minFees !== undefined) where.annualFees = { ...((where.annualFees as object) ?? {}), gte: minFees }
    if (maxFees !== undefined) where.annualFees = { ...((where.annualFees as object) ?? {}), lte: maxFees }
    if (minRating !== undefined) where.rating = { gte: minRating }

    const orderBy: import('@prisma/client').Prisma.CollegeOrderByWithRelationInput = (() => {
      switch (sortBy) {
        case 'fees_asc': return { annualFees: 'asc' as const }
        case 'fees_desc': return { annualFees: 'desc' as const }
        case 'rating_desc': return { rating: 'desc' as const }
        case 'name_asc': return { name: 'asc' as const }
        default: return { rating: 'desc' as const }
      }
    })()

    const [total, colleges] = await Promise.all([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          _count: { select: { courses: true } },
        },
      }),
    ])

    return NextResponse.json({
      data: {
        data: colleges,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      error: null,
    })
  } catch (error) {
    console.error('[GET /api/colleges]', error)
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 })
  }
}
