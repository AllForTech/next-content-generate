import { Hero } from '@/components/Landing/Hero';
import { Features } from '@/components/Landing/Features';
import { Services } from '@/components/Landing/Services';
import { About } from '@/components/Landing/About';
import { Footer } from '@/components/Landing/Footer';
import { Navbar } from '@/components/Landing/Navbar';

export default function LandingPage() {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <About />
      <Footer />
    </div>
  );
}