'use client';

import { motion } from 'framer-motion';
import { PenTool, Code, Search, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: <PenTool className="h-6 w-6 text-indigo-500 group-hover:text-white transition-colors duration-300" />,
    title: 'Precision Content Creation',
    description: 'Generate comprehensive articles, engaging blog posts, and marketing copy with specialized AI models.',
  },
  {
    icon: <Code className="h-6 w-6 text-indigo-500 group-hover:text-white transition-colors duration-300" />,
    title: 'Multi-Language Code Generation',
    description: 'Instantly generate, refactor, and explain complex code snippets in multiple programming languages.',
  },
  {
    icon: <Search className="h-6 w-6 text-indigo-500 group-hover:text-white transition-colors duration-300" />,
    title: 'Fact-Grounded Research Engine',
    description: 'Access real-time, verifiable data and academic sources to anchor your content in current facts.',
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
    transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.6 }
  },
};

export const Services = () => {

  return (
    // Section background is light gray to make the white cards pop
    <section id="services" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4 max-w-7xl">

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
          className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-gray-900 leading-tight"
        >
          Tools Designed to Conquer
        </motion.h2>

        {/* Card Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4.5" // Removed gap, added borders
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative bg-white p-10 
                          border-r border-l border-gray-200 md:border-l-0 shadow-stone-300
                          shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl ease-in-out cursor-pointer 
                          ${index === 2 ? 'md:border-r' : ''} 
                          ${index === 0 ? 'md:border-l' : ''}`} // Borders to make them feel like panels
            >
              {/* Black Layer for Hover Effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="relative z-10 text-left">

                {/* Top Row: Icon and Arrow */}
                <div className="flex justify-between items-center mb-10">
                  <div className="p-3 rounded-full bg-gray-100 group-hover:bg-indigo-500 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title and Description */}
                <h3 className="text-3xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};