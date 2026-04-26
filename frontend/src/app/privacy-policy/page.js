import styles from './Legal.module.css';

export const metadata = {
  title: 'Privacy Policy | Skardu Spring',
  description: 'Learn how Skardu Spring collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.legalPage}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Legal</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: April 2026</p>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.container}>
          <section className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>
              When you interact with Skardu Spring, we may collect the following information:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address when you place an order or contact us.</li>
              <li><strong>Order Information:</strong> Products purchased, quantities, payment method, and delivery details.</li>
              <li><strong>Communication Data:</strong> Messages sent through our contact form, AI assistant, or WhatsApp.</li>
              <li><strong>Newsletter Data:</strong> Email address when you subscribe to our newsletter.</li>
              <li><strong>Usage Data:</strong> Browser type, device information, pages visited, and time spent on our website.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>Processing and fulfilling your orders</li>
              <li>Communicating order updates and delivery notifications</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Sending promotional offers and newsletters (with your consent)</li>
              <li>Improving our website, products, and services</li>
              <li>Ensuring the security and integrity of our platform</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Data Protection</h2>
            <p>
              We implement industry-standard security measures to protect your personal data, 
              including encryption, secure servers, and access controls. We do not store payment 
              card information on our servers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Data Sharing</h2>
            <p>
              We do not sell, trade, or share your personal information with third parties except:
            </p>
            <ul>
              <li>Delivery partners to fulfill your orders</li>
              <li>Payment processors to handle transactions</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Cookies</h2>
            <p>
              Our website uses localStorage to save your shopping cart and preferences. 
              We use minimal analytics to improve user experience. You can clear your browser 
              data at any time to remove stored information.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Request a copy of your data</li>
              <li>Lodge a complaint with relevant authorities</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Contact Us</h2>
            <p>
              For any privacy-related inquiries, please contact us at:
            </p>
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
