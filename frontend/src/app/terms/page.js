import styles from '../privacy-policy/Legal.module.css';

export const metadata = {
  title: 'Terms of Service | Skardu Spring',
  description: 'Read the terms and conditions for using the Skardu Spring website and ordering our products.',
};

export default function TermsPage() {
  return (
    <div className={styles.legalPage}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Legal</span>
          <h1>Terms of Service</h1>
          <p>Last updated: April 2026</p>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.container}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Skardu Spring website and services, you agree to be 
              bound by these Terms of Service. If you do not agree to these terms, please do 
              not use our services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Products & Ordering</h2>
            <ul>
              <li>All product descriptions and images are provided for informational purposes. Actual products may vary slightly in appearance.</li>
              <li>Prices are listed in Pakistani Rupees (PKR) and are subject to change without notice.</li>
              <li>We reserve the right to limit quantities or refuse orders at our discretion.</li>
              <li>Orders are confirmed once you receive an order confirmation with a valid order ID.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Payment Terms</h2>
            <p>We accept the following payment methods:</p>
            <ul>
              <li><strong>Cash on Delivery (COD):</strong> Pay upon delivery. Available in Islamabad, Rawalpindi, Lahore, and Karachi.</li>
              <li><strong>JazzCash / EasyPaisa:</strong> Mobile wallet payments with screenshot confirmation.</li>
              <li><strong>Bank Transfer:</strong> Direct bank transfer with receipt verification.</li>
            </ul>
            <p>
              For non-COD orders, payment must be completed within 24 hours of placing the order, 
              or the order may be automatically cancelled.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Delivery & Shipping</h2>
            <ul>
              <li>Standard delivery: 24-48 hours in major cities</li>
              <li>Free delivery on orders above Rs. 2,000</li>
              <li>Standard delivery fee: Rs. 150</li>
              <li>Delivery times are estimates and may vary due to unforeseen circumstances</li>
              <li>The customer is responsible for providing accurate delivery information</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Returns & Refunds</h2>
            <ul>
              <li>We accept returns for damaged or defective products within 48 hours of delivery.</li>
              <li>Please contact us with photos of the damaged product for a swift resolution.</li>
              <li>Refunds will be processed within 5-7 business days via the original payment method.</li>
              <li>Opened or consumed products cannot be returned unless defective.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Intellectual Property</h2>
            <p>
              All content on this website, including logos, images, text, and designs, 
              is the intellectual property of Skardu Spring and is protected by copyright laws. 
              Unauthorized reproduction or distribution is strictly prohibited.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Limitation of Liability</h2>
            <p>
              Skardu Spring shall not be liable for any indirect, incidental, or consequential 
              damages arising from the use of our website or products. Our total liability 
              shall not exceed the amount paid for the specific order in question.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Contact</h2>
            <p>For any questions about these terms, contact us:</p>
            <ul>
              <li>Email: <a href="mailto:info@skarduspring.com">info@skarduspring.com</a></li>
              <li>WhatsApp: <a href="https://wa.me/923492899537">+92 349 2899537</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
