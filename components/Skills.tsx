'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Cloud, 
  Wrench,
  ChevronRight
} from 'lucide-react';
import { skills } from '@/lib/data';
import { Sparkles } from 'lucide-react';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  frameworks: Layers,
  databases: Database,
  cloud: Cloud,
  tools: Wrench,
  ai: Sparkles,
};

const categoryColors: Record<string, { gradient: string; iconBg: string; text: string; border: string }> = {
  languages: { 
    gradient: 'from-indigo-500 to-purple-500',
    iconBg: 'bg-indigo-500',
    text: 'text-indigo-600',
    border: 'border-indigo-200 hover:border-indigo-400',
  },
  frameworks: { 
    gradient: 'from-teal-500 to-cyan-500',
    iconBg: 'bg-teal-500',
    text: 'text-teal-600',
    border: 'border-teal-200 hover:border-teal-400',
  },
  databases: { 
    gradient: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500',
    text: 'text-amber-600',
    border: 'border-amber-200 hover:border-amber-400',
  },
  cloud: { 
    gradient: 'from-orange-500 to-red-500',
    iconBg: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-200 hover:border-orange-400',
  },
  tools: { 
    gradient: 'from-rose-500 to-pink-500',
    iconBg: 'bg-rose-500',
    text: 'text-rose-600',
    border: 'border-rose-200 hover:border-rose-400',
  },
  ai: { 
    gradient: 'from-purple-500 to-violet-500',
    iconBg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-200 hover:border-purple-400',
  },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="skills" className="py-12 md:py-16 relative overflow-hidden" ref={ref}>
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-accent-tertiary/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-accent-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              className="h-1 w-12 bg-gradient-to-r from-accent-tertiary to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.5 }}
            />
            <span className="text-accent-tertiary font-medium uppercase tracking-wider text-sm">Tech Stack</span>
            <motion.div 
              className="h-1 w-12 bg-gradient-to-l from-accent-tertiary to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
            Skills & <span className="text-accent-tertiary">Technologies</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {Object.entries(skills).map(([key, category], index) => {
            const Icon = categoryIcons[key] || Code2;
            const colors = categoryColors[key] || categoryColors.languages;
            
            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className="group"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={`relative bg-white border-2 ${colors.border} rounded-2xl p-6 transition-all duration-300 overflow-hidden`}>
                  {/* Gradient top bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <motion.div 
                      className={`p-3 ${colors.iconBg} rounded-xl shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-lg">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-400">{category.items.length} technologies</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-default transition-all duration-300 ${
                          hoveredSkill === skill 
                            ? `bg-gradient-to-r ${colors.gradient} text-white shadow-md` 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + skillIndex * 0.03 }}
                        onHoverStart={() => setHoveredSkill(skill)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
