'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Reveal text with a sliding mask effect
export function TextReveal({ children, delay = 0, className = '' }: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  duration?: number;
}

// Fade in with direction
export function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '',
  duration = 0.6 
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Scale in with bounce
export function ScaleIn({ children, delay = 0, className = '' }: ScaleInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

// Container for staggered children animations
export function StaggerContainer({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Child item for stagger container
export function StaggerItem({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
          }
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

// Magnetic hover effect
export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

// Card with glow effect on hover
export function GlowCard({ 
  children, 
  className = '', 
  glowColor = 'rgba(99, 102, 241, 0.4)' 
}: GlowCardProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{ background: glowColor }}
      />
      <div className="relative bg-white rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
}

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

// Continuous floating animation
export function Floating({ 
  children, 
  className = '', 
  duration = 3,
  distance = 10 
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
}

// Rotate based on scroll
export function RotateOnScroll({ children, className = '' }: RotateOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ rotate: 0 }}
      whileInView={{ rotate: 360 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

interface PulseProps {
  children: ReactNode;
  className?: string;
}

// Subtle pulse animation
export function Pulse({ children, className = '' }: PulseProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

interface ShimmerTextProps {
  text: string;
  className?: string;
}

// Shimmer effect on text
export function ShimmerText({ text, className = '' }: ShimmerTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 3,
        }}
        style={{ mixBlendMode: 'overlay' }}
      />
    </motion.span>
  );
}
