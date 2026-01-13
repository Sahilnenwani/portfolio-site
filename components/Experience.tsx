'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  ChevronDown, 
  Calendar,
  Building2
} from 'lucide-react';
import { experience } from '@/lib/data';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-12 md:py-16 relative" ref={ref}>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cleaner Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-terminal-amber font-mono text-sm tracking-wider uppercase mb-2 block">
            03. Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Professional <span className="text-zinc-500">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Cleaner Timeline Line */}
          <div className="absolute left-[19px] md:left-8 top-0 bottom-0 w-px bg-border" />

          {/* Experience Cards */}
          <div className="space-y-6">
            {experience.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[11px] md:left-[23px] top-6 z-10">
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-background transition-colors duration-300 ${
                    expandedId === job.id ? 'bg-terminal-amber' : 'bg-zinc-700'
                  }`} />
                </div>

                {/* Card */}
                <div
                  className={`bg-background-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                    expandedId === job.id
                      ? 'border-terminal-amber/50 shadow-lg shadow-terminal-amber/5'
                      : 'border-border hover:border-terminal-amber/30'
                  }`}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => toggleExpand(job.id)}
                    className="w-full p-6 md:p-8 text-left flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-terminal-amber transition-colors">
                          {job.role}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium bg-terminal-amber/10 text-terminal-amber rounded-full border border-terminal-amber/20">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </span>
                        <span className="hidden sm:inline text-zinc-700">•</span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {job.period}
                        </span>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
                      expandedId === job.id ? 'bg-terminal-amber/10 text-terminal-amber rotate-180' : 'bg-background-light text-zinc-400 group-hover:bg-terminal-amber/10 group-hover:text-terminal-amber'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedId === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pt-0">
                          <div className="border-t border-border mb-6" />
                          
                          <div className="space-y-4">
                            {job.achievements.map((achievement, achIndex) => (
                              <motion.div
                                key={achIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: achIndex * 0.1 }}
                                className="relative pl-6"
                              >
                                <div className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-terminal-amber/50" />
                                <h4 className="font-medium text-white mb-1 text-lg">
                                  {achievement.title}
                                </h4>
                                <p className="text-zinc-400 leading-relaxed">
                                  {achievement.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
