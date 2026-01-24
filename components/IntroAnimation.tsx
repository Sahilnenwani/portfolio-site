'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Counter animation
    const counterInterval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Phase transitions
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => {
        setPhase(5);
        onComplete();
      }, 3200),
    ];

    return () => {
      clearInterval(counterInterval);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
                'linear-gradient(135deg, #1a1a3e 0%, #2d1b69 50%, #1a1a3e 100%)',
                'linear-gradient(135deg, #2d1b69 0%, #4c1d95 50%, #2d1b69 100%)',
                'linear-gradient(135deg, #4c1d95 0%, #6366f1 50%, #4c1d95 100%)',
              ],
            }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />

          {/* Grid lines animation */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                style={{ top: `${(i + 1) * 10}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent"
                style={{ left: `${(i + 1) * 10}%` }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            ))}
          </div>

          {/* Scanning line effect */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          {/* Central content */}
          <div className="relative z-10 text-center">
            {/* Logo container with glitch effect */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                type: 'spring', 
                stiffness: 200,
                delay: 0.2
              }}
            >
              {/* Glowing ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-indigo-400/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Second ring */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-purple-400/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: -360,
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Main logo */}
              <motion.div
                className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl relative overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(99, 102, 241, 0.4)',
                    '0 0 60px rgba(139, 92, 246, 0.6)',
                    '0 0 30px rgba(99, 102, 241, 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="text-white font-heading font-bold text-5xl relative z-10">SN</span>
              </motion.div>
            </motion.div>

            {/* Text animations with stagger */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-white font-heading font-bold text-4xl md:text-5xl tracking-tight"
                initial={{ y: 100, opacity: 0 }}
                animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              >
                Sahil Nenwani
              </motion.h1>
            </div>

            {/* Role text with typewriter */}
            <motion.div
              className="mt-4 h-8"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
            >
              <motion.p 
                className="text-indigo-300 text-xl font-medium"
                initial={{ width: 0 }}
                animate={phase >= 2 ? { width: 'auto' } : {}}
                transition={{ duration: 0.8 }}
              >
                Full Stack Developer
              </motion.p>
            </motion.div>

            {/* Loading progress */}
            <motion.div
              className="mt-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
            >
              {/* Progress bar container */}
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${counter}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Percentage counter */}
              <motion.div
                className="text-white/60 font-mono text-sm tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                LOADING {counter}%
              </motion.div>
            </motion.div>

            {/* Tech keywords flying in */}
            <motion.div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
            >
              {['Node.js', 'NestJS', 'Go', 'AWS', 'Kafka', 'K8s'].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="absolute text-white/20 text-sm font-mono"
                  style={{
                    left: `${10 + (i % 3) * 30}%`,
                    top: `${20 + Math.floor(i / 3) * 40}%`,
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={phase >= 3 ? { opacity: 0.3, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Exit transition - screen wipe */}
          <motion.div
            className="absolute inset-0 bg-white origin-bottom"
            initial={{ scaleY: 0 }}
            animate={phase >= 4 ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
