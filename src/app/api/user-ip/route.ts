// src/app/api/user-ip/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserIP } from '@/lib/utils/getUserIP';

export async function GET(request: NextRequest) {
  // сначала пробуем X-Forwarded-For
  const xff = request.headers.get('x-forwarded-for') ?? '';
  const ip = xff.split(',')[0].trim() || getUserIP(request as any);
  return NextResponse.json({ ip });
}