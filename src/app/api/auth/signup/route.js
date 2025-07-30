import { prisma } from '../../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { name, email, password } = await req.json()

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const user = await prisma.user.create({
    data: { name, email, password }
  })

  return NextResponse.json({ success: true, user })
}
