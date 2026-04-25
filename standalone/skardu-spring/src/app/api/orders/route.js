import { NextResponse } from 'next/server';
import { appendData } from '@/lib/storage';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, shipping, paymentMethod, subtotal, deliveryFee, total } = body;

    // ─── Validation ─────────────────────────────────────────
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty.' },
        { status: 400 }
      );
    }

    if (!shipping || !shipping.fullName || !shipping.phone || !shipping.address || !shipping.city) {
      return NextResponse.json(
        { error: 'Please fill in all shipping details.' },
        { status: 400 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Please select a payment method.' },
        { status: 400 }
      );
    }

    // ─── Generate Unique Order ID ────────────────────────────
    const orderId = `SKD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // ─── Build Order Object ──────────────────────────────────
    const order = {
      orderId,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      shipping,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending_payment',
      createdAt: new Date().toISOString(),
      estimatedDelivery: getEstimatedDelivery(shipping.city),
    };

    // ─── Persist to Local JSON ───────────────────────────────
    await appendData('orders.json', order);

    // ─── Send Email Notifications (non-blocking) ─────────────
    sendOrderConfirmation({ order, shipping }).catch(err =>
      console.error('📧 Order email failed:', err.message)
    );

    return NextResponse.json(
      {
        success: true,
        orderId: order.orderId,
        status: order.status,
        estimatedDelivery: order.estimatedDelivery,
        message: paymentMethod === 'cod'
          ? 'Your order has been confirmed! Pay upon delivery.'
          : 'Your order has been received. Please complete the bank transfer to confirm.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Orders API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your order. Please try again.' },
      { status: 500 }
    );
  }
}

function getEstimatedDelivery(city) {
  const now = new Date();
  const cityLower = (city || '').toLowerCase();

  let daysToAdd = 3; // default
  if (cityLower.includes('islamabad') || cityLower.includes('rawalpindi')) {
    daysToAdd = 1;
  } else if (cityLower.includes('lahore')) {
    daysToAdd = 2;
  } else if (cityLower.includes('karachi')) {
    daysToAdd = 3;
  }

  const delivery = new Date(now);
  delivery.setDate(delivery.getDate() + daysToAdd);

  return delivery.toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
