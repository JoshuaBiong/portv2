// app/about/page.tsx
'use client';

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";
import Head from 'next/head';
import Link from 'next/link';

// Define types for resume data
type EmploymentItem = {
  id: number;
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
};

type SkillCategory = {
  category: string;
  skills: string[];
};

const AboutPage: React.FC = () => {
  // --- Resume Data ---
  const name: string = "Joshua P. Biong"; // Corrected name
  const title: string = "Web Developer / Aspiring Mobile & Data Engineer";
  const location: string = "Philippines";
  const phone: string = "+63 997 208 8423";
  const email: string = "joshuabiong7@gmail.com";
  const linkedin: string = "linkedin.com/in/joshuabiongdotdev/";

  const employmentHistory: EmploymentItem[] = [
    {
      id: 1,
      title: "Front-End Developer",
      company: "DevignLabs",
      period: "June 2025 — Present",
      responsibilities: [
        "Developed and maintained responsive, user-centric web interfaces using Vue.js (flexible for React.js), Tailwind CSS, and JavaScript/TypeScript.",
        "Collaborated with backend developers to integrate APIs and ensure data accuracy.",
        "Translated high-fidelity mockups and design systems into accessible frontends.",
        "Participated in agile sprints, code reviews, and daily standups.",
        "Optimized performance for all devices and browsers with accessibility in mind (WCAG).",
        "Built reusable components with scalability and maintainability in mind.",
        "Used Git, Figma, Postman, and browser dev tools for development and debugging."
      ]
    },
    {
      id: 2,
      title: "Fullstack Laravel Developer",
      company: "R Web Solutions",
      period: "Dec 2024 — June 2025",
      responsibilities: [
        "Addressed and fixed bugs.",
        "Initiated creation of templates for repetitive tasks.",
        "Implemented and updated application modules under senior developer direction.",
        "Introduced a new approach on developing a website using a different framework.",
        "Worked independently while collaborating with the team.",
        "Tested and debugged websites and software.",
        "Wrote clean and readable code.",
        "Ensured the website is fully responsive on all screen types.",
        "Ensured the website is SEO-friendly."
      ]
    },
    {
      id: 3,
      title: "Web Development 101 Tutor (Part-time)",
      company: "For Career Shifters Learning Web Development",
      period: "Feb 2022 — Present",
      responsibilities: [
        "Developed curriculum for beginner web development students.",
        "Taught internet fundamentals and front-end/back-end differences.",
        "Instructed HTML, CSS, and JavaScript basics.",
        "Guided students in building their first website portfolios.",
        "Introduced media queries and responsive design principles."
      ]
    },
    {
      id: 4,
      title: "Assistant Project Manager (APM)",
      company: "Psalms 91 Construction",
      period: "Nov 2023 — Nov 2024",
      responsibilities: [
        "Coordinated with site engineers for material procurement and deliveries.",
        "Managed logs for change orders, materials, and labor costs.",
        "Maintained documentation for permits, drawings, and contracts.",
        "Tracked expenses and digital project records.",
        "Facilitated communication across stakeholders and teams.",
        "Prepared daily progress reports and milestone summaries."
      ]
    },
    {
      id: 5,
      title: "Account Associate",
      company: "VXI",
      period: "Apr 2023 — Oct 2023",
      responsibilities: [
        "Assisted clients with technical issues related to Microsoft services.",
        "Troubleshot hardware/software problems and provided customer feedback.",
        "Walked customers through issue resolution steps.",
        "Handled customer communications via email, chat, and calls.",
        "Recorded transactions and maintained accurate support logs."
      ]
    },
    {
      id: 6,
      title: "Data Entry (Part-time / Full-time)",
      company: "Psalms 91 Construction",
      period: "Jul 2022 — Mar 2023",
      responsibilities: [
        "Ensured data accuracy and integrity by collecting quality checks.",
        "Encoded POs, customer demands, and internal records into the system.",
        "Contributed data for inventory, labor, deliveries, and expenses.",
        "Maintained permits, licenses, drawings, and archives for compliance."
      ]
    }
  ];

  const education: { degree: string; institution: string; location: string } = {
    degree: "Bachelor of Science in Information Technology",
    institution: "Interface Computer College, Inc.",
    location: "Davao City, Philippines"
  };

  const skills: SkillCategory[] = [
    {
      category: "Frameworks & Libraries",
      skills: ["Laravel", "Basic React", "Basic Vue", "InertisJS", "Basic React Native", "Basic Flutter"]
    },
    {
      category: "Databases",
      skills: ["MySql", "Firebase", "Supabase", "MongoDB"]
    },
    {
      category: "Styling & Tools",
      skills: ["TailwindCss", "Intermediate Figma", "ShadCN UI"]
    },
    {
      category: "Other Technologies",
      skills: ["Cpanel", "Javascript", "Dart"]
    },
    {
      category: "Concepts",
      skills: ["Understand how AI works"]
    }
  ];

  // --- State for Tooltip and Mobile Expansion ---
  const [hover, setHover] = useState<{
    visible: boolean;
    x: number;
    y: number;
    item: EmploymentItem | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle mouse move for tooltip (desktop only)
  const handleMove = (e: MouseEvent<HTMLDivElement>, item: EmploymentItem) => {
    if (isMobile || !sectionRef.current) return; // Disable tooltip on mobile or if ref is null
    const rect = sectionRef.current.getBoundingClientRect();
    setHover({
      visible: true,
      x: e.clientX - rect.left + 18, // Offset relative to section
      y: e.clientY - rect.top + 18,  // Offset relative to section
      item,
    });
  };

  // Handle mouse leave for tooltip
  const handleLeave = () => {
    if (isMobile) return;
    setHover((prev) => ({ ...prev, visible: false, item: null }));
  };

  // Toggle expanded state for mobile
  const toggleExpand = (id: number) => {
    if (isMobile) {
      setExpandedItemId(prevId => prevId === id ? null : id);
    }
  };

  // Close tooltip if it becomes mobile after resize
  useEffect(() => {
    if (isMobile) {
      setHover({ visible: false, x: 0, y: 0, item: null });
    }
  }, [isMobile]);

  // --- Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  // Micro-interaction variants
  const backgroundElementVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0], // Add slight horizontal movement
      transition: {
        duration: 20, // Slower animation
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const contactLinkVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const jobItemVariants = {
    rest: { scale: 1, backgroundColor: "rgba(31, 41, 55, 0.2)" }, // bg-gray-800/20
    hover: { 
      scale: 1.02, 
      backgroundColor: "rgba(31, 41, 55, 0.3)", // Slightly darker on hover
      transition: { duration: 0.2 } 
    }
  };

  const cardVariants = {
    rest: { y: 0 },
    hover: { y: -5, transition: { duration: 0.3 } }
  };

  return (
    <>
      <Head>
        <title>About {name}</title>
        <meta name="description" content={`${title} - ${name}`} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <section
        ref={sectionRef}
        className="w-full min-h-screen relative py-10 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans" // Changed overflow to hidden
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(52, 152, 219, 0.05) 0%, transparent 20%),
            linear-gradient(135deg, #222222 0%, #272727 50%, #000000 100%)
          `,
        }}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-900/5 blur-3xl -z-10"
          variants={backgroundElementVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-blue-900/5 blur-3xl -z-10"
          variants={backgroundElementVariants}
          animate="animate"
          style={{ animationDelay: '2s' }} // Stagger the animation
        />

        <div className="max-w-screen-xl mx-auto relative z-10"> {/* Added relative z-10 to content */}
          {/* Header Section */}
          <motion.div
            className="mb-10 sm:mb-14 md:mb-16 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="font-black uppercase tracking-wider leading-none mb-3"
              style={{
                fontSize: "clamp(1.8rem, 8vw, 5rem)", // Slightly smaller max size
                fontFamily: 'Space Grotesk, sans-serif',
                background:
                  "linear-gradient(45deg, #e74c3c, #f39c12, #e67e22, #d35400, #c0392b)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-rainbow 8s ease infinite",
              }}
            >
              {name}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium px-2" // Added px for small screens
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {title}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 md:gap-x-6 gap-y-2 text-xs sm:text-sm md:text-base text-gray-400 font-light px-2" // Smaller gaps and text, added px
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-1.5 text-gray-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{location}</span>
              </span>
              {/* Contact Links with Micro-Animations */}
              <motion.div
                variants={contactLinkVariants}
                initial="rest"
                whileHover="hover"
                className="flex items-center"
              >
                <Link href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center hover:text-amber-300 transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-1.5 text-gray-500 group-hover:text-amber-400 flex-shrink-0 transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>{phone}</span>
                </Link>
              </motion.div>
              <motion.div
                variants={contactLinkVariants}
                initial="rest"
                whileHover="hover"
                className="flex items-center"
              >
                <Link href={`mailto:${email}`} className="flex items-center hover:text-amber-300 transition-colors group truncate max-w-[120px] sm:max-w-none"> {/* Truncate email on small screens */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-1.5 text-gray-500 group-hover:text-amber-400 flex-shrink-0 transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{email}</span>
                </Link>
              </motion.div>
              <motion.div
                variants={contactLinkVariants}
                initial="rest"
                whileHover="hover"
                className="flex items-center"
              >
                <Link href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-amber-300 transition-colors group truncate max-w-[120px] sm:max-w-none"> {/* Truncate LinkedIn on small screens */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-1.5 text-gray-500 group-hover:text-amber-400 flex-shrink-0 transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>{linkedin}</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Employment History Heading with Interactive Animation */}
          <motion.div 
            className="mb-6 sm:mb-8 md:mb-10 overflow-hidden"
            whileHover={{}} // Required for triggering child animations on hover
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-black uppercase tracking-wider leading-none text-center relative inline-block" // Added relative inline-block
              style={{
                fontSize: "clamp(1.5rem, 6vw, 3.5rem)", // Adjusted max size
                fontFamily: 'Space Grotesk, sans-serif',
                background:
                  "linear-gradient(45deg, #3498db, #2ecc71, #1abc9c, #9b59b6)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-rainbow 8s ease infinite",
              }}
            >
              My Journey
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-500 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1, backgroundColor: "#3498db" }} // Change color on hover
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.h2>
          </motion.div>

          {/* Employment History List */}
          <motion.div
            className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 relative z-10 mb-12 sm:mb-14 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {employmentHistory.map((item) => (
              <motion.div
                key={item.id}
                onMouseMove={(e) => handleMove(e, item)}
                onMouseLeave={handleLeave}
                onClick={() => toggleExpand(item.id)}
                // Apply micro-interaction variants for desktop
                {...(!isMobile ? { variants: jobItemVariants, initial: "rest", whileHover: "hover" } : {})}
                className={`relative flex flex-col p-4 sm:p-5 md:p-6 rounded-lg overflow-visible cursor-pointer transition-all duration-300 ${
                  expandedItemId === item.id
                    ? 'bg-gray-800/50 border border-amber-500/30'
                    : 'bg-gray-800/20 border border-gray-700 hover:border-amber-500/30'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                // Make focusable and accessible on mobile
                tabIndex={isMobile ? 0 : -1}
                role={isMobile ? "button" : undefined}
                aria-expanded={isMobile ? (expandedItemId === item.id) : undefined}
                aria-label={isMobile ? `${item.title} at ${item.company}, ${item.period}. Click to view details.` : undefined}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold italic shrink-0 text-amber-400 mt-0.5">
                    {String(item.id).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0"> {/* min-w-0 is crucial for truncation */}
                    <h3 className="text-base sm:text-lg md:text-xl font-medium leading-tight text-white truncate pr-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate">{item.company} • {item.period}</p>
                    {/* Mobile Responsibilities List (Expandable) */}
                    {isMobile && expandedItemId === item.id && (
                      <motion.ul
                        className="mt-3 sm:mt-4 pl-3 space-y-1.5 text-gray-300 text-xs border-l-2 border-amber-500/30"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {item.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 mt-1 text-amber-500 flex-shrink-0">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                  {/* Expand/Collapse Icon for Mobile with Pulse Animation */}
                  {isMobile && (
                    <div className="flex-shrink-0 flex items-center justify-center pt-1">
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-300 ${expandedItemId === item.id ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        // Add pulse animation when item is not expanded to draw attention
                        animate={expandedItemId !== item.id ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </motion.svg>
                    </div>
                  )}
                </div>
                {/* underline animation (Desktop hover effect) - Hidden on mobile */}
                {/* Enhanced underline animation */}
                {!isMobile && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3498db] origin-left rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Education & Skills Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-10 sm:mt-12 md:mt-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Education */}
            <motion.div 
              variants={itemVariants} 
              className="bg-gray-800/20 p-4 sm:p-5 md:p-6 rounded-lg border border-gray-700"
              // Add hover effect to card
              initial="rest"
              whileHover="hover"
              transition={{ type: "tween" }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-5 pb-1 border-b border-gray-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Education
              </h3>
              <div className="pl-1 sm:pl-2">
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>{education.degree}</h4>
                <p className="text-gray-400 mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>{education.institution}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{education.location}</p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div 
              variants={itemVariants} 
              className="bg-gray-800/20 p-4 sm:p-5 md:p-6 rounded-lg border border-gray-700"
              // Add hover effect to card
              initial="rest"
              whileHover="hover"

              transition={{ type: "tween" }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-5 pb-1 border-b border-gray-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Skills
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {skills.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-300 mb-1.5 sm:mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{category.category}</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {category.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-gray-800/50 text-gray-200 text-[10px] sm:text-xs rounded-full border border-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Tooltip Card (Desktop Only) - Enhanced Entrance */}
        {!isMobile && hover.visible && hover.item && (
          <motion.div
            className="absolute z-50 pointer-events-none bg-black/70 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-3 sm:p-4 text-white max-w-[80vw] sm:max-w-xs text-xs" // Absolute positioning within sectionRef
            style={{
              left: hover.x,
              top: hover.y,
              transform: 'translate(-50%, calc(-100% - 10px))', // Center horizontally, position above
            }}
            initial={{ opacity: 0, scale: 0.85 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ 
              type: "spring", 
              stiffness: 350, // Slightly stiffer
              damping: 25  // Slightly more damping
            }}
          >
            <p className="text-[10px] uppercase tracking-wide text-white/70 mb-1">
              {String(hover.item.id).padStart(2, '0')}
            </p>
            <h3 className="font-bold text-amber-300 mb-1 text-sm">{hover.item.title}</h3>
            <p className="text-[10px] text-gray-300 mb-2">{hover.item.company} • {hover.item.period}</p>
            <ul className="mt-2 space-y-1">
              {hover.item.responsibilities.slice(0, 3).map((resp, index) => (
                <li key={index} className="text-[10px] text-white/90 flex">
                  <span className="mr-1.5 text-amber-500 flex-shrink-0">•</span>
                  <span>{resp}</span>
                </li>
              ))}
              {hover.item.responsibilities.length > 3 && (
                <li className="text-[10px] text-white/70 italic">+{hover.item.responsibilities.length - 3} more...</li>
              )}
            </ul>
          </motion.div>
        )}

        {/* Keyframes for heading gradient */}
        <style jsx global>{`
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
    </>
  );
};

export default AboutPage;