import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';
import { FaWhatsapp } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Assistant = dynamic(() => import('@/components/layout/Assistant'));

export const metadata = {
  title: 'Skardu Spring | Premium Natural Mineral Water from Karakoram',
  description: 'Born from the pristine glaciers of Skardu, Pakistan. Skardu Spring delivers nature\'s purest mineral water — naturally filtered through ancient Karakoram rock for over 10,000 years.',
  keywords: 'skardu spring, mineral water, glacier water, karakoram water, pakistan water brand, premium water, natural spring water',
  openGraph: {
    title: 'Skardu Spring | Premium Natural Mineral Water',
    description: 'Pure mountain water from the Karakoram glaciers. Naturally filtered for 10,000 years.',
    type: 'website',
  },
};

import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/shop/CartDrawer';
import ToastContainer from '@/components/shop/Toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Skardu Spring",
              "url": "https://skarduspring.com",
              "logo": "https://skarduspring.com/images/logo.png",
              "description": "Premium glacial mineral water from the Karakoram mountains. Naturally filtered for 10,000 years.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+923492899537",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://facebook.com/skarduspring",
                "https://instagram.com/skarduspring"
              ]
            }
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Assistant />
          <CartDrawer />
          <ToastContainer />
          <a 
            href="https://wa.me/923492899537" 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Contact us on WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
