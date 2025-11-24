import { Hero } from '@/components/Landing/Hero';
import { Features } from '@/components/Landing/Features';
import { Services } from '@/components/Landing/Services';
import { About } from '@/components/Landing/About';
import { Footer } from '@/components/Landing/Footer';
import { Navbar } from '@/components/Landing/Navbar';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <>
      <div className={cn('!fixed top-0 inset-0 screen center bg-gradient-to-br from-white via-purple-400/28  to-white -z-4')}/>
      <div className="w-full text-black backdrop-blur-2xl bg-transparent overflow-hidden" id={'hide-scrollbar'}>
        <Navbar />
        <Hero />
        <Features />
        <Services />
        <About />
        <Footer />
      </div>
    </>
  );
}