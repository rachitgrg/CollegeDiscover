import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  _request: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const { collegeId } = params

    // Verify college exists
    const college = await prisma.college.findUnique({ where: { id: collegeId } })
    if (!college) {
      return NextResponse.json({ data: null, error: 'College not found' }, { status: 404 })
    }

    await prisma.savedCollege.upsert({
      where: { userId_collegeId: { userId: session.user.id, collegeId } },
      create: { userId: session.user.id, collegeId },
      update: {},
    })

    return NextResponse.json({ data: { saved: true }, error: null })
  } catch (error) {
    console.error('[POST /api/saved/:collegeId]', error)
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.savedCollege.deleteMany({
      where: { userId: session.user.id, collegeId: params.collegeId },
    })

    return NextResponse.json({ data: { saved: false }, error: null })
  } catch (error) {
    console.error('[DELETE /api/saved/:collegeId]', error)
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 })
  }
}
