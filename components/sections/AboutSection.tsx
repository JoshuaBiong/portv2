"use client";
import React from 'react'
import {motion} from 'framer-motion';


const AboutSection = () => {
  return (
    <>
    <section className='w-full h-screen relative'>
      <div className="container max-w-screen-lg mx-auto">
         <motion.div className="my-12 overflow-hidden">
            {/* First name - extra large and bold */}
          

            {/* Last name - offset and stylized */}
            <motion.h1 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="font-black uppercase tracking-wider leading-none animate-slide-up"
              style={{
                fontSize: 'clamp(2.5rem, 10vw, 10rem)',
                marginLeft: 'clamp(2rem, 8vw, 8rem)',
                background: `linear-gradient(45deg, 
                  #e74c3c, 
                  #f39c12, 
                  #e67e22, 
                  #d35400, 
                  #c0392b)`,
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-rainbow',
                // transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              What I do
            </motion.h1>
          </motion.div>
      </div>
    </section>
        </>
  )
}

export default AboutSection