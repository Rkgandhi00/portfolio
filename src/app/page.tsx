// src/app/page.tsx
"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import './cosmic-styles.css';

export default function Home() {
  const { theme } = useTheme();
  // Initialize with null to avoid hydration mismatch, then update after mount
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
  
  // Update theme state after component mounts on client side
  useEffect(() => {
    setIsDarkTheme(theme === 'dark');
  }, [theme]);

  // State for typed text animation
  const [typedName, setTypedName] = useState("");
  const [isNameTyped, setIsNameTyped] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showRoles, setShowRoles] = useState(false);
  const nameToType = "Rushabh";
  
  // Roles to display one by one
  const roles = [
    "Full Stack Developer",
    "Data Engineer",
    "AI/ML Specialist",
    "Cloud Architect",
    "DevOps Engineer"
  ];
  
  // References for canvas elements
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Type name letter by letter
  useEffect(() => {
    if (typedName.length < nameToType.length) {
      const timeout = setTimeout(() => {
        setTypedName(nameToType.substring(0, typedName.length + 1));
      }, 200); // Speed of typing
      
      return () => clearTimeout(timeout);
    } else if (!isNameTyped) {
      setIsNameTyped(true);
      
      // Start showing roles after name is typed
      setTimeout(() => {
        setShowRoles(true);
      }, 500);
    }
  }, [typedName, isNameTyped]);
  
  // Handle role cycling
  useEffect(() => {
    if (!showRoles) return;
    
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 4000); // Change role every 4 seconds
    
    return () => clearInterval(interval);
  }, [showRoles, roles.length]);
  
  // Stars background
  useEffect(() => {
    const starsCanvas = starsCanvasRef.current;
    if (!starsCanvas) return;
    
    const ctx = starsCanvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    
    // Create stars
    const stars: { x: number; y: number; size: number; opacity: number; twinkleSpeed: number }[] = [];
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        size: Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.5,
        twinkleSpeed: 0.001 + Math.random() * 0.01
      });
    }
    
    // Animate stars
    let animationFrameId: number;
    let frame = 0;
    
    const starColor = isDarkTheme !== false ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';
    
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      
      // Draw stars
      stars.forEach(star => {
        // Make stars twinkle by varying opacity
        star.opacity += Math.sin(frame * star.twinkleSpeed) * 0.01;
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));
        
        ctx.fillStyle = `${starColor} ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkTheme]);
  
  // Particles effect (orbiting around celestial body)
  useEffect(() => {
    const particlesCanvas = particlesCanvasRef.current;
    if (!particlesCanvas) return;
    
    const ctx = particlesCanvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    
    // Center of the celestial body (top-right area)
    const centerX = particlesCanvas.width * 0.8;  // 80% from left
    const centerY = particlesCanvas.height * 0.3;  // 30% from top
    
    // Create particles
    const particles: { 
      x: number; 
      y: number; 
      size: number; 
      speed: number;
      angle: number;
      distance: number;
      color: string;
    }[] = [];
    
    const particleCount = 100;
    const colors = isDarkTheme !== false ? 
      ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#f43f5e'] : 
      ['#2563eb', '#4338ca', '#9333ea', '#c026d3', '#e11d48'];
    
    // Define min and max distance constants
    const minDistance = 100; // Keep away from the center
    const maxDistance = Math.min(particlesCanvas.width, particlesCanvas.height) * 0.6;
    
    for (let i = 0; i < particleCount; i++) {
      // Random angle around the center
      const angle = Math.random() * Math.PI * 2;
      
      // Random distance from center
      const distance = minDistance + Math.random() * (maxDistance - minDistance);
      
      // Position based on angle and distance
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Random particle properties
      particles.push({
        x,
        y,
        size: 1 + Math.random() * 2,
        speed: 0.1 + Math.random() * 0.2,
        angle,
        distance,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Animate particles
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle position (orbit around celestial body)
        particle.angle += particle.speed * (0.01 / (particle.distance / 100));
        particle.x = centerX + Math.cos(particle.angle) * particle.distance;
        particle.y = centerY + Math.sin(particle.angle) * particle.distance;
        
        // Slowly change orbit
        particle.distance += Math.sin(particle.angle * 2) * 0.1;
        
        // Keep particles within bounds
        if (particle.distance < minDistance || particle.distance > maxDistance) {
          particle.distance = minDistance + Math.random() * (maxDistance - minDistance);
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      particlesCanvas.width = window.innerWidth;
      particlesCanvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkTheme]);
  
  return (
    <div className={`relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center cosmic-bg ${isDarkTheme === false ? 'light-theme' : ''}`}>
      {/* Stars background */}
      <canvas 
        ref={starsCanvasRef}
        className="absolute inset-0 stars"
      />
      
      {/* Celestial body (Blue Moon in dark mode, Sun in light mode) */}
      <div className="celestial-body-container">
        <div className="celestial-body">
          {/* Moon surface texture */}
          <div className="moon-surface"></div>
          
          {/* Moon craters */}
          <div className="moon-crater crater-1"></div>
          <div className="moon-crater crater-2"></div>
          <div className="moon-crater crater-3"></div>
          <div className="moon-crater crater-4"></div>
          
          {/* Sun surface texture */}
          <div className="sun-surface"></div>
          
          {/* Sun prominences */}
          <div className="sun-prominence prominence-1" style={{"--rotation": "20deg"} as React.CSSProperties}></div>
          <div className="sun-prominence prominence-2" style={{"--rotation": "-30deg"} as React.CSSProperties}></div>
          <div className="sun-prominence prominence-3" style={{"--rotation": "15deg"} as React.CSSProperties}></div>
          
          {/* Sun corona */}
          <div className="sun-corona"></div>
          
          {/* Sun rays */}
          <div className="sun-ray ray-1"></div>
          <div className="sun-ray ray-2"></div>
          <div className="sun-ray ray-3"></div>
          <div className="sun-ray ray-4"></div>
          <div className="sun-ray ray-5"></div>
          <div className="sun-ray ray-6"></div>
          <div className="sun-ray ray-7"></div>
          <div className="sun-ray ray-8"></div>
          <div className="sun-ray ray-9"></div>
          <div className="sun-ray ray-10"></div>
          <div className="sun-ray ray-11"></div>
          <div className="sun-ray ray-12"></div>
        </div>
      </div>
      
      {/* Particles */}
      <canvas 
        ref={particlesCanvasRef}
        className="absolute inset-0 particles-container"
      />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Welcome message and Name with typing animation */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8">
          <span className="welcome-text">Hi, I am </span>{" "}
          <span className="name-text">{typedName}</span>
          {!isNameTyped && (
            <span className="typing-cursor"></span>
          )}
        </h1>
        
        {/* Scrolling Roles */}
        <div className="role-container mb-10 md:mb-16">
          {roles.map((role, index) => (
            <div 
              key={role}
              className={`role-text text-xl md:text-3xl lg:text-4xl ${currentRoleIndex === index && showRoles ? 'active' : ''}`}
            >
              {role}
            </div>
          ))}
        </div>
        
        {/* CTA buttons */}
        <AnimatePresence>
          {isNameTyped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <Link href="/about" className="px-8 py-3 text-white rounded-md font-medium flex items-center justify-center group transition-all cta-button-primary">
                About Me
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <Link href="/projects" className="px-8 py-3 rounded-md font-medium transition-all cta-button-secondary">
                View My Work
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}