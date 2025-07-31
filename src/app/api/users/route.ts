import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// GET /api/users
export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

// POST /api/users
export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  const newUser = await prisma.user.create({
    data: { name, email, password },
  })

  return NextResponse.json(newUser)
}
