"use client";
import React, { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent): void => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Split text into individual letters for animation
  const splitText = (text: string, delay: number = 0) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`inline-block animate-letter-reveal`}
        style={{
          animationDelay: `${delay + index * 0.1}s`,
          animationFillMode: 'both',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen overflow-hidden bg-cream-50 text-gray-900 transition-opacity w-full duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          rgba(139, 69, 19, 0.08) 0%, 
          transparent 50%),
          linear-gradient(135deg, #222222 0%, #272727 50%, #000000 100%)
        `,
      }}
    >
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-15 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 69, 19, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 69, 19, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Floating typographic elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large background text */}
        <div 
          className="absolute text-9xl font-black text-black/60 opacity-25 select-none animate-float-slow"
          style={{
            top: '10%',
            right: '-5%',
            transform: `rotate(-15deg) translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
            fontSize: 'clamp(8rem, 20vw, 24rem)',
            lineHeight: '0.8',
          }}
        >
          CODE
        </div>
        
        <div 
          className="absolute text-8xl font-black text-amber-200 opacity-20 select-none animate-float-reverse"
          style={{
            bottom: '10%',
            left: '-5%',
            transform: `rotate(10deg) translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`,
            fontSize: 'clamp(6rem, 15vw, 18rem)',
            lineHeight: '0.8',
          }}
        >
          SECURITY
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Main heading with dramatic typography */}
          <div className="mb-8 sm:mb-12">
            {/* First name - extra large and bold */}
            <h1 
              className="font-black uppercase tracking-tighter leading-none mb-2 sm:mb-4 animate-slide-up"
              style={{
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                background: `linear-gradient(135deg, 
                  #ffffff 0%, 
                  #878787 25%, 
                  #b5b5b5 50%, 
                  #696969 75%, 
                  #5d4037 100%)`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-slide 4s ease-in-out infinite, slide-up 1s ease-out 0.3s both',
                textShadow: '0 0 40px rgba(139, 69, 19, 0.2)',
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              {splitText('JOSHUA', 0.5)}
            </h1>

            {/* Last name - offset and stylized */}
            <h1 
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
                animation: 'gradient-rainbow 6s ease-in-out infinite, slide-up 1s ease-out 0.8s both',
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              {splitText('BIONG', 1.2)}
            </h1>
          </div>

          {/* Professional title with modern layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            {/* Vertical text on larger screens */}
            <div className="hidden lg:block lg:col-span-2">
              <p 
                className="text-gray-200 text-sm uppercase tracking-widest transform rotate-180 origin-center animate-fade-in"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  animationDelay: '1.5s',
                  animationFillMode: 'both',
                }}
              >
                Business Analyst
              </p>
            </div>

            {/* Main description */}
            <div className="lg:col-span-8">
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 animate-slide-up"
                style={{
                  background: 'linear-gradient(90deg, #ffffff, #bababa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animationDelay: '1.8s',
                  animationFillMode: 'both',
                }}
              >
                Transforming Business Through
                <br />
                <span className="font-bold text-amber-700">DevOps Innovation</span>
                <br />
                & <span className="font-bold text-red-600">Cyber Security</span>
              </h2>

              {/* Subtitle */}
              <p 
                className="text-gray-100 text-lg sm:text-xl max-w-2xl leading-relaxed animate-fade-in"
                style={{
                  animationDelay: '2.1s',
                  animationFillMode: 'both',
                }}
              >
                Bridging the gap between technology and strategy with 
                cutting-edge solutions that secure and optimize digital ecosystems.
              </p>
            </div>

            {/* Year indicator */}
            <div className="lg:col-span-2 text-right">
              <div 
                className="text-6xl sm:text-7xl font-black text-amber-200 animate-slide-up"
                style={{
                  animationDelay: '2.4s',
                  animationFillMode: 'both',
                }}
              >
                &lsquo;25
              </div>
            </div>
          </div>

          {/* Call-to-action with modern button design */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <button 
              className="group relative px-8 py-4 bg-white text-black font-bold text-lg tracking-wide uppercase overflow-hidden transition-all duration-500 hover:bg-black hover:text-white border-2 border-white transform hover:scale-105 active:scale-95 animate-fade-in"
              style={{
                animationDelay: '2.7s',
                animationFillMode: 'both',
              }}
            >
              <span className="relative z-10">Explore Portfolio</span>
              <div className="absolute inset-0 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>

            <button 
              className="group px-8 py-4 border border-gray-600 text-gray-300 font-medium text-lg tracking-wide uppercase hover:border-white hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in"
              style={{
                animationDelay: '3s',
                animationFillMode: 'both',
              }}
            >
              Download Resume
            </button>
          </div>

          {/* Scroll indicator with modern design */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow"
            style={{
              animationDelay: '3.3s',
              animationFillMode: 'both',
            }}
          >
            <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-gray-500 to-transparent" />
          </div>
        </div>
      </div>

      {/* Custom CSS for advanced animations */}
      <style jsx>{`
        @keyframes gradient-slide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-rainbow {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes letter-reveal {
          from {
            opacity: 0;
            transform: translateY(50px) rotateX(-90deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
          }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { 
            opacity: 0.5;
            transform: translateY(0px);
          }
          50% { 
            opacity: 1;
            transform: translateY(10px);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out both;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out both;
        }
        
        .animate-letter-reveal {
          animation: letter-reveal 0.8s ease-out both;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        /* Performance optimizations */
        * {
          will-change: transform;
        }
        
        /* Typography responsive optimizations */
        @media (max-width: 640px) {
          .container { padding-left: 1rem; padding-right: 1rem; }
        }
        
        /* Advanced text rendering */
        h1, h2 {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </section>
  );
};

export default Hero;