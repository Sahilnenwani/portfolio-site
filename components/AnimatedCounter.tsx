'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  label: string;
  suffix?: string;
}

export default function AnimatedCounter({ value, label, suffix = '' }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  // Extract number from value string (e.g., "3+" -> 3, "20+" -> 20)
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const hasPlus = value.includes('+');

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-2"
      >
        {count}
        {hasPlus && <span className="text-accent-primary">+</span>}
        {suffix && <span className="text-accent-primary">{suffix}</span>}
      </motion.div>
      <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
}
