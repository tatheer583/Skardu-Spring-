import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/storage';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // ─── Validation ─────────────────────────────────────────
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // ─── Prevent Duplicates ──────────────────────────────────
    const subscribers = await readData('newsletter.json');
    const alreadySubscribed = subscribers.some(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadySubscribed) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed! Thank you for being part of the Skardu Spring family.' },
        { status: 200 }
      );
    }

    // ─── Store New Subscription ──────────────────────────────
    subscribers.push({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    });
    await writeData('newsletter.json', subscribers);

    return NextResponse.json(
      {
        success: true,
        message: "Welcome to the Skardu Spring family! You'll receive exclusive offers and wellness tips.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
