'use client';

import { motion } from 'framer-motion';
import { PenTool, Code, Search } from 'lucide-react';

const services = [
  {
    icon: <PenTool className="h-12 w-12 text-white" />,
    title: 'Content Creation',
    description: 'Generate high-quality articles, blog posts, and more with our AI.',
  },
  {
    icon: <Code className="h-12 w-12 text-white" />,
    title: 'Code Generation',
    description: 'Generate code snippets in various programming languages.',
  },
  {
    icon: <Search className="h-12 w-12 text-white" />,
    title: 'AI-Powered Research',
    description: 'Conduct research on any topic with our AI-powered search.',
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-black p-8 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
