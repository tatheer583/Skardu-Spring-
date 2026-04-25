const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOrderEmails = async (order) => {
  const { customerName, product, quantity, phone, address } = order;

  // Professional Customer Template
  const customerMailOptions = {
    from: `"Skardu Spring | Purity Delivered" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // Testing: sending to admin. In real app, collect customer email.
    subject: 'Your Hydration Journey Begins - Skardu Spring',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6; }
          .header { background: #0a2e5c; padding: 40px; text-align: center; border-radius: 20px 20px 0 0; }
          .logo-text { color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 2px; }
          .content { background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 20px 20px; }
          .order-card { background: #f8fafc; border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid #f1f5f9; }
          .product-name { color: #0072ff; font-weight: 700; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #94a3b8; }
          .btn { display: inline-block; background: #0072ff; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 10px; font-weight: 600; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-text">SKARDU SPRING</div>
          </div>
          <div class="content">
            <h1>Thank you, ${customerName}.</h1>
            <p>Your request for absolute purity has been received. We are currently preparing your delivery from the Karakoram glaciers.</p>
            
            <div class="order-card">
              <h3 style="margin-top: 0;">Order Summary</h3>
              <p><strong>Item:</strong> <span class="product-name">${product}</span></p>
              <p><strong>Quantity:</strong> ${quantity}</p>
              <p><strong>Address:</strong> ${address}</p>
              <p><strong>Status:</strong> Awaiting Confirmation</p>
            </div>
            
            <p>Our concierge team will contact you at <strong>${phone}</strong> within the next hour to confirm your delivery window.</p>
            <p>Stay hydrated with nature's finest.</p>
            
            <a href="https://wa.me/923492899537" class="btn">Chat with Support</a>
          </div>
          <div class="footer">
            &copy; 2026 Skardu Spring Water. All rights reserved.<br>
            Purity from the Peaks.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Professional Admin Alert
  const adminMailOptions = {
    from: `"Store Alert" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🚨 NEW ORDER: ${customerName} - ${product}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #0a2e5c;">New Order Received</h2>
        <div style="background: #f1f5f9; padding: 20px; border-radius: 10px;">
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Address:</strong> ${address}</p>
        </div>
        <p>Please process this order immediately in the admin dashboard.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Professional order emails dispatched');
  } catch (error) {
    console.error('❌ Email Dispatch Error:', error);
  }
};

const sendContactEmail = async (contact) => {
  const { name, email, subject, message } = contact;

  const mailOptions = {
    from: `"Skardu Support Alert" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `📩 NEW INQUIRY: ${subject} (${name})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #0072ff;">New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #94a3b8;">This message was sent from the Skardu Spring website contact form.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact inquiry email dispatched');
  } catch (error) {
    console.error('❌ Contact Email Error:', error);
  }
};

module.exports = { sendOrderEmails, sendContactEmail };
