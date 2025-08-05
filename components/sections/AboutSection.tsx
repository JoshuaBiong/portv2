"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

type Item = {
  number: string;
  title: string;
  description: string;
};

const contentItems: Item[] = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Creating fast, responsive, accessible websites using modern stacks.",
  },
  {
    number: "02",
    title: "Full-Stack Applications",
    description:
      "End-to-end apps with React/Next.js, Node.js/Laravel, PostgreSQL/MongoDB.",
  },
  {
    number: "03",
    title: "UX / UI Design",
    description:
      "Designing clean, usable interfaces that users actually enjoy.",
  },
  {
    number: "04",
    title: "API Integration",
    description:
      "Robust REST/GraphQL integrations, auth flows, and 3rd-party services.",
  },
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [hover, setHover] = useState<{
    visible: boolean;
    x: number;
    y: number;
    item: Item | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>, item: Item) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setHover({
      visible: true,
      x: e.clientX - rect.left + 18, // offset so it doesn't sit under the cursor
      y: e.clientY - rect.top + 18,
      item,
    });
  };

  const handleLeave = () =>
    setHover((prev) => ({ ...prev, visible: false, item: null }));

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen relative py-24 px-4 sm:px-6 lg:px-8 overflow-visible "
      style={{
        background: `
          radial-gradient(circle at 50% 50%, rgba(139, 69, 19, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #222222 0%, #272727 50%, #000000 100%)
        `,
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <motion.div className="mb-16 overflow-hidden">
          <motion.h1
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-black uppercase tracking-wider leading-none text-center bg-blue-600"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 10rem)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-rainbow 8s ease infinite",
            }}
          >
            What I Do
          </motion.h1>
        </motion.div>

        {/* List */}
        <div className="flex flex-col  relative z-10">
          {contentItems.map((item) => (
            <div
              key={item.number}
              onMouseMove={(e) => handleMove(e, item)}
              onMouseLeave={handleLeave}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-white transition-colors duration-300  hover:bg-blue-600 p-6 overflow-visible"
            >
              <span className="text-4xl sm:text-5xl font-bold italic shrink-0">
                {item.number}
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug italic">
                {item.title}
              </h2>

              {/* underline animation */}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating card (can overflow outside the hovered div, still follows it) */}
      {hover.visible && hover.item && (
        <motion.div
          className="absolute z-50 pointer-events-none bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-4 text-white max-w-xs"
          style={{ left: hover.x, top: hover.y, translateX: "-50%", translateY: "-120%" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          <p className="text-sm uppercase tracking-wide text-white/80 mb-1">
            {hover.item.number}
          </p>
          <h3 className="font-semibold mb-1">{hover.item.title}</h3>
          <p className="text-sm text-black/90leading-relaxed">
            {hover.item.description}
          </p>
        </motion.div>
      )}

      {/* keyframes for heading gradient */}
      <style jsx>{`
        @keyframes gradient-rainbow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
