'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ children, className = '', speed = 0.5 }: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function RevealOnScroll({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0 
}: RevealOnScrollProps) {
  const directions = {
    up: { y: 80, x: 0 },
    down: { y: -80, x: 0 },
    left: { y: 0, x: 80 },
    right: { y: 0, x: -80 },
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        filter: 'blur(10px)',
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface TextSplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextSplitReveal({ text, className = '', delay = 0 }: TextSplitRevealProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0, rotateX: 90 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface MorphingBackgroundProps {
  className?: string;
}

export function MorphingBackground({ className = '' }: MorphingBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Morphing blob 1 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          left: '10%',
          top: '20%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          borderRadius: ['50%', '40%', '50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Morphing blob 2 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
          filter: 'blur(50px)',
          right: '10%',
          bottom: '20%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -50, 0],
          borderRadius: ['50%', '35%', '50%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(99, 102, 241, 0.03) 25%, transparent 50%, rgba(20, 184, 166, 0.03) 75%, transparent 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary via-purple-500 to-accent-tertiary origin-left z-50 ${className}`}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
