/**
 * Skardu Spring — Email Service
 * Sends transactional emails via Gmail SMTP using nodemailer.
 * Used for: order confirmations, contact form notifications, admin alerts.
 */

import nodemailer from 'nodemailer';

/**
 * Create a reusable SMTP transporter.
 * Uses Gmail App Password from environment variables.
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Send a contact form notification to the admin.
 */
export async function sendContactNotification({ name, email, subject, message }) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Skardu Spring" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 30px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0A2E5C; font-size: 24px; margin: 0;">💧 New Contact Message</h1>
          <p style="color: #4B5A6D; margin-top: 8px;">Received via skarduspring.com</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 12px;"><strong style="color: #0A2E5C;">From:</strong> ${name}</p>
          <p style="margin: 0 0 12px;"><strong style="color: #0A2E5C;">Email:</strong> <a href="mailto:${email}" style="color: #1A5CA8;">${email}</a></p>
          <p style="margin: 0 0 12px;"><strong style="color: #0A2E5C;">Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="margin: 0; color: #2D3436; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px;">
          Skardu Spring — Pure Mountain Water
        </p>
      </div>
    `,
  });
}

/**
 * Send an order confirmation email to the customer.
 */
export async function sendOrderConfirmation({ order, shipping }) {
  const transporter = createTransporter();

  // Build the items table
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #f1f5f9;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; text-align: right;">Rs. ${item.price * item.quantity}</td>
    </tr>
  `).join('');

  const emailHtml = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 30px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0A2E5C; font-size: 24px; margin: 0;">✅ Order Confirmed!</h1>
        <p style="color: #4B5A6D; margin-top: 8px;">Thank you for choosing Skardu Spring</p>
      </div>

      <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <p style="margin: 0 0 8px;"><strong style="color: #0A2E5C;">Order ID:</strong> ${order.orderId}</p>
        <p style="margin: 0 0 8px;"><strong style="color: #0A2E5C;">Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-PK', { dateStyle: 'long' })}</p>
        <p style="margin: 0 0 8px;"><strong style="color: #0A2E5C;">Payment:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
        <p style="margin: 0;"><strong style="color: #0A2E5C;">Est. Delivery:</strong> ${order.estimatedDelivery}</p>
      </div>

      <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <h3 style="color: #0A2E5C; margin: 0 0 16px;">Items Ordered</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f8fafc;">
              <th style="padding: 12px; text-align: left; color: #4B5A6D;">Product</th>
              <th style="padding: 12px; text-align: center; color: #4B5A6D;">Qty</th>
              <th style="padding: 12px; text-align: right; color: #4B5A6D;">Total</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <hr style="border: none; border-top: 2px solid #0A2E5C; margin: 16px 0 12px;" />
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;">
          <span style="color: #4B5A6D;">Subtotal</span>
          <span>Rs. ${order.subtotal}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;">
          <span style="color: #4B5A6D;">Delivery</span>
          <span>${order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: #0A2E5C; margin-top: 8px;">
          <span>Total</span>
          <span>Rs. ${order.total}</span>
        </div>
      </div>

      <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <h3 style="color: #0A2E5C; margin: 0 0 12px;">Shipping To</h3>
        <p style="margin: 0 0 4px;">${shipping.fullName}</p>
        <p style="margin: 0 0 4px;">${shipping.address}</p>
        <p style="margin: 0 0 4px;">${shipping.city} ${shipping.postalCode || ''}</p>
        <p style="margin: 0;">📞 ${shipping.phone}</p>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://wa.me/923492899537?text=Hi! I just placed order ${order.orderId}. Please confirm." 
           style="display: inline-block; background: #25d366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Confirm on WhatsApp
        </a>
      </div>

      <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px;">
        Skardu Spring — Pure Mountain Water | +92 349 2899537
      </p>
    </div>
  `;

  // Send to customer (if email provided)
  if (shipping.email) {
    await transporter.sendMail({
      from: `"Skardu Spring" <${process.env.EMAIL_USER}>`,
      to: shipping.email,
      subject: `Order Confirmed — ${order.orderId} | Skardu Spring`,
      html: emailHtml,
    });
  }

  // Send notification to admin
  await transporter.sendMail({
    from: `"Skardu Spring" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `🛒 New Order — ${order.orderId} (Rs. ${order.total})`,
    html: emailHtml,
  });
}
