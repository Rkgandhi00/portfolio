// src/components/cosmic-navigation.tsx
"use client"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CosmicNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
  const [isClientReady, setIsClientReady] = useState(false);
  
  // Set theme state after component mounts
  useEffect(() => {
    setIsDarkTheme(theme === 'dark');
    setIsClientReady(true);
  }, [theme]);
  
  // Show navigation after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/blog', label: 'Blog' },
  ];
  
  // If we're not on the home page, show navigation immediately
  useEffect(() => {
    if (pathname !== '/') {
      setIsVisible(true);
    }
  }, [pathname]);
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };
  
  if (!isClientReady) {
    return null;
  }
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Mobile menu button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 md:hidden"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-full cosmic-nav ${
                isDarkTheme ? 'text-blue-300' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-6 right-6 z-50 hidden md:flex items-center"
          >
            <div className="flex items-center space-x-1 px-4 py-2 rounded-full cosmic-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors nav-link ${
                    pathname === link.href 
                      ? isDarkTheme 
                        ? 'text-blue-300 font-semibold' 
                        : 'text-white font-semibold'
                      : isDarkTheme
                        ? 'text-gray-300 hover:text-blue-300'
                        : 'text-gray-100 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`ml-2 p-2 rounded-full ${
                  isDarkTheme 
                    ? 'bg-gray-800/50 text-gray-300' 
                    : 'bg-blue-800 text-white'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkTheme ? (
                  // Sun icon - Show in dark mode to switch to light
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  // Moon icon - Show in light mode to switch to dark
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 cosmic-nav flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-medium ${
                      pathname === link.href 
                        ? isDarkTheme 
                          ? 'text-blue-300' 
                          : 'text-white'
                        : isDarkTheme 
                          ? 'text-gray-300' 
                          : 'text-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Theme toggle button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <button
                  onClick={toggleTheme}
                  className={`mt-4 px-6 py-2 rounded-full flex items-center ${
                    isDarkTheme 
                      ? 'bg-gray-800/50 text-gray-300' 
                      : 'bg-blue-800 text-white'
                  }`}
                >
                  {isDarkTheme ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                      Switch to Sun
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      Switch to Moon
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}