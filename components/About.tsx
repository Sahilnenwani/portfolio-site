'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Folder, Building, Code, MapPin, GraduationCap, Zap, Coffee, Rocket } from 'lucide-react';
import { personalInfo, stats, education, certifications } from '@/lib/data';
import AnimatedCounter from './AnimatedCounter';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  folder: Folder,
  building: Building,
  code: Code,
};

const funFacts = [
  { icon: Coffee, text: 'Powered by coffee', color: 'text-amber-600' },
  { icon: Rocket, text: 'Always learning', color: 'text-purple-600' },
  { icon: Zap, text: 'Fast problem solver', color: 'text-yellow-500' },
];

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
      {/* Section divider wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(241, 245, 249, 0.5)"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="h-1 w-12 bg-gradient-to-r from-accent-primary to-accent-tertiary rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.5 }}
            />
            <span className="text-accent-primary font-medium uppercase tracking-wider text-sm">About Me</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
            Crafting Digital <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl">
            Backend engineering with a focus on distributed systems and cloud architecture.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {personalInfo.bio.split('\n\n')[0]}
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                {personalInfo.bio.split('\n\n')[1]}
              </p>
            </div>

            {/* Location Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-accent-primary" />
              <span className="text-sm font-medium">{personalInfo.location}</span>
            </motion.div>

            {/* Fun facts */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-4">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={fact.text}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <fact.icon className={`w-4 h-4 ${fact.color}`} />
                  <span className="text-sm text-slate-600">{fact.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Animated Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatedCounter value={stat.value} label={stat.label} />
                </motion.div>
              ))}
            </motion.div>

            {/* Education & Certs with timeline */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-gold/10 to-transparent rounded-bl-full" />
              
              <h3 className="text-lg font-heading font-semibold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
                <motion.div 
                  className="p-2 bg-accent-gold/10 rounded-lg"
                  whileHover={{ rotate: 12 }}
                >
                  <GraduationCap className="w-5 h-5 text-accent-gold" />
                </motion.div>
                Education & Certifications
              </h3>
              
              <div className="space-y-4 relative z-10">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-accent-primary rounded-full mt-2 group-hover:scale-125 transition-transform" />
                      {index < education.length - 1 && (
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent-primary to-accent-tertiary" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h4 className="font-medium text-slate-800 group-hover:text-accent-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-slate-500">{edu.institution}</p>
                      <p className="text-xs text-slate-400 mt-1">{edu.period}</p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="border-t border-slate-100 my-4" />
                
                {certifications.map((cert, index) => (
                  <motion.div 
                    key={`cert-${index}`} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-gold" />
                    <span className="text-sm text-slate-600">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
