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

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  frameworks: Layers,
  databases: Database,
  cloud: Cloud,
  tools: Wrench,
};

const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  languages: { 
    border: 'border-terminal-green/20 group-hover:border-terminal-green/50', 
    bg: 'bg-terminal-green/10',
    text: 'text-terminal-green'
  },
  frameworks: { 
    border: 'border-terminal-cyan/20 group-hover:border-terminal-cyan/50', 
    bg: 'bg-terminal-cyan/10',
    text: 'text-terminal-cyan'
  },
  databases: { 
    border: 'border-terminal-amber/20 group-hover:border-terminal-amber/50', 
    bg: 'bg-terminal-amber/10',
    text: 'text-terminal-amber'
  },
  cloud: { 
    border: 'border-terminal-purple/20 group-hover:border-terminal-purple/50', 
    bg: 'bg-terminal-purple/10',
    text: 'text-terminal-purple'
  },
  tools: { 
    border: 'border-terminal-pink/20 group-hover:border-terminal-pink/50', 
    bg: 'bg-terminal-pink/10',
    text: 'text-terminal-pink'
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
    <section id="skills" className="py-12 md:py-16 relative" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cleaner Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-terminal-cyan font-mono text-sm tracking-wider uppercase mb-2 block">
            02. Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Technical <span className="text-zinc-500">Arsenal</span>
          </h2>
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

                {/* Skills List - Clean Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="px-3 py-1.5 rounded-lg bg-background-light border border-border text-sm text-zinc-400 group-hover:border-zinc-600 transition-colors cursor-default"
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
