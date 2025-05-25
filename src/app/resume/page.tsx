// app/resume/page.tsx
"use client"

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Download
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { ContactForm } from '@/src/components/contact/contact-form';

// Resume data sections
const experienceData = [
  {
    role: "Programmer Analyst",
    company: "SunsetGrown",
    period: "2023 - Present",
    location: "Kingsville, ON, Canada",
    description: "Leading the development of a comprehensive cloud-based platform for agricultural management using .NET 8, Angular 16, React Native, Next .JS, and Azure services. Implementing Azure Active Directory, ADB2C for user management, and designing low-level architecture using Clean Architecture principles.",
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
    role: "Software Developer",
    company: "Sparkt",
    period: "2022 - 2023",
    location: "Mumbai, India",
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
    company: "Accenture",
    period: "2020 - 2022",
    location: "Mumbai, India",
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
    role: "Founder & CEO",
    company: "Smart Solutions",
    period: "2018 - 2020",
    location: "Ahmedabad, India",
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
    role: "I&C Engineer",
    company: "Freelance",
    period: "2018 - Present",
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
    company: "Freelance",
    period: "2018 - Present",
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
    degree: "Masters of Engineering in Electrical & Computer Engineering",
    institution: "University of Windsor",
    period: "2022 - 2023",
    location: "Windsor, ON, India",
    description: "Focused on electrical, and computer systems/software development.",
    courses: [
      "Software & DSA",
      "System Design",
      "Autonomous Vehicles",
      "Artificial Intelligence",
      "Machine Learning",
      "Electrical Component Design",
      "MATLAB"
    ]
  },
  {
    degree: "Bachelor of Engineering in Instrumentation & Control",
    institution: "Gujarat Technological University",
    period: "2015 - 2019",
    location: "Gujarat, India",
    description: "Focused on instrumentation, control, and automation systems development.",
    courses: [
      "Instrumentation",
      "Control Systems",
      "Automation",
      "PLC Programming",
      "DCS",
      "SCADA"
    ]
  }
];

const certifications = [
  "Docker Certified Associate (2025)",
  "Terraform Certified Associate (2025)",
  "Microsoft Certified: Azure Solutions Architect Expert (2024)",
  "Microsoft Certified: Azure Developer Associate (2023)",
  "Microsoft Certified: Azure DevOps Engineer Expert (2022)",
  "AWS Certified Developer - Associate (2022)",
];

export default function ResumePage() {
  // Refs for animations
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
  const educationInView = useInView(educationRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Resume & Contact
          </motion.h1>
          <motion.div 
            className="h-1 w-16 sm:w-20 bg-primary mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-base sm:text-lg text-muted-foreground px-4"
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
            className="mt-6 sm:mt-8"
          >
            <Button asChild className="w-full sm:w-auto">
            <a href="/rushabh-gandhi-resume.pdf" download target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        className="py-12 sm:py-16 bg-accent/5" 
        ref={experienceRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Professional Experience
          </motion.h2>

          <div className="max-w-6xl mx-auto">
            {experienceData.map((job, index) => (
              <motion.div
                key={index}
                className="mb-8 sm:mb-12 last:mb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  {/* Timeline - Mobile: Full width, Desktop: 1/3 */}
                  <div className="lg:w-1/3">
                    <div className="bg-card p-4 sm:p-5 rounded-lg border border-border lg:sticky lg:top-24">
                      <h3 className="font-bold text-lg sm:text-xl mb-1 leading-tight">{job.role}</h3>
                      <h4 className="text-primary font-medium mb-2 text-sm sm:text-base">{job.company}</h4>
                      <div className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2">
                        <div className="flex items-start sm:items-center">
                          <span className="inline-block w-4 sm:w-5 mr-1 flex-shrink-0">📅</span> 
                          <span className="break-words">{job.period}</span>
                        </div>
                        <div className="flex items-start sm:items-center">
                          <span className="inline-block w-4 sm:w-5 mr-1 flex-shrink-0">📍</span> 
                          <span className="break-words">{job.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details - Mobile: Full width, Desktop: 2/3 */}
                  <div className="lg:w-2/3 space-y-4 sm:space-y-6">
                    <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Overview</h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{job.description}</p>
                    </div>
                    
                    <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Key Achievements</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-sm sm:text-base">
                            <div className="text-primary mr-2 mt-1 flex-shrink-0 text-xs sm:text-base">•</div>
                            <div className="leading-relaxed">{achievement}</div>
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
        className="py-12 sm:py-16" 
        ref={educationRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Education & Certifications
          </motion.h2>
          
          <div className="max-w-6xl mx-auto">
            {/* Education */}
            <div className="mb-12 sm:mb-16">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  className="mb-8 sm:mb-10 last:mb-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Timeline */}
                    <div className="lg:w-1/3">
                      <div className="bg-card p-4 sm:p-5 rounded-lg border border-border lg:sticky lg:top-24">
                        <h3 className="font-bold text-lg sm:text-xl mb-1 leading-tight">{edu.degree}</h3>
                        <h4 className="text-primary font-medium mb-2 text-sm sm:text-base">{edu.institution}</h4>
                        <div className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2">
                          <div className="flex items-start sm:items-center">
                            <span className="inline-block w-4 sm:w-5 mr-1 flex-shrink-0">📅</span> 
                            <span className="break-words">{edu.period}</span>
                          </div>
                          <div className="flex items-start sm:items-center">
                            <span className="inline-block w-4 sm:w-5 mr-1 flex-shrink-0">📍</span> 
                            <span className="break-words">{edu.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="lg:w-2/3 space-y-4 sm:space-y-6">
                      <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
                        <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Overview</h4>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{edu.description}</p>
                      </div>
                      
                      <div className="bg-card p-4 sm:p-6 rounded-lg border border-border">
                        <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Key Courses</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          {edu.courses.map((course, idx) => (
                            <li key={idx} className="flex items-start text-sm sm:text-base">
                              <div className="text-primary mr-2 mt-1 flex-shrink-0 text-xs sm:text-base">•</div>
                              <div className="leading-relaxed">{course}</div>
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
              <div className="p-4 sm:p-6 bg-primary/5 border-b border-border">
                <h3 className="text-lg sm:text-xl font-bold">Professional Certifications</h3>
              </div>
              <div className="p-4 sm:p-6">
                <ul className="space-y-2 sm:space-y-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start text-sm sm:text-base">
                      <div className="text-primary mr-2 mt-1 flex-shrink-0 text-xs sm:text-base">•</div>
                      <div className="leading-relaxed">{cert}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef}>
        <ContactForm variant="page" />
      </section>
    </div>
  );
}