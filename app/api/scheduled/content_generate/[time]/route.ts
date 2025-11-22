import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedSecret = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedSecret) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  console.log("Starting daily research job...");

  return NextResponse.json({ success: true, message: "Research job triggered." });
}