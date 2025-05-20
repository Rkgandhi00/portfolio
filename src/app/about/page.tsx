// app/about/page.tsx (continued)
"use client"

import {  useRef, useState } from 'react';
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
import { Button } from '@/src/components/ui/button';
import { ContactModal } from '@/src/components/ui/contact-modal';

// Tech skills with labels and proficiency
const techSkills = [
  { name: "C#", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", proficiency: 95 },
  { name: ".NET", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", proficiency: 95 },
  { name: "Angular", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", proficiency: 90 },
  { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", proficiency: 85 },
  { name: "TypeScript", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", proficiency: 90 },
  { name: "SQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", proficiency: 90 },
  { name: "Azure", category: "Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", proficiency: 90 },
  { name: "DevOps", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", proficiency: 85 },
  { name: "Docker", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", proficiency: 85 },
  { name: "Kubernetes", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", proficiency: 80 },
  { name: "IoT", category: "IoT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", proficiency: 80 },
  { name: "Python", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", proficiency: 80 },
  { name: "Java", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", proficiency: 75 },
  { name: "AWS", category: "Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", proficiency: 70 },
  { name: "Terraform", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", proficiency: 70 },
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  const valuesRef = useRef(null);
  
  const bioInView = useInView(bioRef, { once: true, amount: 0.3 });
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  // Replace the getPlaceholderIcon function with this:
  const getSkillIcon = (icon: string) => {
    return icon;
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
                src="/rushabh.jpeg" 
                alt="Rushabh Gandhi" 
                fill
                style={{objectFit: "scale-down"}}
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
            <h3 className="text-xl text-primary">A "Follower of Patience, Passion and Perseverance"</h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Results-driven Full-Stack Developer & IoT Engineer with 6+ years of experience in designing and developing scalable web applications, cloud-based solutions, and IoT-integrated systems. Strong expertise in .NET Core, Angular, React, Azure, and DevOps for building high-performance, secure applications.
              </p>
              
              <p>
                Skilled in architecting microservices, optimizing cloud infrastructures, and implementing CI/CD pipelines to enhance system reliability and efficiency. Additionally, experienced in IoT and Industry 4.0 solutions, integrating RFID, sensors, SCADA, PLCs, and Edge computing for real-time data processing and automation.
              </p>
              
              <p>
                Passionate about leveraging cloud, AI, and IoT to drive innovation in industries like Capital Markets, Social Media Apps, Agriculture, Manufacturing, and Healthcare. Fluent in English, Gujarati, and Hindi with professional proficiency.
              </p>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button asChild>
                <Link href="/resume">
                  View Resume <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" onClick={() => setIsContactModalOpen(true)}>
                Contact Me
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
                    src={getSkillIcon(skill.icon)} 
                    alt={skill.name} 
                    width={48} 
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-medium text-sm mb-2">{skill.name}</h4>
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Proficiency</span>
                    <span>{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                    />
                  </div>
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
                year: "2023 - Present", 
                title: "Programmer Analyst at SunsetGrown", 
                description: "Leading cloud architecture and development with Azure, implementing ADB2C, designing APIs with Clean Architecture, and developing high-performance solutions with Angular 16. Achieved 25% performance improvement and 20% cost reduction." 
              },
              { 
                year: "2022 - 2023", 
                title: "Software Engineer at SPARKT", 
                description: "Led development of Phillips X Platform ecosystem with 30K+ users, implementing microservices, IdentityServer4, and Azure services. Optimized API responses by 50% and database queries by 45%." 
              },
              { 
                year: "2020 - 2022", 
                title: "Software Engineer at Accenture", 
                description: "Developed TOPS back-office system for Capital Group, migrated to .NET Core 3.1, implemented OAuth 2.0, and created SSIS packages for data migration. Recognized for quality work and quick delivery." 
              },
              { 
                year: "2018 - 2020", 
                title: "Founder & CEO at Smart Solutions", 
                description: "Developed Smart Medicine Vending Machine, Industrial IoT Monitoring System, and Smart Greenhouse Automation, showcasing expertise in IoT, Edge computing, and industrial automation." 
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

      {/* Add Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}