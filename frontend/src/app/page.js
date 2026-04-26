import Hero from '@/components/home/Hero';
import dynamic from 'next/dynamic';

const BrandStory = dynamic(() => import('@/components/home/BrandStory'), { ssr: true });
const ProductShowcase = dynamic(() => import('@/components/home/ProductShowcase'), { ssr: true });
const FiltrationProcess = dynamic(() => import('@/components/home/FiltrationProcess'), { ssr: true });
const PurityScience = dynamic(() => import('@/components/home/PurityScience'), { ssr: true });
const Certifications = dynamic(() => import('@/components/home/Certifications'), { ssr: true });
const StatsCounter = dynamic(() => import('@/components/home/StatsCounter'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), { ssr: true });
const FAQ = dynamic(() => import('@/components/home/FAQ'), { ssr: true });
const ContactForm = dynamic(() => import('@/components/home/ContactForm'), { ssr: true });
const CTASection = dynamic(() => import('@/components/home/CTASection'), { ssr: true });

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <ProductShowcase />
      <FiltrationProcess />
      <PurityScience />
      <Certifications />
      <StatsCounter />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <CTASection />
    </>
  );
}
