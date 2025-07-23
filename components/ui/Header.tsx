"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Project", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <header className="fixed top-0 right-0 z-50 m-3 sm:m-5">
      <div className="relative">
        {/* Toggle button */}
     <button
  onClick={toggleExpanded}
  className={`h-10 w-20 cursor-pointer rounded text-white font-bold z-50 transition-all duration-300 ${
    expanded ? "border-transparent" : "border border-white"
  }`}
>
  {expanded ? "Close" : "Menu"}
</button>


        {/* Animated Expanded menu */}
   <AnimatePresence>
  {expanded && (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="absolute top-0 right-0 -z-40 origin-top-right rounded-xl overflow-hidden bg-gradient-to-br from-cyan-200/10 to-blue-300/10 backdrop-blur-xl border border-cyan-200/20 shadow-2xl"
    >
      <motion.nav
        className="flex flex-col p-6 space-y-4 w-[240px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
          hidden: {},
        }}
      >
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            className="group transition duration-500 rounded"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.33, 1, 0.68, 1], // smooth water-like ease
                },
              },
            }}
          >
            <Link
              href={link.href}
              onClick={() => setExpanded(false)}
              className="block text-2xl sm:text-3xl md:text-4xl text-white/90 group-hover:text-cyan-100 px-2 py-1"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        {/* Social Links */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-6 text-center text-sm sm:text-base"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.8 },
            },
          }}
        >
          <a href="#" className="text-white/80 hover:text-cyan-100">
            Website
          </a>
          <a href="#" className="text-white/80 hover:text-cyan-100">
            YouTube
          </a>
          <a href="#" className="text-white/80 hover:text-cyan-100">
            Facebook
          </a>
        </motion.div>
      </motion.nav>
    </motion.div>
  )}
</AnimatePresence>


      </div>
    </header>
  );
};

export default Header;
