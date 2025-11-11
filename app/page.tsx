import { Hero } from '@/components/Landing/Hero';
import { Features } from '@/components/Landing/Features';
import { Services } from '@/components/Landing/Services';
import { About } from '@/components/Landing/About';
import { Footer } from '@/components/Landing/Footer';

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Features />
      <Services />
      <About />
      <Footer />
    </div>
  );
}