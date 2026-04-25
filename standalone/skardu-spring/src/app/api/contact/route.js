import { NextResponse } from 'next/server';
import { appendData } from '@/lib/storage';
import { sendContactNotification } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // ─── Validation ─────────────────────────────────────────
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // ─── Build Record ────────────────────────────────────────
    const record = {
      id: `CTX-${Date.now().toString(36).toUpperCase()}`,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    // ─── Persist to Local JSON ───────────────────────────────
    await appendData('contacts.json', record);

    // ─── Send Email to Admin (non-blocking) ──────────────────
    sendContactNotification({ name, email, subject, message }).catch(err =>
      console.error('📧 Contact email failed:', err.message)
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! We will get back to you within 2 hours during business hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
