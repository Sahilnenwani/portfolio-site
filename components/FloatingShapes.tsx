'use client';

import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(99, 102, 241, 0.1)' }}>
                <animate attributeName="stop-color" 
                  values="rgba(99, 102, 241, 0.1);rgba(20, 184, 166, 0.1);rgba(99, 102, 241, 0.1)" 
                  dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: 'rgba(249, 115, 22, 0.1)' }}>
                <animate attributeName="stop-color" 
                  values="rgba(249, 115, 22, 0.1);rgba(139, 92, 246, 0.1);rgba(249, 115, 22, 0.1)" 
                  dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)" />
        </svg>
      </div>


      {/* Primary Indigo Blob */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Teal Blob */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -25, 35, 0],
          y: [0, 30, -25, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Orange Blob */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 25, -35, 0],
          scale: [1, 1.05, 0.92, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Geometric shapes - floating triangles and circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        >
          {i % 2 === 0 ? (
            <div 
              className="w-4 h-4 border-2 border-accent-primary/30 rotate-45"
            />
          ) : (
            <div 
              className="w-3 h-3 rounded-full border-2 border-accent-tertiary/30"
            />
          )}
        </motion.div>
      ))}

      {/* Dotted grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0%"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line
          x1="20%"
          y1="0%"
          x2="80%"
          y2="100%"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
