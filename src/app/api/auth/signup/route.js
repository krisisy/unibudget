import { prisma } from '../../../../../lib/prisma'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt';

export async function POST(req) {
  const prisma = new PrismaClient();

  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({error: "Missing fields."}, { status: 400})
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      console.log('User already exists: ', { name, email})
      return NextResponse.json({ error: 'Email is already in use' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
      name,
      email,
      password: hashedPassword,
      },
    });
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
    );
  }
}