'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  Github, 
  Star, 
  FolderGit2,
  ArrowUpRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { projects } from '@/lib/data';

// Project card gradient colors
const cardGradients = [
  { bg: 'from-indigo-500/10 to-purple-500/10', accent: 'indigo' },
  { bg: 'from-orange-500/10 to-amber-500/10', accent: 'orange' },
  { bg: 'from-teal-500/10 to-cyan-500/10', accent: 'teal' },
  { bg: 'from-rose-500/10 to-pink-500/10', accent: 'rose' },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Parallax effect for section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <section id="projects" className="py-12 md:py-16 relative overflow-hidden" ref={ref}>
      {/* Parallax background decoration */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-secondary/5 rounded-full blur-[100px]" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="h-1 w-12 bg-gradient-to-r from-accent-secondary to-accent-gold rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.span 
              className="text-accent-secondary font-medium uppercase tracking-wider text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="w-4 h-4" />
              My Work
            </motion.span>
          </div>
          <motion.h2 
            className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured <span className="text-accent-secondary">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-slate-600 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A selection of projects that showcase my skills in backend development and system design.
          </motion.p>
        </motion.div>

        {/* Projects Grid with 3D perspective */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project, index) => {
            const gradient = cardGradients[index % cardGradients.length];
            
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card with 3D hover effect */}
                <motion.div 
                  className="relative h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                  whileHover={{ 
                    y: -8,
                    rotateY: 3,
                    rotateX: -3,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* Top gradient accent with animation */}
                  <motion.div 
                    className={`h-2 bg-gradient-to-r ${gradient.bg}`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    style={{ transformOrigin: 'left' }}
                  />
                  
                  {/* Card Content */}
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div 
                        className="p-4 bg-gradient-to-br from-accent-secondary/10 to-accent-gold/10 rounded-2xl"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <FolderGit2 className="w-7 h-7 text-accent-secondary" />
                      </motion.div>
                      <div className="flex items-center gap-3">
                        {project.stars && (
                          <motion.span 
                            className="flex items-center gap-1.5 text-sm text-slate-400 bg-slate-50 px-2 py-1 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 20, 0] }}
                              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                            >
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            </motion.div>
                            {project.stars}
                          </motion.span>
                        )}
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>

                    {/* Project Name with hover effect */}
                    <motion.h3 
                      className="text-2xl font-heading font-bold text-slate-900 mb-3 group-hover:text-accent-secondary transition-colors"
                    >
                      {project.name}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-slate-500 text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack with staggered animation */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg border border-slate-200 cursor-default"
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                          transition={{ delay: 0.5 + index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: 'rgb(99, 102, 241)', 
                            color: 'white',
                            borderColor: 'rgb(99, 102, 241)',
                            y: -3,
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Hover overlay gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-accent-secondary/5 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Projects Link with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Sahilnenwani?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-secondary to-accent-gold text-white rounded-xl font-semibold shadow-lg shadow-accent-secondary/25 overflow-hidden relative"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
            <Layers className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Explore All Projects</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
