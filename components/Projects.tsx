'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  Github, 
  Star, 
  FolderGit2,
  ArrowUpRight
} from 'lucide-react';
import { projects } from '@/lib/data';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative" ref={ref}>
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
            Featured <span className="text-accent-secondary">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            A selection of projects that showcase my skills in backend development and system design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative h-full"
            >
              <div className="relative h-full bg-background-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent-secondary/30 hover:shadow-xl hover:shadow-accent-secondary/5 flex flex-col">
                
                {/* Card Content */}
                <div className="p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-background-light rounded-xl group-hover:bg-accent-secondary/10 transition-colors">
                      <FolderGit2 className="w-6 h-6 text-accent-secondary" />
                    </div>
                    <div className="flex gap-4">
                      {project.stars && (
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </span>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-accent-secondary transition-colors">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-base leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-slate-500 bg-background-light rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Sahilnenwani?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-background-light border border-border rounded-full font-medium text-slate-400 hover:text-white hover:border-accent-secondary transition-all duration-300 hover:shadow-lg hover:shadow-accent-secondary/10"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
