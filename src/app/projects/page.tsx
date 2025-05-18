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

// Project Types for TypeScript
type ProjectTag = 'React' | 'Next.js' | 'TypeScript' | 'Node.js' | 'ASP.NET' | 'MongoDB' | 'SQL' | 'Azure' | 'AWS' | 'UI/UX' | 'Mobile' | 'GraphQL';

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
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with advanced filtering, cart functionality, and payment processing',
    longDescription: 'A comprehensive e-commerce solution built with Next.js for frontend and Node.js for backend services. The platform features product management, user authentication, shopping cart, checkout process with Stripe integration, and order management. Special attention was given to performance optimization, responsive design, and accessibility.',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rushabhgandhi/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.rushabhgandhi.dev',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Advanced product filtering and search',
      'User authentication and profile management',
      'Shopping cart with persistent storage',
      'Stripe payment integration',
      'Order tracking and history',
      'Admin dashboard for product management',
      'Responsive design optimized for all devices'
    ],
    year: 2023
  },
  {
    id: 'enterprise-crm',
    title: 'Enterprise CRM System',
    description: 'A comprehensive customer relationship management system for enterprise clients',
    longDescription: 'An enterprise-grade CRM system built with ASP.NET Core backend and React frontend. The system provides robust customer data management, sales pipeline tracking, reporting, and integration with third-party services. Security was a top priority, implementing role-based access control and data encryption.',
    tags: ['React', 'ASP.NET', 'SQL', 'TypeScript', 'Azure'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rushabhgandhi/enterprise-crm',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Customer data management with detailed profiles',
      'Sales pipeline and opportunity tracking',
      'Task management and reminders',
      'Advanced reporting and analytics dashboard',
      'Email integration and communication history',
      'Role-based access control',
      'Customizable workflow automation'
    ],
    year: 2022
  },
  {
    id: 'health-tracker',
    title: 'Health & Fitness Tracker',
    description: 'A mobile-first application for tracking health metrics, exercise routines, and nutrition',
    longDescription: 'A health and fitness tracking application built with React Native for cross-platform mobile support and a GraphQL API backend. The app allows users to track workouts, nutrition, body measurements, and health metrics. It includes visualization of progress over time, goal setting, and social features for sharing achievements.',
    tags: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Mobile'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rushabhgandhi/health-tracker',
    liveUrl: 'https://health-tracker.rushabhgandhi.dev',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Workout tracking with custom routine builder',
      'Nutrition diary and meal planning',
      'Body measurement tracking and progress visualization',
      'Goal setting and achievement tracking',
      'Integration with fitness wearables',
      'Social sharing and community features',
      'Personalized reports and insights'
    ],
    year: 2021
  },
  {
    id: 'smart-home-dashboard',
    title: 'Smart Home Dashboard',
    description: 'A central dashboard for monitoring and controlling smart home devices',
    longDescription: 'A comprehensive IoT dashboard for smart home management, built with React and Node.js. The application interfaces with various smart home protocols to provide a unified control interface for lights, thermostats, security systems, and other connected devices. Features include automation rules, energy monitoring, and mobile control.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'UI/UX'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rushabhgandhi/smart-home',
    liveUrl: 'https://smarthome.rushabhgandhi.dev',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Unified control for multiple smart home ecosystems',
      'Real-time device status and monitoring',
      'Automation rule creation and scheduling',
      'Energy usage tracking and optimization',
      'Security system integration and alerts',
      'Voice command integration',
      'Mobile-responsive design for control on the go'
    ],
    year: 2022
  },
  {
    id: 'project-management',
    title: 'Project Management Tool',
    description: 'A collaborative project management application with task tracking and team coordination features',
    longDescription: 'A comprehensive project management solution built with Next.js and ASP.NET Core. The application supports agile methodologies with features for sprint planning, backlog management, task assignment, and progress tracking. It includes real-time collaboration tools, file sharing, and integration with version control systems.',
    tags: ['React', 'Next.js', 'ASP.NET', 'SQL', 'Azure'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rushabhgandhi/project-manager',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Kanban and Scrum board views',
      'Sprint planning and backlog management',
      'Task assignment and time tracking',
      'Real-time collaboration and commenting',
      'File sharing and document management',
      'Burndown charts and velocity tracking',
      'Integration with GitHub and other version control systems'
    ],
    year: 2023
  },
  {
    id: 'content-management',
    title: 'Headless CMS Platform',
    description: 'A flexible content management system with a headless architecture for multi-channel publishing',
    longDescription: 'A modern headless CMS built with Node.js and React. This platform allows content creators to manage structured content that can be published across multiple channels through APIs. It features a flexible content modeling system, powerful asset management, localization support, and comprehensive versioning.',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/rushabhgandhi/headless-cms',
    liveUrl: 'https://cms-demo.rushabhgandhi.dev',
    screenshots: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
    ],
    features: [
      'Flexible content modeling and schema building',
      'API-first architecture for omnichannel publishing',
      'Rich text editor with media embedding',
      'Asset management with image processing',
      'Content versioning and publishing workflow',
      'Localization and internationalization support',
      'User role management and access control'
    ],
    year: 2021
  },
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
            Explore the applications and solutions Ive built
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
                    <div className="flex space-x-2">
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
                    </div>
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
                            <Github size={16} className="mr-2" />
                            View Source Code
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