'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSendOutline, IoMailOutline, IoPersonOutline, IoChatbubbleOutline } from 'react-icons/io5';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Get in Touch</span>
          <h2 className={styles.title}>Connect with <span>Purity</span></h2>
          <p className={styles.subtitle}>
            Whether you have a question about our glacial source or want to discuss bulk orders, 
            our concierge team is here to assist you.
          </p>
        </div>

        <div className={styles.content}>
          {/* Info Side */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h3>Direct Support</h3>
              <p>We typically respond to all inquiries within 2 hours during business hours.</p>
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <IoMailOutline />
                  <div>
                    <span>Email Us</span>
                    <strong>info@skarduspring.com</strong>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <IoChatbubbleOutline />
                  <div>
                    <span>WhatsApp</span>
                    <strong>+92 349 2899537</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={styles.formCol}>
            <motion.form 
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <IoPersonOutline className={styles.icon} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputField}>
                  <IoMailOutline className={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputField}>
                <IoSendOutline className={styles.icon} />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject of Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputField}>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`${styles.submitBtn} ${status === 'success' ? styles.success : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 
                 status === 'success' ? 'Message Sent!' : 
                 status === 'error' ? 'Try Again' : 'Send Message'}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
