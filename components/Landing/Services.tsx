'use client';

import { motion } from 'framer-motion';
import { PenTool, Code, Search, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: (
      <PenTool className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
    ),
    title: 'Precision Content Creation',
    description:
      'Generate comprehensive articles, engaging blog posts, and marketing copy with specialized AI models.',
  },
  {
    icon: (
      <Code className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
    ),
    title: 'Multi-Language Code Generation',
    description:
      'Instantly generate, refactor, and explain complex code snippets in multiple programming languages.',
  },
  {
    icon: (
      <Search className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
    ),
    title: 'Fact-Grounded Research Engine',
    description:
      'Access real-time, verifiable data and academic sources to anchor your content in current facts.',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12, duration: 0.6 },
  },
};

export const Services = () => {
  return (
    // Section background is light gray to make the white cards pop
    <section id="services" className="relative bg-transparent py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Kicker and Main Headline */}
        {/*<motion.p*/}
        {/*  initial={{ opacity: 0, y: -20 }}*/}
        {/*  whileInView={{ opacity: 1, y: 0 }}*/}
        {/*  transition={{ duration: 0.5 }}*/}
        {/*  viewport={{ once: true }}*/}
        {/*  className="text-sm font-semibold text-center text-gray-500 uppercase tracking-widest mb-2"*/}
        {/*>*/}
        {/*  The Full Suite*/}
        {/*</motion.p>*/}

        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-5xl leading-tight font-extrabold text-gray-900 md:text-6xl"
        >
          Tools Designed to Conquer
        </motion.h2>

        {/* Card Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-4.5 md:grid-cols-3" // Removed gap, added borders
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative cursor-pointer rounded-2xl border-r border-l border-gray-200 bg-white p-10 shadow-lg shadow-stone-300 transition-all duration-300 ease-in-out hover:shadow-xl md:border-l-0 ${index === 2 ? 'md:border-r' : ''} ${index === 0 ? 'md:border-l' : ''}`} // Borders to make them feel like panels
            >
              {/* Black Layer for Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="relative z-10 text-left">
                {/* Top Row: Icon and Arrow */}
                <div className="mb-10 flex items-center justify-between">
                  <div className="rounded-full bg-gray-100 p-3 transition-colors duration-300 group-hover:bg-indigo-500">
                    {service.icon}
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Title and Description */}
                <h3 className="mb-3 text-3xl font-bold text-black transition-colors duration-300 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
