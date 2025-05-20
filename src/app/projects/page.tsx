// app/projects/page.tsx
"use client"

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ExternalLink, 
  Github, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Tag
} from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

// Project Types for TypeScript
type ProjectTag = 'React' | 'Next.js' | 'TypeScript' | 'Node.js' | 'ASP.NET' | 'MongoDB' | 'SQL' | 'Azure' | 'AWS' | 'UI/UX' | 'Mobile' | 'GraphQL' | 'C#' | '.NET' | 'Angular' | 'DevOps' | 'Java' | 'GenAI' | 'AI/ML' | 'Data Engineering' | 'MCP' | 'Docker' | 'Kubernetes' | 'Python';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: ProjectTag[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  screenshots: string[];
  features: string[];
  year: number;
}

// Sample projects data
const projects: Project[] = [
  {
    id: 'sunsetgrown-platform',
    title: 'SunsetGrown Platform',
    description: 'Enterprise cloud solution for agricultural management and automation',
    longDescription: 'Developed a comprehensive cloud-based platform for agricultural management using .NET 9, Angular 16, and Azure services. Implemented Azure Active Directory, ADB2C for user management, and designed low-level architecture using Clean Architecture principles.',
    tags: ['C#', '.NET', 'Angular', 'Azure', 'DevOps', 'Terraform', 'SQL'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rkgandhi00/sunsetgrown-platform',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Azure AD and ADB2C integration for user management',
      'Clean Architecture implementation',
      'Azure DevOps CI/CD pipelines',
      'Infrastructure as Code with Terraform',
      'High-performance cloud solution with Azure App Services',
      'Frontend development with Angular 16 and PrimeNG',
      'Integration with weather and AI cognitive services'
    ],
    year: 2025
  },
  {
    id: 'phillips-platform',
    title: 'Phillips X Platform',
    description: 'Microservices-based ecosystem for machinery monitoring and education',
    longDescription: 'Led the development of a comprehensive microservices platform serving various business needs including machinery monitoring, skill development, social media, ed-Tech, and e-commerce. The platform serves 30K+ active users across multiple services.',
    tags: ['C#', '.NET', 'Angular', 'Azure', 'DevOps', 'gRPC', 'SQL'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rkgandhi00/phillips-platform',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'IdentityServer4 implementation for SSO',
      'Azure services integration (Service Bus, Event Bus, Functions)',
      'gRPC and HTTP abstraction for microservices',
      'Performance optimization with LINQ and ADO.NET',
      'Integration with multiple third-party services',
      'Social login implementation',
      'Payment gateway integration'
    ],
    year: 2023
  },
  {
    id: 'tops-system',
    title: 'TOPS - Trade Operations Processing System',
    description: 'Back-office system for retail accounts and mutual funds',
    longDescription: 'Developed a comprehensive back-office system for retail accounts to validate, process, execute and acknowledge trades created by account managers with their corresponding confirmations from brokers.',
    tags: ['C#', '.NET', 'Angular', 'AWS', 'SQL', 'RabbitMQ', 'SSIS'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rkgandhi00/tops-system',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Microservices migration from legacy system',
      'Entity Framework with Code-First approach',
      'Okta OAuth 2.0 implementation',
      'Event Bus with RabbitMQ',
      'SSIS packages for data migration',
      'AWS S3 integration',
      'Automation scripts with Python'
    ],
    year: 2022
  },
  {
    id: 'smart-medicine-vending',
    title: 'Smart Medicine Vending Machine',
    description: 'IoT-based automated medicine dispensing system',
    longDescription: 'Built a smart medicine dispenser using Raspberry Pi, Arduino, IR Sensors, QR Scanner, and Azure IoT Hub. The system includes a cloud-based dashboard for real-time inventory monitoring and integrates payment gateways with RFID authentication.',
    tags: ['IoT', 'Azure', 'Python', 'Raspberry Pi', 'Arduino', 'RFID'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rkgandhi00/smart-medicine-vending',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Raspberry Pi and Arduino integration',
      'IR Sensors and QR Scanner implementation',
      'Azure IoT Hub integration',
      'Real-time inventory monitoring',
      'Payment gateway integration',
      'RFID authentication system',
      'Cloud-based dashboard'
    ],
    year: 2019
  },
  {
    id: 'industrial-iot',
    title: 'Industrial IoT Monitoring System',
    description: 'Industry 4.0 solution for industrial automation and monitoring',
    longDescription: 'Led the architecture for Edge computing, integrating PLC (Siemens, Allen Bradley), DCS, and cloud-based analytics. Designed SCADA-integrated industrial automation system for machine status tracking and predictive maintenance.',
    tags: ['IoT', 'PLC', 'SCADA', 'Edge Computing', 'LoRaWAN', 'Azure'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rkgandhi00/industrial-iot',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Edge computing architecture',
      'PLC and DCS integration',
      'SCADA system implementation',
      'Predictive maintenance system',
      'LoRaWAN wireless sensor network',
      'Real-time data logging',
      'Cloud-based analytics'
    ],
    year: 2020
  },
  {
    id: 'smart-greenhouse',
    title: 'Smart Greenhouse Automation',
    description: 'AI-driven temperature and humidity control system',
    longDescription: 'Developed an AI-driven temperature and humidity control system using ESP32, DHT11 sensors, and MQTT protocol. Integrated Azure Cognitive Services for anomaly detection in crop growth.',
    tags: ['IoT', 'AI', 'Azure', 'ESP32', 'MQTT', 'Python'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rkgandhi00/smart-greenhouse',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'ESP32 and DHT11 sensor integration',
      'MQTT protocol implementation',
      'Azure Cognitive Services integration',
      'Anomaly detection in crop growth',
      'Automated climate control',
      'Real-time monitoring system',
      'Data analytics dashboard'
    ],
    year: 2021
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTags, setFilterTags] = useState<ProjectTag[]>([]);
  
  const modalRef = useRef<HTMLDivElement>(null);

  // All available tags for filtering
  const allTags: ProjectTag[] = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ) as ProjectTag[];

  // Filter projects based on search and tags
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = filterTags.length === 0 || 
      filterTags.every(tag => project.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Toggle tag filter
  const toggleTag = (tag: ProjectTag) => {
    setFilterTags(current => 
      current.includes(tag) 
        ? current.filter(t => t !== tag) 
        : [...current, tag]
    );
  };

  // Handle opening a project modal
  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Handle closing the project modal
  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  // Navigate through project screenshots
  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex(prev => 
      prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
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
            Explore the applications and solutions I've built
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 mb-12">
        <motion.div 
          className="max-w-5xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
          
          {/* Tags filter */}
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="flex items-center mr-2">
              <Tag size={16} className="text-muted-foreground mr-1" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={filterTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
                className="text-xs rounded-full"
              >
                {tag}
              </Button>
            ))}
            {filterTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterTags([])}
                className="text-xs ml-2"
              >
                Clear filters
              </Button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-xl"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden bg-accent/10">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{objectFit: "cover"}}
                    className="transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={() => openProject(project)}>
                      View Details
                    </Button>
                    {/*<div className="flex space-x-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="icon" asChild className="h-9 w-9">
                          <Link href={project.githubUrl} target="_blank" aria-label="GitHub repository">
                            <Github size={18} />
                          </Link>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant="outline" size="icon" asChild className="h-9 w-9">
                          <Link href={project.liveUrl} target="_blank" aria-label="Live demo">
                            <ExternalLink size={18} />
                          </Link>
                        </Button>
                      )}
                    </div>*/}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeProject();
            }}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-card z-10">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeProject}
                  aria-label="Close"
                >
                  <X size={24} />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Image Carousel */}
                <div className="relative aspect-video mb-8 bg-accent/10 rounded-lg overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={selectedProject.screenshots[currentImageIndex]} 
                        alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                        fill
                        style={{objectFit: "contain"}}
                        className="rounded-lg"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {selectedProject.screenshots.length > 1 && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/70 backdrop-blur-sm rounded-full z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/70 backdrop-blur-sm rounded-full z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                        {selectedProject.screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={cn(
                              "w-2 h-2 rounded-full transition-colors",
                              currentImageIndex === index 
                                ? "bg-primary" 
                                : "bg-primary/30 hover:bg-primary/50"
                            )}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Overview</h3>
                      <p className="text-muted-foreground">{selectedProject.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-primary">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-sm bg-accent/50 text-accent-foreground px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Year */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Year</h3>
                      <p className="text-muted-foreground">{selectedProject.year}</p>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                      {selectedProject.liveUrl && (
                        <Button asChild variant="default" className="w-full">
                          <Link href={selectedProject.liveUrl} target="_blank">
                            <ExternalLink size={16} className="mr-2" />
                            View Live Demo
                          </Link>
                        </Button>
                      )}
                      {selectedProject.githubUrl && (
                        <Button asChild variant="outline" className="w-full">
                          <Link href={selectedProject.githubUrl} target="_blank">
                            {/* <Github size={16} className="mr-2" />
                            View Source Code */}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}