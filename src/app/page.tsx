// src/app/page.tsx
"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import './cosmic-styles.css';

export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  
  // Track mounting and theme state
  const [mounted, setMounted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Default to true to prevent flash
  
  // Track if component has mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Update theme state after component mounts on client side
  useEffect(() => {
    if (mounted) {
      // Use resolvedTheme first, fallback to theme
      const currentTheme = resolvedTheme || theme;
      setIsDarkTheme(currentTheme !== 'light');
    }
  }, [theme, resolvedTheme, mounted]);

  // State for typed text animation
  const [typedName, setTypedName] = useState("");
  const [isNameTyped, setIsNameTyped] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showRoles, setShowRoles] = useState(false);
  const nameToType = "Rushabh Gandhi";
  
  // Roles to display one by one
  const roles = [
    "Full Stack Developer",
    "Cloud Developer",
    "Data Engineer",
    "DevOps Engineer",
    "IoT Developer",
    "AI/ML Developer"
  ];
  
  // References for canvas elements
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Type name letter by letter
  useEffect(() => {
    if (typedName.length < nameToType.length) {
      const timeout = setTimeout(() => {
        setTypedName(nameToType.substring(0, typedName.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    } else if (!isNameTyped) {
      setIsNameTyped(true);
      
      // Start showing roles after name is typed
      setTimeout(() => {
        setShowRoles(true);
      }, 200);
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
    // Only run after mounting to prevent SSR issues
    if (!mounted) return;
    
    const starsCanvas = starsCanvasRef.current;
    if (!starsCanvas) return;
    
    const ctx = starsCanvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const updateCanvasSize = () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    
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
    
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      
      // Determine star color based on current theme
      const starColor = isDarkTheme ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';
      
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
      updateCanvasSize();
      // Redistribute stars on resize
      stars.forEach(star => {
        if (star.x > starsCanvas.width) star.x = Math.random() * starsCanvas.width;
        if (star.y > starsCanvas.height) star.y = Math.random() * starsCanvas.height;
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, isDarkTheme]);
  
  // Particles effect (orbiting around celestial body)
  useEffect(() => {
    // Only run after mounting to prevent SSR issues
    if (!mounted) return;
    
    const particlesCanvas = particlesCanvasRef.current;
    if (!particlesCanvas) return;
    
    const ctx = particlesCanvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const updateCanvasSize = () => {
      particlesCanvas.width = window.innerWidth;
      particlesCanvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    
    // Celestial body position that gently moves
    let celestialBodyX = particlesCanvas.width * 0.85;
    let celestialBodyY = particlesCanvas.height * 0.25;
    let celestialBodyAngle = 0;
    
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
    const colors = isDarkTheme ? 
      ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#f43f5e'] : 
      ['#0ea5e9', '#22c55e', '#eab308', '#f59e0b', '#ef4444'];
    
    // Define min and max distance constants
    const minDistance = 120;
    const maxDistance = Math.min(particlesCanvas.width, particlesCanvas.height) * 0.4;
    
    for (let i = 0; i < particleCount; i++) {
      // Random angle around the center
      const angle = Math.random() * Math.PI * 2;
      
      // Random distance from center
      const distance = minDistance + Math.random() * (maxDistance - minDistance);
      
      // Position based on angle and distance
      const x = celestialBodyX + Math.cos(angle) * distance;
      const y = celestialBodyY + Math.sin(angle) * distance;
      
      // Random particle properties - SLOWER MOVEMENT
      particles.push({
        x,
        y,
        size: 1 + Math.random() * 2,
        speed: 0.0001 + Math.random() * 0.0001,
        angle,
        distance,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Animate particles
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
      
      // Slowly move the celestial body in a gentle orbit - IMPROVED
      celestialBodyAngle += 0.0003; // Very slow celestial movement
      const screenCenterX = particlesCanvas.width * 0.5;
      const screenCenterY = particlesCanvas.height * 0.5;
      const orbitRadius = Math.min(particlesCanvas.width, particlesCanvas.height) * 0.1; // Smaller orbit
      
      // Update celestial body position with gentle movement
      celestialBodyX = screenCenterX + Math.cos(celestialBodyAngle) * orbitRadius + (particlesCanvas.width * 0.35);
      celestialBodyY = screenCenterY + Math.sin(celestialBodyAngle * 0.7) * orbitRadius * 0.5 - (particlesCanvas.height * 0.25);
      
      // Draw particles - they follow the celestial body
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle position (orbit around moving celestial body)
        particle.angle += particle.speed;
        particle.x = celestialBodyX + Math.cos(particle.angle) * particle.distance;
        particle.y = celestialBodyY + Math.sin(particle.angle) * particle.distance;
        
        // Gently vary orbit distance
        particle.distance += Math.sin(particle.angle * 2) * 0.3; // Reduced variation
        
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
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, isDarkTheme]);
  
  // Apply theme class to the container
  const themeClass = mounted && !isDarkTheme ? 'light-theme' : 'dark-theme';
  
  return (
    <div className={`relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center ${themeClass} cosmic-bg`}>
      {/* Stars background */}
      <canvas 
        ref={starsCanvasRef}
        className="absolute inset-0 stars"
      />
      
      {/* Celestial body (Blue Moon in dark mode, Sun in light mode) */}
      <div className="celestial-body-container">
        <div className="celestial-body">
          {/* Moon elements - visible in dark theme */}
          <div className="moon-surface"></div>
          <div className="moon-crater crater-1"></div>
          <div className="moon-crater crater-2"></div>
          <div className="moon-crater crater-3"></div>
          <div className="moon-crater crater-4"></div>
          
          {/* Sun elements - visible in light theme */}
          <div className="sun-surface"></div>
          <div className="sun-prominence prominence-1"></div>
          <div className="sun-prominence prominence-2"></div>
          <div className="sun-prominence prominence-3"></div>
          <div className="sun-corona"></div>
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