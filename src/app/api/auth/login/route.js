import { prisma } from '../../../../../lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log('failed to find the user:', user);
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log('Wrong password input:', password);
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set('user', user.email, { httpOnly: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
