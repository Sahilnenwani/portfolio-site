'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Folder, Building, Code, MapPin, GraduationCap } from 'lucide-react';
import { personalInfo, stats, education, certifications } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  folder: Folder,
  building: Building,
  code: Code,
};

export default function About() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-12 md:py-16 relative" ref={ref}>
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cleaner Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-terminal-green font-mono text-sm tracking-wider uppercase mb-2 block">
            01. About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Backend Engineering <br />
            <span className="text-zinc-500">Distributed Systems & Cloud</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-6 items-start"
        >
          {/* Left Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-400 text-lg leading-relaxed mb-6 font-body">
                {personalInfo.bio.split('\n\n')[0]}
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed font-body">
                {personalInfo.bio.split('\n\n')[1]}
              </p>
            </div>

            {/* Location Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-background-light border border-border rounded-full text-zinc-400"
            >
              <MapPin className="w-4 h-4 text-terminal-green" />
              <span className="text-sm font-medium">{personalInfo.location}</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Stats Grid - Modern Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = iconMap[stat.icon];
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="group bg-background-card border border-border p-6 rounded-2xl hover:border-terminal-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/5"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-background-light rounded-lg group-hover:bg-terminal-green/10 transition-colors">
                        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-terminal-green transition-colors" />
                      </div>
                      <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
                    </div>
                    <div className="text-3xl font-heading font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Education & Certs - Minimalist List */}
            <motion.div
              variants={itemVariants}
              className="bg-background-card border border-border rounded-2xl p-8"
            >
              <h3 className="text-lg font-heading font-semibold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-zinc-500" />
                Education & Certifications
              </h3>
              
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-1 h-full min-h-[40px] bg-border group-hover:bg-terminal-green transition-colors rounded-full" />
                    <div>
                      <h4 className="font-medium text-white group-hover:text-terminal-green transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-zinc-500">{edu.institution}</p>
                      <p className="text-xs text-zinc-600 mt-1">{edu.period}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-border my-4" />
                
                {certifications.map((cert, index) => (
                  <div key={`cert-${index}`} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
                    <span className="text-sm text-zinc-400">{cert.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
