'use client';

import { motion } from 'framer-motion';
import { Zap, BrainCircuit, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-10 w-10 text-indigo-600" />,
    title: 'Real-time Generation',
    description: 'Generate high-quality content in real-time, instantly responding to your input and context.',
  },
  {
    icon: <Cpu className="h-10 w-10 text-indigo-600" />,
    title: 'Fact-Grounded AI',
    description: 'Our AI is grounded in real-time, verifiable facts from the web to eliminate hallucinations.',
  }
  ,
  {
    icon: <ShieldCheck className="h-10 w-10 text-indigo-600" />,
    title: 'Secure & Reliable',
    description: 'Your projects and data are always safe and securely stored on our reliable platform.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger the appearance of the cards
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

export const Features = () => {
  return (
    // Added a subtle gradient background to enhance the glass effect on cards
    <section id="features" className="py-24 bg-black/5 backdrop-blur-md">
      <div className="container bg-transparent mx-auto px-4">

        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900"
        >
          Unmatched Performance, Unmatched Quality
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/70 p-8 rounded-2xl text-center backdrop-blur-md border border-gray-100 shadow-xl transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Icon Container with subtle ring */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-indigo-50 ring-4 ring-indigo-100">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};