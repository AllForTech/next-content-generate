'use client';

import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          About Us
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-gray-400">
            We are a team of passionate developers and AI enthusiasts dedicated to building the next generation of content creation tools. Our mission is to empower creators with the power of AI to produce high-quality content faster and more efficiently.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
