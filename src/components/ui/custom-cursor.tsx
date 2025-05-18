// components/ui/custom-cursor.tsx
"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop devices
    if (window.matchMedia('(pointer: fine)').matches) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      };

      const handleMouseLeave = () => {
        setIsVisible(false);
      };

      const handleMouseEnter = () => {
        setIsVisible(true);
      };

      // Handle links and buttons
      const handleLinkHoverStart = () => {
        setIsHovering(true);
      };

      const handleLinkHoverEnd = () => {
        setIsHovering(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      // Add event listeners to all clickable elements
      const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], .clickable');
      
      clickableElements.forEach(element => {
        element.addEventListener('mouseenter', handleLinkHoverStart);
        element.addEventListener('mouseleave', handleLinkHoverEnd);
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        
        clickableElements.forEach(element => {
          element.removeEventListener('mouseenter', handleLinkHoverStart);
          element.removeEventListener('mouseleave', handleLinkHoverEnd);
        });
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`custom-cursor ${isHovering ? 'link-hover' : ''}`}>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 800,
          damping: 20,
        }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
          stiffness: 200,
          damping: 20,
          opacity: { duration: 0.2 },
        }}
      />
    </div>
  );
}