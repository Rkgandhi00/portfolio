// app/about/page.tsx (continued)
"use client"

import {  useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight,
  Code,
  Layers,
  Coffee,
  Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Tech skills with labels and proficiency
const techSkills = [
  { name: "React", category: "Frontend", icon: "/icons/react.svg", proficiency: 95 },
  { name: "TypeScript", category: "Languages", icon: "/icons/typescript.svg", proficiency: 90 },
  { name: "Next.js", category: "Frontend", icon: "/icons/nextjs.svg", proficiency: 85 },
  { name: "JavaScript", category: "Languages", icon: "/icons/javascript.svg", proficiency: 95 },
  { name: "HTML/CSS", category: "Frontend", icon: "/icons/html5.svg", proficiency: 90 },
  { name: "Node.js", category: "Backend", icon: "/icons/nodejs.svg", proficiency: 80 },
  { name: "ASP.NET Core", category: "Backend", icon: "/icons/dotnet.svg", proficiency: 85 },
  { name: "C#", category: "Languages", icon: "/icons/csharp.svg", proficiency: 85 },
  { name: "SQL", category: "Database", icon: "/icons/sql.svg", proficiency: 80 },
  { name: "MongoDB", category: "Database", icon: "/icons/mongodb.svg", proficiency: 75 },
  { name: "Azure", category: "DevOps", icon: "/icons/azure.svg", proficiency: 80 },
  { name: "Git", category: "Tools", icon: "/icons/git.svg", proficiency: 90 },
  { name: "Docker", category: "DevOps", icon: "/icons/docker.svg", proficiency: 75 },
  { name: "GraphQL", category: "Backend", icon: "/icons/graphql.svg", proficiency: 70 },
];

// Values data
const values = [
  { 
    icon: <Code className="h-6 w-6" />, 
    title: "Clean Code", 
    description: "I believe readable, maintainable code is as important as functional code. I strive for elegance in simplicity." 
  },
  { 
    icon: <Layers className="h-6 w-6" />, 
    title: "Modular Architecture", 
    description: "Building systems with clear separation of concerns ensures scalability and adaptability to change." 
  },
  { 
    icon: <Coffee className="h-6 w-6" />, 
    title: "Continuous Learning", 
    description: "The tech landscape evolves rapidly. I'm committed to constant learning and improving my skills." 
  },
  { 
    icon: <Terminal className="h-6 w-6" />, 
    title: "User-Centric Development", 
    description: "Great technology should serve people. I focus on creating intuitive, accessible experiences." 
  },
];

export default function AboutPage() {
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  const valuesRef = useRef(null);
  
  const bioInView = useInView(bioRef, { once: true, amount: 0.3 });
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  // Using SVG placeholders until you have real icons
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPlaceholderIcon = (name: string) => {
    return `/api/placeholder/40/40`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h1>
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Get to know my journey, skills, and developer philosophy
          </motion.p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="container mx-auto px-4 py-12" ref={bioRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Bio Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={bioInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-lg opacity-70" />
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-accent rounded-lg opacity-20 blur-sm" />
            <div className="absolute inset-2 rounded-lg overflow-hidden bg-card">
              <Image 
                src="/api/placeholder/600/700" 
                alt="Rushabh Gandhi" 
                fill
                style={{objectFit: "cover"}}
                className="rounded-lg"
              />
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={bioInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Rushabh Gandhi</h2>
            <h3 className="text-xl text-primary">Senior Software Developer</h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                With over 6 years of experience in software development, I've dedicated my career to crafting robust, user-friendly applications that solve real-world problems. My journey in tech started with a deep curiosity about how digital products shape our lives.
              </p>
              
              <p>
                I specialize in building modern web applications with React, TypeScript, and .NET technologies. My expertise spans the entire development lifecycle — from architecture and implementation to deployment and maintenance.
              </p>
              
              <p>
                Beyond coding, I'm passionate about creating developer experiences that promote efficiency and joy. I believe that clean code, thoughtful architecture, and empathetic collaboration are the foundations of great software.
              </p>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button asChild>
                <Link href="/resume">
                  View Resume <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skill Section */}
      <section className="py-20 bg-accent/5" ref={skillsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
            <p className="text-muted-foreground">
              My toolkit includes a diverse set of technologies across the full stack, with a focus on modern JavaScript frameworks and cloud services.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
          >
            {techSkills.map((skill) => (
              <motion.div
                key={skill.name}
                className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col items-center"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="relative w-12 h-12 mb-3">
                  <Image 
                    src={getPlaceholderIcon(skill.name)} 
                    alt={skill.name} 
                    width={48} 
                    height={48} 
                  />
                </div>
                <h4 className="font-medium text-sm">{skill.name}</h4>
                <div className="mt-2 w-full bg-accent/30 rounded-full h-1.5">
                  <motion.div 
                    className="bg-primary h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">My Developer Values</h2>
            <p className="text-muted-foreground">
              These core principles guide my approach to software development and teamwork.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-card glass p-6 rounded-lg border border-border"
                variants={itemVariants}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">My Journey</h2>
            <p className="text-muted-foreground">
              From a curious code explorer to a seasoned software developer
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

            {/* Timeline items */}
            {[
              { 
                year: "2017", 
                title: "Started Professional Journey", 
                description: "Began my professional career as a Junior Developer at WebSolutions, working with basic web technologies and learning the fundamentals of software development." 
              },
              { 
                year: "2019", 
                title: "Mid-level Developer", 
                description: "Joined InnovateSoft as a Software Developer where I expanded my skills to include React, .NET, and cloud technologies, working on enterprise-level applications." 
              },
              { 
                year: "2022", 
                title: "Senior Position", 
                description: "Promoted to Senior Software Developer at TechCorp, where I currently lead development teams, architect solutions, and mentor junior developers." 
              },
              { 
                year: "Present", 
                title: "Continuous Growth", 
                description: "Continuously expanding my expertise in modern frameworks and technologies while contributing to open-source projects and sharing knowledge through tech blogs." 
              },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative mb-12 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className={`w-5/12 ${index % 2 === 1 && 'order-1'}`}>
                  <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-300">
                    <div className="text-primary font-bold text-xl mb-2">{item.year}</div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}