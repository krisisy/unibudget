import { prisma } from '../../../../../lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 401 })
    }

    if (user.password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
    }

    cookies().set('user', user.email, { httpOnly: true })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal Server Error'}, { status: 500})
  }
}
