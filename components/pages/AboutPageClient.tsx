"use client";
import { motion } from "framer-motion";




const AboutPageClient = () => {
  return (
    <section className="bg-black h-screen ">
      {/* Heading */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.h1
        className="text-5xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        About Me
      </motion.h1>

      {/* Subheading */}
      <motion.h2
        className="text-xl text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Business Analyst | DevOps | Cybersecurity Enthusiast
      </motion.h2>

      {/* Content */}
      <motion.p
        className="text-gray-100 leading-relaxed mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Hi! I’m <strong>Joshua Biong</strong>, a business analyst with a passion for transforming
        complex data into actionable strategies. My background in DevOps and cybersecurity gives me
        a unique perspective in delivering secure and efficient business solutions.
      </motion.p>

      <motion.p
        className="text-gray-100 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        I love working on projects that drive change, improve processes, and make a real impact.
        Let’s connect and explore how I can help your business achieve its goals!
      </motion.p>

      {/* Call to Action */}
      <motion.a
        href="/contact"
        className="inline-block mt-8 px-6 py-3 bg-white/90 text-black font-medium rounded-lg shadow hover:bg-blue-700 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Me
      </motion.a>
      </div>
    </section>
  );
};

export default AboutPageClient;
