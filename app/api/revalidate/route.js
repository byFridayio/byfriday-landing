import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const secret = req.headers.get('x-sanity-secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
