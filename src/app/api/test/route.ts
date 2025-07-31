import { prisma } from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (err) {
    console.error('DB error:', err)
    return NextResponse.json({ error: 'Database not working', details: err.message }, { status: 500 })
  }
}
