// components/layout/footer.tsx
"use client"

import Link from 'next/link';
import { Github, Linkedin, Mail, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { href: 'https://github.com/Rkgandhi00', icon: <Github size={20} />, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/rk1400/', icon: <Linkedin size={20} />, label: 'LinkedIn' },
    { href: 'https://x.com/rk_1400', icon: <X size={20} />, label: 'Twitter' },
    { href: 'mailto:rkgandhi00@gmail.com', icon: <Mail size={20} />, label: 'Email' },
  ];

  return (
    <footer className="py-8 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Rushabh Gandhi</h3>
            <p className="text-muted-foreground">
              Senior Software Developer specializing in modern web technologies and cloud with data and AI solutions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/resume', label: 'Resume' },
                { href: '/projects', label: 'Projects' },
                { href: '/blog', label: 'Blog' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground hover:border-primary transition-colors"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 * index,
                    duration: 0.5,
                    type: "spring",
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {currentYear} Rushabh Gandhi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}