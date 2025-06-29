// components/chatbot/chat-bot.tsx
"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/src/lib/utils';
import { useTheme } from 'next-themes';

// Define types for our chat messages
type MessageType = 'user' | 'bot';
type Message = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
};

// Updated AI responses based on Rushabh's actual profile
const AI_KNOWLEDGE = {
  greeting: "Hello! I'm Rushabh's AI assistant. I can help you learn about his experience, skills, and projects. What would you like to know?",
  skills: [
    "C#", ".NET Core", "Angular", "React", "TypeScript", "JavaScript", 
    "SQL Server", "Azure", "AWS", "Docker", "Kubernetes", "DevOps",
    "Python", "Java", "IoT", "Terraform", "gRPC", "RabbitMQ",
    "Entity Framework", "Clean Architecture", "Microservices"
  ],
  experience: [
    "Programmer Analyst at SunsetGrown (2023-Present) - Leading cloud-based agricultural platform development",
    "Software Developer at Sparkt (2022-2023) - Built microservices platform for 30K+ users",
    "Software Developer at Accenture (2020-2022) - Developed TOPS back-office system for Capital Group",
    "Founder & CEO at Smart Solutions (2018-2020) - Created IoT solutions and smart automation systems"
  ],
  education: [
    "Masters of Engineering in Electrical & Computer Engineering - University of Windsor (2022-2023)",
    "Bachelor of Engineering in Instrumentation & Control - Gujarat Technological University (2015-2019)"
  ],
  projects: [
    "SunsetGrown Platform - Agricultural management system with .NET 9, Angular 16, and Azure",
    "Phillips X Platform - Microservices ecosystem serving 30K+ users with machinery monitoring",
    "TOPS System - Back-office system for retail accounts and mutual funds processing",
    "Smart Medicine Vending Machine - IoT-based automated dispensing with Azure IoT Hub",
    "Industrial IoT Monitoring - Industry 4.0 solution with PLC, SCADA, and edge computing",
    "Smart Greenhouse Automation - AI-driven climate control with ESP32 and Azure Cognitive Services"
  ],
  about: "Rushabh Gandhi is a results-driven Full-Stack Developer & IoT Engineer with 6+ years of experience. He specializes in scalable web applications, cloud solutions, and IoT-integrated systems using .NET Core, Angular, React, Azure, and DevOps technologies.",
  certifications: [
    "Docker Certified Associate (2025)",
    "Terraform Certified Associate (2025)", 
    "Microsoft Azure Solutions Architect Expert (2024)",
    "Microsoft Azure Developer Associate (2023)",
    "Microsoft Azure DevOps Engineer Expert (2022)",
    "AWS Certified Developer - Associate (2022)"
  ]
};

