'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDown, ChevronRight, Twitter, BookOpen } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import MatrixRain, { GridBackground } from './MatrixRain';

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  
  const command = 'whoami';

  useEffect(() => {
    // Start typing the command after a short delay
    const startDelay = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= command.length) {
          setTypedCommand(command.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          // Show output after command is typed
          setTimeout(() => {
            setShowOutput(true);
            setTimeout(() => setShowContent(true), 300);
          }, 500);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }, 800);

    return () => clearTimeout(startDelay);
  }, []);

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github,
      label: 'GitHub',
      color: 'hover:text-white hover:bg-zinc-800',
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-[#0077b5] hover:bg-[#0077b5]/10',
    },
    {
      icon: Twitter,
      href: personalInfo.twitter,
      label: 'Twitter',
      color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10',
    },
    {
      icon: BookOpen,
      href: personalInfo.medium,
      label: 'Medium',
      color: 'hover:text-terminal-green hover:bg-terminal-green/10',
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
      color: 'hover:text-terminal-amber hover:bg-terminal-amber/10',
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Effects - More subtle now */}
      <MatrixRain opacity={0.02} speed={0.5} density={0.01} />
      <GridBackground />
      
      {/* Reduced Opacity Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terminal-green/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-purple/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Modern Glass Card instead of Heavy Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-background-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Cleaner Header */}
          <div className="flex items-center gap-2 px-6 py-4 bg-background-light/50 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-xs text-zinc-500">
                sahil@portfolio ~
              </span>
            </div>
          </div>

          {/* Clean Content Area */}
          <div className="p-8 md:p-12 font-mono">
            {/* Command Line */}
            <div className="flex items-center gap-3 text-sm md:text-base mb-8">
              <span className="text-terminal-green">➜</span>
              <span className="text-terminal-cyan">~</span>
              <span className="text-zinc-400">{typedCommand}</span>
              {!showOutput && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="text-terminal-green"
                >
                  ▋
                </motion.span>
              )}
            </div>

            {/* Output */}
            {showOutput && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Name - Cleaner Typography */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-7xl font-heading font-bold tracking-tight"
                >
                  <span className="text-white">Hello, I&apos;m </span>
                  <span className="text-terminal-green">{personalInfo.name}</span>
                </motion.h1>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-3 text-lg md:text-2xl text-zinc-400"
                >
                  <span className="text-terminal-cyan font-medium">{personalInfo.title}</span>
                  <span className="hidden md:inline text-zinc-700">•</span>
                  <span className="text-zinc-500">{personalInfo.tagline}</span>
                </motion.div>

                {/* Bio Preview - Better readability */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed font-body"
                >
                  Building scalable backend systems with <span className="text-zinc-200">Node.js</span>, <span className="text-zinc-200">NestJS</span> & <span className="text-zinc-200">Go</span>. 
                  Passionate about distributed architectures and cloud solutions.
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Content Below Terminal */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 space-y-4"
          >
            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-background-card border border-border rounded-full font-medium text-sm text-zinc-400 transition-all duration-300 hover:border-terminal-green/50 hover:text-white hover:shadow-lg hover:shadow-terminal-green/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <social.icon className="w-4 h-4" />
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons - Professional Look */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#projects"
                className="btn-primary flex items-center gap-2 font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="btn-secondary flex items-center gap-2 font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </motion.a>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              className="flex justify-center pt-6"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <a
                href="#about"
                className="flex flex-col items-center gap-2 text-zinc-500 hover:text-terminal-green transition-colors opacity-50 hover:opacity-100"
              >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
