'use client';

import { motion } from 'framer-motion';
import { Zap, BrainCircuit, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-12 w-12 text-black" />,
    title: 'Real-time Generation',
    description: 'Generate content in real-time with our powerful AI engine.',
  },
  {
    icon: <BrainCircuit className="h-12 w-12 text-black" />,
    title: 'Fact-Grounded AI',
    description: 'Our AI is grounded in real-time, verifiable facts to eliminate hallucinations.',
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-black" />,
    title: 'Secure & Reliable',
    description: 'Your data is safe with our secure and reliable platform.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-black"
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-stone-200 to-stone-100/90 p-8 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-black">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
