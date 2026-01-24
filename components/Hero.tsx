'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDown, ChevronRight, Twitter, BookOpen, Sparkles, Zap, Heart } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import TypewriterText from './TypewriterText';
import { Floating } from './animations';

export default function Hero() {
  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github,
      label: 'GitHub',
      color: 'hover:bg-slate-900 hover:text-white hover:border-slate-900',
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin,
      label: 'LinkedIn',
      color: 'hover:bg-blue-600 hover:text-white hover:border-blue-600',
    },
    {
      icon: Twitter,
      href: personalInfo.twitter,
      label: 'Twitter',
      color: 'hover:bg-sky-500 hover:text-white hover:border-sky-500',
    },
    {
      icon: BookOpen,
      href: personalInfo.medium,
      label: 'Medium',
      color: 'hover:bg-green-600 hover:text-white hover:border-green-600',
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
      color: 'hover:bg-accent-primary hover:text-white hover:border-accent-primary',
    },
  ];

  // Stagger animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Decorative gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-tertiary/5" />
        
        {/* Animated floating decorative elements */}
        <Floating duration={6} distance={20} className="absolute top-1/4 -left-20">
          <div className="w-80 h-80 bg-accent-primary/10 rounded-full blur-[100px]" />
        </Floating>
        <Floating duration={8} distance={15} className="absolute bottom-1/4 -right-20">
          <div className="w-80 h-80 bg-accent-tertiary/10 rounded-full blur-[100px]" />
        </Floating>
        
        {/* Floating icons */}
        <Floating duration={4} distance={8} className="absolute top-1/3 left-[15%] opacity-20">
          <Zap className="w-8 h-8 text-accent-gold" />
        </Floating>
        <Floating duration={5} distance={10} className="absolute top-1/2 right-[10%] opacity-20">
          <Heart className="w-6 h-6 text-accent-rose" />
        </Floating>
        <Floating duration={3.5} distance={6} className="absolute bottom-1/3 left-[20%] opacity-20">
          <Sparkles className="w-5 h-5 text-accent-primary" />
        </Floating>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Content with staggered animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Greeting Badge with sparkle */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-gradient-to-r from-accent-primary/10 to-accent-tertiary/10 backdrop-blur-sm border border-accent-primary/20 rounded-full shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-accent-gold" />
            </motion.div>
            <span className="text-sm text-slate-700 font-medium">Open to new opportunities</span>
            <motion.span 
              className="w-2 h-2 bg-accent-tertiary rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Name with animation */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-4"
          >
            <span className="text-slate-900">Hi, I&apos;m </span>
            <motion.span
              className="gradient-text inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {personalInfo.name}
            </motion.span>
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            >
              👋
            </motion.span>
          </motion.h1>

          {/* Typewriter Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              <TypewriterText />
            </h2>
          </motion.div>

          {/* Tagline with highlight */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-4"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Bio with tech highlights */}
          <motion.p
            variants={itemVariants}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Building scalable backend systems with{' '}
            <motion.span 
              className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-medium"
              whileHover={{ scale: 1.1, rotate: -2 }}
            >
              Node.js
            </motion.span>
            ,{' '}
            <motion.span 
              className="inline-flex items-center px-2 py-0.5 bg-red-50 text-red-700 rounded font-medium"
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              NestJS
            </motion.span>{' '}
            &{' '}
            <motion.span 
              className="inline-flex items-center px-2 py-0.5 bg-sky-50 text-sky-700 rounded font-medium"
              whileHover={{ scale: 1.1, rotate: -2 }}
            >
              Go
            </motion.span>
            . Passionate about distributed architectures and cloud solutions.
          </motion.p>

          {/* Social Links with staggered animation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 transition-all duration-300 shadow-sm ${social.color}`}
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -5, scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
                <span className="font-medium">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-primary via-purple-500 to-accent-primary bg-[length:200%_100%]"
                animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10">View My Work</span>
              <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1wL3GRMp3hxa59iw3WT7yGqmBTwxBb_kC"
              target="_blank"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:border-accent-primary hover:text-accent-primary transition-all shadow-sm overflow-hidden"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator with enhanced animation */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.a
              href="#about"
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-accent-primary transition-colors group"
            >
              <motion.span 
                className="text-xs uppercase tracking-widest font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to explore
              </motion.span>
              <motion.div
                className="p-2 border border-slate-200 rounded-full group-hover:border-accent-primary transition-colors"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
