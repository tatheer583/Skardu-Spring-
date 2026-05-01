'use client';

import { useState, useEffect } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    id: 'source',
    question: "Where is the source of Skardu Spring water?",
    answer: "Our water is sourced directly from a protected deep-seated spring in the heart of the Karakoram glaciers in Skardu, at an altitude of over 2,500 meters. This ensures the water remains untouched by environmental pollutants."
  },
  {
    id: 'purification',
    question: "How is the water purified and filtered?",
    answer: "Skardu Spring undergoes a 10,000-year natural filtration journey through mineral-rich volcanic rock. We supplement this with a gentle 7-stage lab-controlled process, including UV treatment and micron filtration, to ensure 100% safety without stripping away natural minerals."
  },
  {
    id: 'certifications',
    question: "Is Skardu Spring certified for safety?",
    answer: "Yes, we fully comply with WHO guidelines and are certified by the GB Food Authority. Our facilities are ISO 9001:2015 certified, and every batch is tested by independent laboratories to ensure zero contaminants."
  },
  {
    id: 'minerals',
    question: "What are the key minerals found in the water?",
    answer: "Our water is naturally rich in essential minerals, including Calcium (for bone health), Magnesium (for energy), and Potassium (for heart health). It maintains a perfectly balanced pH level of 7.4–7.8, making it naturally alkaline."
  },
  {
    id: 'delivery',
    question: "Where do you deliver within Pakistan?",
    answer: "We currently provide direct home and office delivery in Islamabad, Rawalpindi, Lahore, and Karachi. We are rapidly expanding to other major cities; please check our delivery map for the latest updates in your area."
  },
  {
    id: 'packaging',
    question: "What packaging sizes are available for purchase?",
    answer: "We offer a range of premium packaging including 500ml, 1.5L, and 5L bottles for personal use, as well as our 19-liter family/office jars. All our bottles are designed for easy handling and freshness preservation."
  },
  {
    id: 'environment',
    question: "Is your packaging environmentally friendly?",
    answer: "Sustainability is core to our brand. Our bottles are 100% recyclable and BPA-free. We also run a 'Bottle Return' program for our 19-liter jars to minimize plastic waste and reduce our carbon footprint."
  },
  {
    id: 'storage',
    question: "How should I store Skardu Spring water?",
    answer: "To maintain the pristine taste, store the bottles in a cool, dry place away from direct sunlight and strong-smelling chemicals. Once opened, it is best consumed within 3 to 5 days."
  },
  {
    id: 'subscription',
    question: "Do you offer subscription plans for regular delivery?",
    answer: "Yes, we offer flexible weekly and monthly subscription plans for both homes and offices. Subscribing ensures you never run out of pure water and provides a 10-15% discount compared to one-time orders."
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsMounted(true));
  }, []);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Common Questions</span>
          <h2 className={styles.title}>Everything you need to <span>know</span></h2>
        </div>

        <div className={styles.accordion}>
          {isMounted && faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`${styles.item} ${activeId === faq.id ? styles.itemActive : ''}`}
            >
              <button 
                className={styles.question} 
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={activeId === faq.id}
              >
                <h3>{faq.question}</h3>
                <div className={styles.icon}></div>
              </button>
              <div className={styles.answer}>
                <div className={styles.answerInner}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
