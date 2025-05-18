// app/page.tsx
"use client"

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Cpu, Database, Server } from 'lucide-react';

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mouseX, setMouseX] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mouseY, setMouseY] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // For smooth parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      if (backgroundRef.current) {
        const rect = backgroundRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate distance from center (normalized -1 to 1)
        const distanceX = (mouseX - rect.left - centerX) / centerX;
        const distanceY = (mouseY - rect.top - centerY) / centerY;
        
        // Set motion values with dampened effect
        x.set(distanceX * 20); // Adjust multiplier for more/less movement
        y.set(distanceY * 20);
        
        // For other effects
        setMouseX(mouseX);
        setMouseY(mouseY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Tech spheres data
  const techSpheres = [
    { icon: <Code />, name: "Frontend", color: "from-blue-500 to-cyan-400" },
    { icon: <Server />, name: "Backend", color: "from-purple-500 to-pink-400" },
    { icon: <Database />, name: "Database", color: "from-green-500 to-emerald-400" },
    { icon: <Cpu />, name: "DevOps", color: "from-orange-500 to-amber-400" },
  ];

  return (
    <div className="relative min-h-screen bg-background flex flex-col overflow-hidden" ref={backgroundRef}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-bl from-primary/20 via-transparent to-accent/20" />
        
        {/* Animated blurred circles */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/20 filter blur-3xl"
          style={{ 
            x: springX, 
            y: springY,
            left: '10%', 
            top: '20%' 
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-accent/20 filter blur-3xl"
          style={{ 
            x: springX, 
            y: springY,
            right: '10%', 
            bottom: '20%',
            scale: 1.5,
          }}
          animate={{
            scale: [1.2, 1.5, 1.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="py-32 md:py-40 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              variants={itemVariants}
            >
              <span className="block">
                Hi, I&apos;m
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"> Rushabh</span>
              </span>
              <span className="block mt-2">Senior Software Developer</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              I build exceptional digital experiences with cutting-edge technologies. Specializing in React, .NET, and cloud solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="text-base">
                <Link href="/projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/about">About Me</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Spheres */}
      <section className="py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {techSpheres.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${tech.color} shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300`}>
                  {tech.icon}
                </div>
                <span className="font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Preview Links */}
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Explore My Portfolio
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "About Me", description: "Learn about my journey, skills, and developer philosophy", link: "/about" },
              { title: "Projects", description: "Explore the applications and solutions I've built", link: "/projects" },
              { title: "Blog", description: "Read my thoughts on technology and development", link: "/blog" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index + 0.5 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Button asChild variant="ghost" className="group">
                  <Link href={item.link}>
                    Discover
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}