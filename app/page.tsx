import { Hero } from '@/components/Landing/Hero';
import { Features } from '@/components/Landing/Features';
import { Services } from '@/components/Landing/Services';
import { About } from '@/components/Landing/About';
import { Footer } from '@/components/Landing/Footer';
import { Navbar } from '@/components/Landing/Navbar';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Title that appears in the browser tab
  title: 'AI Content Generator | Two-Step Quality Pipeline',

  // Description used by search engines (Google, Bing)
  description: 'Generate high-quality, grounded, and SEO-optimized content using our two-step AI refinement and generation process.',

  // Open Graph (OG) tags for social media sharing
  openGraph: {
    title: 'AI Content Generator - Refinement First',
    description: 'The best way to generate content: refine your prompt for quality before generating the final article.',
    url: '',
    siteName: 'Content Pipeline MVP',
    images: [
      {
        url: '/asset/hero_image.png', // A custom image for sharing
        width: 1200,
        height: 630,
        alt: 'AI Content Generator App Screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter card details (important for X/Twitter shares)
  twitter: {
    card: 'summary_large_image',
    title: 'AI Content Generator | Two-Step Pipeline',
    description: 'Stop generating low-quality content. Our process guarantees high-quality, grounded output.',
    creator: '@YourTwitterHandle',
    images: ['https://yourwebsite.com/og-image-generator.png'],
  },

  // Canonical URL (optional but recommended for SEO)
  alternates: {
    canonical: 'https://allfortech.org',
  },
};


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