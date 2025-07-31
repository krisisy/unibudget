import { prisma } from '../../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()
    console.log('Received signup data', { name, email, password})

    if (!name || !email || !password) {
      return NextResponse.json({error: "Missing fields."}, { status: 400})
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      console.log('User already exists: ', { name, email})
      return NextResponse.json({ error: 'Email is already in use' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: { name, email, password }
    })

    console.log('User created:', user)
    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.messsage },
      { status: 500}
    )
  }
}
