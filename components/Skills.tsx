'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Layers, 
  Database, 
  Cloud, 
  Wrench
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

const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  languages: { 
    border: 'border-accent-primary/20 group-hover:border-accent-primary/50', 
    bg: 'bg-accent-primary/10',
    text: 'text-accent-primary'
  },
  frameworks: { 
    border: 'border-accent-tertiary/20 group-hover:border-accent-tertiary/50', 
    bg: 'bg-accent-tertiary/10',
    text: 'text-accent-tertiary'
  },
  databases: { 
    border: 'border-accent-gold/20 group-hover:border-accent-gold/50', 
    bg: 'bg-accent-gold/10',
    text: 'text-accent-gold'
  },
  cloud: { 
    border: 'border-accent-secondary/20 group-hover:border-accent-secondary/50', 
    bg: 'bg-accent-secondary/10',
    text: 'text-accent-secondary'
  },
  tools: { 
    border: 'border-accent-rose/20 group-hover:border-accent-rose/50', 
    bg: 'bg-accent-rose/10',
    text: 'text-accent-rose'
  },
  ai: { 
    border: 'border-purple-500/20 group-hover:border-purple-500/50', 
    bg: 'bg-purple-500/10',
    text: 'text-purple-400'
  },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative" ref={ref}>
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-light/30 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Skills & <span className="text-accent-tertiary">Technologies</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(skills).map(([key, category], index) => {
            const Icon = categoryIcons[key] || Code2;
            const colors = categoryColors[key] || categoryColors.languages;
            
            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className={`group relative bg-background-card border ${colors.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}
                whileHover={{ y: -5 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl ${colors.bg}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-lg">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="px-3 py-1.5 rounded-lg bg-background-light border border-border text-sm text-slate-400 group-hover:border-slate-600 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