// Function to generate AI response based on user query
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return AI_KNOWLEDGE.greeting;
  } else if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech stack')) {
    return `Rushabh's technical expertise includes:\n\n• Languages: ${AI_KNOWLEDGE.skills.slice(0, 6).join(', ')}\n• Cloud & DevOps: ${AI_KNOWLEDGE.skills.slice(6, 12).join(', ')}\n• Frameworks & Tools: ${AI_KNOWLEDGE.skills.slice(12).join(', ')}`;
  } else if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
    return `Work Experience:\n\n${AI_KNOWLEDGE.experience.map(exp => `• ${exp}`).join('\n\n')}`;
  } else if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
    return `Education:\n\n${AI_KNOWLEDGE.education.map(edu => `• ${edu}`).join('\n\n')}`;
  } else if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('work samples')) {
    return `Notable Projects:\n\n${AI_KNOWLEDGE.projects.map(project => `• ${project}`).join('\n\n')}`;
  } else if (lowerQuery.includes('about') || lowerQuery.includes('who is') || lowerQuery.includes('background')) {
    return AI_KNOWLEDGE.about;
  } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach') || lowerQuery.includes('hire')) {
    return "📧 Email: rkgandhi00@gmail.com\n💼 LinkedIn: https://www.linkedin.com/in/rk1400/\n🐦 Twitter: https://x.com/rk_1400\n💻 GitHub: https://github.com/Rkgandhi00\n\nFeel free to reach out for opportunities or collaboration!";
  } else if (lowerQuery.includes('certification') || lowerQuery.includes('certified')) {
    return `Professional Certifications:\n\n${AI_KNOWLEDGE.certifications.map(cert => `• ${cert}`).join('\n')}`;
  } else if (lowerQuery.includes('location') || lowerQuery.includes('where')) {
    return "Rushabh is currently based in Ontario, Canada, and is open to remote work opportunities globally.";
  } else if (lowerQuery.includes('azure') || lowerQuery.includes('cloud')) {
    return "Rushabh has extensive Azure experience including:\n• Azure Active Directory & ADB2C\n• Azure App Services & Functions\n• Azure DevOps CI/CD\n• Azure IoT Hub\n• Infrastructure as Code with Terraform\n• Azure Cognitive Services";
  } else if (lowerQuery.includes('iot') || lowerQuery.includes('automation')) {
    return "IoT & Automation expertise:\n• Industrial IoT with PLC, SCADA, DCS\n• Edge computing architecture\n• Smart devices with Raspberry Pi, Arduino, ESP32\n• RFID, sensors, and wireless networks\n• Predictive maintenance systems";
  } else {
    return "I can help you learn about Rushabh's:\n\n• 💼 Professional experience\n• 🛠️ Technical skills\n• 🎓 Education & certifications\n• 🚀 Projects & portfolio\n• 📞 Contact information\n• ☁️ Cloud & Azure expertise\n• 🤖 IoT & automation work\n\nWhat would you like to know more about?";
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: AI_KNOWLEDGE.greeting,
      type: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme } = useTheme();
  const [showChat, setShowChat] = useState(true);
  const lastScrollY = useRef(0);

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted ? (resolvedTheme === 'dark') : true; // Default to dark theme during SSR

  // Scroll to bottom of messages when new ones are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Hide chat on scroll down, show on scroll up or at top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowChat(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowChat(false);
      } else {
        setShowChat(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        type: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
    <>
      {/* Only render after mounting to avoid hydration issues */}
      {mounted && (
        <>
          {/* Chat Button */}
          <motion.div
            className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 ${showChat ? 'translate-y-0' : 'translate-y-20 opacity-0 pointer-events-none'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: 'spring' }}
          >
            <Button
              className={cn(
                "w-14 h-14 rounded-full shadow-lg transition-all duration-300",
                isDarkTheme 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25" 
                  : "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25"
              )}
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Open chat with Rushabh's AI assistant"
            >
              <MessageSquare size={24} />
            </Button>
          </motion.div>

          {/* Chat Window */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className={cn(
                  "fixed bottom-20 right-6 w-80 sm:w-96 h-[500px] z-50 rounded-xl shadow-2xl overflow-hidden flex flex-col border",
                  isDarkTheme
                    ? "bg-gray-900/95 border-gray-700/50 backdrop-blur-md"
                    : "bg-white/95 border-gray-200/50 backdrop-blur-md"
                )}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {/* Chat Header */}
                <div className={cn(
                  "px-4 py-3 border-b flex justify-between items-center",
                  isDarkTheme 
                    ? "bg-blue-600/20 border-gray-700/50" 
                    : "bg-orange-600/10 border-gray-200/50"
                )}>
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm",
                      isDarkTheme 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                        : "bg-gradient-to-r from-orange-500 to-red-600"
                    )}>
                      RG
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-semibold text-sm",
                        isDarkTheme ? "text-white" : "text-gray-900"
                      )}>
                        Rushabh&apos;s AI Assistant
                      </h3>
                      <p className={cn(
                        "text-xs",
                        isDarkTheme ? "text-gray-300" : "text-gray-600"
                      )}>
                        Online • Ask me anything!
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 rounded-full",
                      isDarkTheme 
                        ? "text-gray-300 hover:text-white hover:bg-gray-800" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </Button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.type === 'user' ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-line",
                          message.type === 'user'
                            ? isDarkTheme
                              ? "bg-blue-600 text-white"
                              : "bg-orange-600 text-white"
                            : isDarkTheme
                              ? "bg-gray-800 text-gray-100 border border-gray-700"
                              : "bg-gray-100 text-gray-900 border border-gray-200"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {/* Bot typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 flex items-center space-x-3",
                        isDarkTheme
                          ? "bg-gray-800 text-gray-100 border border-gray-700"
                          : "bg-gray-100 text-gray-900 border border-gray-200"
                      )}>
                        <span className="text-sm">Thinking</span>
                        <div className="flex space-x-1">
                          <motion.div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isDarkTheme ? "bg-blue-400" : "bg-orange-500"
                            )}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                          />
                          <motion.div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isDarkTheme ? "bg-blue-400" : "bg-orange-500"
                            )}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          />
                          <motion.div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isDarkTheme ? "bg-blue-400" : "bg-orange-500"
                            )}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className={cn(
                  "p-3 border-t flex space-x-2",
                  isDarkTheme ? "border-gray-700/50" : "border-gray-200/50"
                )}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about Rushabh's experience, skills, projects..."
                    className={cn(
                      "flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all",
                      isDarkTheme
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-orange-500 focus:border-orange-500"
                    )}
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputValue.trim() || isTyping}
                    className={cn(
                      "rounded-xl px-4 transition-all",
                      isDarkTheme
                        ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-700"
                        : "bg-orange-600 hover:bg-orange-700 text-white disabled:bg-gray-300"
                    )}
                  >
                    {isTyping ? (
                      <Loader size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}