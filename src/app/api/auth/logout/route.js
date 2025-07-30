import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  cookies().delete('user')
  return NextResponse.json({ success: true })
}
