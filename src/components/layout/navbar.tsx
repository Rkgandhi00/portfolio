// src/components/cosmic-navigation.tsx
"use client"

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CosmicNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // Set mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDarkTheme = theme === 'dark';
  
  // Show navigation based on page and timing
  useEffect(() => {
    if (pathname === '/') {
      // On homepage, show after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // On other pages, show immediately
      setIsVisible(true);
    }
  }, [pathname]);
  
  // Hide nav on scroll down, show on scroll up or at top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNav(false);
        // Close mobile menu when scrolling down
        setIsOpen(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track desktop/mobile
  useEffect(() => {
    const checkDesktop = () => {
      const isDesktopView = window.innerWidth >= 768;
      setIsDesktop(isDesktopView);
      // Close mobile menu if switching to desktop
      if (isDesktopView && isOpen) {
        setIsOpen(false);
      }
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, [isOpen]);
  
  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/blog', label: 'Blog' },
  ];
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!mounted || !isVisible) {
    return null;
  }
  
  return (
    <>
      {/* Mobile menu button - Only show on mobile when nav should be visible */}
      <AnimatePresence>
        {!isDesktop && showNav && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-12 right-6 z-50"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                isDarkTheme 
                  ? 'bg-gray-900/50 text-blue-300 border border-gray-700/50' 
                  : 'bg-white/90 text-orange-700 border border-orange-300/80 shadow-lg'
              } backdrop-blur-md hover:scale-110 active:scale-95`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop navigation - Only show on desktop when nav should be visible */}
      <AnimatePresence>
        {isDesktop && showNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed top-6 right-6 z-50 flex items-center"
          >
            <div className={`flex items-center space-x-1 px-6 py-3 rounded-full transition-all duration-300 ${
              isDarkTheme 
                ? 'bg-gray-900/20 border border-gray-700/30' 
                : 'bg-white/90 border border-orange-300/50 shadow-lg'
            } backdrop-blur-md hover:backdrop-blur-lg`}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      pathname === link.href 
                        ? isDarkTheme 
                          ? 'bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/20' 
                          : 'bg-orange-500/20 text-orange-800 shadow-lg shadow-orange-500/20'
                        : isDarkTheme
                          ? 'text-gray-300 hover:text-blue-300 hover:bg-gray-800/30'
                          : 'text-gray-800 hover:text-orange-700 hover:bg-orange-100/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Theme toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={toggleTheme}
                  className={`ml-2 p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                    isDarkTheme 
                      ? 'bg-gray-800/50 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300' 
                      : 'bg-orange-200/80 text-slate-800 hover:bg-orange-300/80 hover:text-slate-900'
                  }`}
                  aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isDarkTheme ? 'sun' : 'moon'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile menu - Only show on mobile */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed top-0 right-0 bottom-0 w-80 max-w-full z-50 ${
                isDarkTheme 
                  ? 'bg-gray-900/95 border-l border-gray-700/50' 
                  : 'bg-white/95 border-l border-orange-300/50'
              } backdrop-blur-md flex flex-col pb-28`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-current/10">
                <div className="flex items-center justify-between">
                  <h2 className={`text-xl font-bold ${
                    isDarkTheme ? 'text-white' : 'text-gray-900'
                  }`}>
                    Menu
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkTheme 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Navigation links */}
              <div className="flex-1 p-6">
                <nav className="space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                          pathname === link.href 
                            ? isDarkTheme 
                              ? 'bg-blue-500/20 text-blue-300 border-l-4 border-blue-400' 
                              : 'bg-orange-500/20 text-orange-800 border-l-4 border-orange-600'
                            : isDarkTheme 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                              : 'text-gray-800 hover:text-gray-900 hover:bg-orange-100/50'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
              
              {/* Footer with theme toggle */}
              <div className="p-6 border-t border-current/10">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  onClick={toggleTheme}
                  className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    isDarkTheme 
                      ? 'bg-gray-800/50 text-yellow-400 hover:bg-yellow-400/10' 
                      : 'bg-orange-200/80 text-slate-800 hover:bg-orange-300/80'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isDarkTheme ? 'sun' : 'moon'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.div>
                  </AnimatePresence>
                  <span>Switch to {isDarkTheme ? 'Light' : 'Dark'} Mode</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}