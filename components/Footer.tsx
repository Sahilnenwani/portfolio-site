'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp, Terminal, Twitter, BookOpen } from 'lucide-react';
import { personalInfo, navLinks } from '@/lib/data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' },
    { icon: BookOpen, href: personalInfo.medium, label: 'Medium' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-border bg-background-light/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 grid md:grid-cols-3 gap-6">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-terminal-green" />
              <span className="font-mono text-lg font-bold">
                <span className="text-terminal-green">sahil</span>
                <span className="text-terminal-cyan">@</span>
                <span className="text-zinc-400">dev</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs">
              Full Stack Developer specializing in backend systems, 
              distributed architectures, and cloud solutions.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background-card border border-border rounded-lg text-zinc-500 hover:text-terminal-green hover:border-terminal-green/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm text-terminal-cyan">
              {'>'} Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-zinc-500 hover:text-terminal-green transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-terminal-purple">$</span>
                    cd ~/{link.name.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Terminal Command */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm text-terminal-cyan">
              {'>'} Connect
            </h3>
            <div className="bg-background-card border border-border rounded-lg p-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <span className="text-terminal-green">➜</span>
                <span className="text-terminal-cyan">~</span>
                <span>npx sahil-nenwani</span>
              </div>
              <div className="text-zinc-600 space-y-1">
                <p>
                  <span className="text-terminal-green">✓</span> Open to opportunities
                </p>
                <p>
                  <span className="text-terminal-green">✓</span> Available for freelance
                </p>
                <p>
                  <span className="text-terminal-green">✓</span> Let&apos;s collaborate!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm font-mono flex items-center gap-2">
            <span>© {currentYear}</span>
            <span className="text-terminal-green">{personalInfo.name}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-terminal-red inline" /> using Next.js
            </span>
          </p>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-background-card border border-border rounded-lg text-zinc-500 hover:text-terminal-green hover:border-terminal-green/50 transition-all duration-300 font-mono text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4" />
            <span>scroll_to_top()</span>
          </motion.button>
        </div>

        {/* ASCII Art Easter Egg */}
        <div className="py-4 text-center font-mono text-xs text-zinc-700 select-none">
          <pre className="inline-block text-left">
{`/* Thanks for visiting! */`}
          </pre>
        </div>
      </div>
    </footer>
  );
}

