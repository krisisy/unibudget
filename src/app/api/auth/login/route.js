import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  cookies().set('user', user.email, { httpOnly: true })
  return NextResponse.json({ success: true })
}
