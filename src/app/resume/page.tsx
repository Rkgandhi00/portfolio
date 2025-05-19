// app/resume/page.tsx
"use client"

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';

// Resume data sections
const experienceData = [
  {
    role: "Senior Software Developer",
    company: "SunsetGrown",
    period: "2023 - Present",
    location: "Remote",
    description: "Leading the development of a comprehensive cloud-based platform for agricultural management using .NET 9, Angular 16, and Azure services. Implementing Azure Active Directory, ADB2C for user management, and designing low-level architecture using Clean Architecture principles.",
    achievements: [
      "Implemented Azure AD and ADB2C integration for user management",
      "Designed and implemented Clean Architecture principles",
      "Set up Azure DevOps CI/CD pipelines",
      "Implemented Infrastructure as Code with Terraform",
      "Developed high-performance cloud solution with Azure App Services",
      "Created frontend with Angular 16 and PrimeNG",
      "Integrated weather and AI cognitive services"
    ]
  },
  {
    role: "Senior Software Developer",
    company: "Phillips",
    period: "2023",
    location: "Remote",
    description: "Led the development of a comprehensive microservices platform serving various business needs including machinery monitoring, skill development, social media, ed-Tech, and e-commerce. The platform serves 30K+ active users across multiple services.",
    achievements: [
      "Implemented IdentityServer4 for SSO",
      "Integrated Azure services (Service Bus, Event Bus, Functions)",
      "Implemented gRPC and HTTP abstraction for microservices",
      "Optimized performance with LINQ and ADO.NET",
      "Integrated multiple third-party services",
      "Implemented social login functionality",
      "Integrated payment gateway systems"
    ]
  },
  {
    role: "Software Developer",
    company: "TOPS",
    period: "2022",
    location: "Remote",
    description: "Developed a comprehensive back-office system for retail accounts to validate, process, execute and acknowledge trades created by account managers with their corresponding confirmations from brokers.",
    achievements: [
      "Migrated from legacy system to microservices architecture",
      "Implemented Entity Framework with Code-First approach",
      "Integrated Okta OAuth 2.0 for authentication",
      "Implemented Event Bus with RabbitMQ",
      "Created SSIS packages for data migration",
      "Integrated AWS S3 for storage",
      "Developed automation scripts with Python"
    ]
  },
  {
    role: "IoT Engineer",
    company: "Smart Medicine Vending",
    period: "2021",
    location: "Remote",
    description: "Built a smart medicine dispenser using Raspberry Pi, Arduino, IR Sensors, QR Scanner, and Azure IoT Hub. The system includes a cloud-based dashboard for real-time inventory monitoring and integrates payment gateways with RFID authentication.",
    achievements: [
      "Integrated Raspberry Pi and Arduino systems",
      "Implemented IR Sensors and QR Scanner functionality",
      "Integrated Azure IoT Hub for device management",
      "Developed real-time inventory monitoring system",
      "Integrated payment gateway systems",
      "Implemented RFID authentication system",
      "Created cloud-based monitoring dashboard"
    ]
  },
  {
    role: "IoT Engineer",
    company: "Industrial IoT",
    period: "2021",
    location: "Remote",
    description: "Led the architecture for Edge computing, integrating PLC (Siemens, Allen Bradley), DCS, and cloud-based analytics. Designed SCADA-integrated industrial automation system for machine status tracking and predictive maintenance.",
    achievements: [
      "Designed Edge computing architecture",
      "Integrated PLC and DCS systems",
      "Implemented SCADA system",
      "Developed predictive maintenance system",
      "Set up LoRaWAN wireless sensor network",
      "Implemented real-time data logging",
      "Created cloud-based analytics platform"
    ]
  },
  {
    role: "IoT Engineer",
    company: "Smart Greenhouse",
    period: "2020",
    location: "Remote",
    description: "Developed an AI-driven temperature and humidity control system using ESP32, DHT11 sensors, and MQTT protocol. Integrated Azure Cognitive Services for anomaly detection in crop growth.",
    achievements: [
      "Integrated ESP32 and DHT11 sensors",
      "Implemented MQTT protocol",
      "Integrated Azure Cognitive Services",
      "Developed anomaly detection system",
      "Created automated climate control system",
      "Implemented real-time monitoring system",
      "Developed data analytics dashboard"
    ]
  }
];

const educationData = [
  {
    degree: "Bachelor of Engineering in Electronics & Communication",
    institution: "Gujarat Technological University",
    period: "2012 - 2016",
    location: "Gujarat, India",
    description: "Focused on electronics, communication systems, and embedded systems development.",
    courses: [
      "Digital Electronics",
      "Communication Systems",
      "Embedded Systems",
      "Microcontrollers",
      "Signal Processing",
      "Computer Networks"
    ]
  }
];

