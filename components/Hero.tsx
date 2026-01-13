'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDown, ChevronRight, Twitter, BookOpen } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Hero() {
  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Twitter,
      href: personalInfo.twitter,
      label: 'Twitter',
    },
    {
      icon: BookOpen,
      href: personalInfo.medium,
      label: 'Medium',
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Subtle Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-tertiary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-background-card border border-border rounded-full"
          >
            <span className="w-2 h-2 bg-accent-tertiary rounded-full animate-pulse" />
            <span className="text-sm text-slate-400">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Title & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl text-accent-primary font-medium mb-3">
              {personalInfo.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Building scalable backend systems with <span className="text-white font-medium">Node.js</span>, <span className="text-white font-medium">NestJS</span> & <span className="text-white font-medium">Go</span>. 
            Passionate about distributed architectures and cloud solutions.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-background-card border border-border rounded-lg text-sm text-slate-400 transition-all duration-300 hover:border-accent-primary hover:text-white hover:bg-accent-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <social.icon className="w-4 h-4" />
                <span>{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              className="btn-primary flex items-center gap-2"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View My Work</span>
              <ChevronRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1wL3GRMp3hxa59iw3WT7yGqmBTwxBb_kC"
              target="_blank"
              className="btn-secondary flex items-center gap-2"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center"
          >
            <motion.a
              href="#about"
              className="flex flex-col items-center gap-2 text-slate-500 hover:text-accent-primary transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <ArrowDown className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
