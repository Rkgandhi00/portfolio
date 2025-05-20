// components/chatbot/chat-bot.tsx
"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/src/lib/utils';


// Define types for our chat messages
type MessageType = 'user' | 'bot';
type Message = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
};

// Mock AI responses based on Rushabh's profile
const AI_KNOWLEDGE = {
  greeting: "Hello! I'm Rushabh's portfolio assistant. How can I help you today?",
  skills: [
    "React", "TypeScript", "Next.js", "JavaScript", "Node.js", 
    "ASP.NET Core", "C#", "SQL", "MongoDB", "Azure DevOps",
    "Docker", "Kubernetes", "CI/CD Pipelines", "RESTful APIs",
    "Git", "Agile Methodologies", "Test-Driven Development"
  ],
  experience: [
    "Senior Software Developer at TechCorp (2022-Present)",
    "Software Developer at InnovateSoft (2019-2022)",
    "Junior Developer at WebSolutions (2017-2019)"
  ],
  education: "Master's in Computer Science from University of Technology (2016-2018)",
  projects: [
    "E-commerce Platform - Built with Next.js, Node.js, and MongoDB",
    "Enterprise CRM - ASP.NET Core, SQL Server, and Azure",
    "Mobile Banking App - React Native and Firebase",
    "Health Tracker - React, Express, and GraphQL"
  ],
  about: "Rushabh is a passionate software developer with 6+ years of experience building modern web applications. He specializes in full-stack development with React, .NET, and cloud technologies."
};

// Function to generate AI response based on user query
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
    return AI_KNOWLEDGE.greeting;
  } else if (lowerQuery.includes('skill') || lowerQuery.includes('can you do')) {
    return `Rushabh is proficient in: ${AI_KNOWLEDGE.skills.join(', ')}.`;
  } else if (lowerQuery.includes('experience') || lowerQuery.includes('work history')) {
    return `Work Experience:\n${AI_KNOWLEDGE.experience.join('\n')}`;
  } else if (lowerQuery.includes('education') || lowerQuery.includes('study')) {
    return AI_KNOWLEDGE.education;
  } else if (lowerQuery.includes('project') || lowerQuery.includes('portfolio')) {
    return `Notable Projects:\n${AI_KNOWLEDGE.projects.join('\n')}`;
  } else if (lowerQuery.includes('about') || lowerQuery.includes('who')) {
    return AI_KNOWLEDGE.about;
  } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
    return "You can reach Rushabh via email at rkgandhi00@gmail.com or through LinkedIn at https://www.linkedin.com/in/rk1400/.";
  } else {
    return "I'm not sure about that, but I can tell you about Rushabh's skills, experience, projects, or how to contact him. What would you like to know?";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    }, 1500);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <Button
          className="w-14 h-14 rounded-full shadow-lg"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 w-80 md:w-96 h-96 z-50 rounded-lg shadow-xl overflow-hidden flex flex-col bg-card glass-dark border border-border"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="px-4 py-3 bg-primary/10 border-b border-border flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
                  RG
                </div>
                <div>
                  <h3 className="font-medium text-sm">Portfolio Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me about Rushabh</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.type === 'user' ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                      message.type === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-lg px-4 py-2 flex items-center space-x-2">
                    <span className="text-sm">Typing</span>
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-current"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-current"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-current"
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
            <form onSubmit={handleSubmit} className="p-2 border-t border-border flex">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-background focus:outline-none rounded-l-md"
              />
              <Button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                className="rounded-l-none"
              >
                {isTyping ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}