const certifications = [
  "Microsoft Certified: Azure Developer Associate (2023)",
  "Microsoft Certified: Azure Solutions Architect Expert (2023)",
  "Microsoft Certified: Azure DevOps Engineer Expert (2022)",
  "AWS Certified Developer - Associate (2022)",
  "Docker Certified Associate (2021)"
];

// Contact form initial state
type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ResumePage() {
  // Refs for animations
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
  const educationInView = useInView(educationRef, { once: true, amount: 0.2 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.2 });

  // Contact form state
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormStatus('idle');
      }, 3000);
    }, 1500);
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
            Resume & Contact
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
            My professional experience and how to reach me
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8"
          >
            <Button asChild>
              <Link href="/rushabh-gandhi-resume.pdf" target="_blank">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        className="py-16 bg-accent/5" 
        ref={experienceRef}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Professional Experience
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {experienceData.map((job, index) => (
              <motion.div
                key={index}
                className="mb-12 last:mb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Timeline */}
                  <div className="md:w-1/3">
                    <div className="bg-card p-5 rounded-lg border border-border sticky top-24">
                      <h3 className="font-bold text-xl mb-1">{job.role}</h3>
                      <h4 className="text-primary font-medium mb-2">{job.company}</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center">
                          <span className="inline-block w-5 mr-1">📅</span> {job.period}
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-5 mr-1">📍</span> {job.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="md:w-2/3 space-y-6">
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h4 className="font-semibold mb-3">Overview</h4>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                    
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h4 className="font-semibold mb-3">Key Achievements</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="text-primary mr-2">•</div>
                            <div>{achievement}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section 
        className="py-16" 
        ref={educationRef}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Education & Certifications
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Education */}
            <div className="mb-16">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  className="mb-10 last:mb-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Timeline */}
                    <div className="md:w-1/3">
                      <div className="bg-card p-5 rounded-lg border border-border sticky top-24">
                        <h3 className="font-bold text-xl mb-1">{edu.degree}</h3>
                        <h4 className="text-primary font-medium mb-2">{edu.institution}</h4>
                        <div className="text-sm text-muted-foreground space-y-2">
                          <div className="flex items-center">
                            <span className="inline-block w-5 mr-1">📅</span> {edu.period}
                          </div>
                          <div className="flex items-center">
                            <span className="inline-block w-5 mr-1">📍</span> {edu.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="md:w-2/3 space-y-6">
                      <div className="bg-card p-6 rounded-lg border border-border">
                        <h4 className="font-semibold mb-3">Overview</h4>
                        <p className="text-muted-foreground">{edu.description}</p>
                      </div>
                      
                      <div className="bg-card p-6 rounded-lg border border-border">
                        <h4 className="font-semibold mb-3">Key Courses</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          {edu.courses.map((course, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="text-primary mr-2">•</div>
                              <div>{course}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Certifications */}
            <motion.div 
              className="bg-card rounded-lg border border-border overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="p-6 bg-primary/5 border-b border-border">
                <h3 className="text-xl font-bold">Professional Certifications</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-primary mr-2">•</div>
                      <div>{cert}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        className="py-16 bg-accent/5" 
        ref={contactRef}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Contact Info */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <a href="mailto:contact@rushabhgandhi.dev" className="text-muted-foreground hover:text-primary transition-colors">
                          contact@rushabhgandhi.dev
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-primary" />
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-muted-foreground">San Francisco, California</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-xl font-semibold mb-6">Connect</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" asChild>
                      <Link href="https://linkedin.com/in/rushabhgandhi" target="_blank" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href="https://github.com/rushabhgandhi" target="_blank" aria-label="GitHub">
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href="https://twitter.com/rushabhgandhi" target="_blank" aria-label="Twitter">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Feel free to reach out on any platform. I typically respond within 24 hours.
                  </p>
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name <span className="text-primary">*</span>
                        </label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          disabled={formStatus === 'submitting' || formStatus === 'success'}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email <span className="text-primary">*</span>
                        </label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your email address"
                          disabled={formStatus === 'submitting' || formStatus === 'success'}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message <span className="text-primary">*</span>
                      </label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message"
                        rows={6}
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                        required
                      />
                    </div>
                    
                    {formStatus === 'error' && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    )}
                    
                    {formStatus === 'success' && (
                      <div className="bg-green-500/10 text-green-500 p-3 rounded-md flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">Your message has been sent successfully. Ill get back to you soon!</p>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <span className="mr-2">Sending</span>
                          <span className="animate-spin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                          </span>
                        </>
                      ) : formStatus === 'success' ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Sent Successfully
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}