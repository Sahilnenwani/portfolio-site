'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp, Twitter, BookOpen } from 'lucide-react';
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">SN</span>
              </div>
              <span className="font-heading text-lg font-semibold text-white">
                Sahil Nenwani
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
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
                  className="p-2 bg-background-card border border-border rounded-lg text-slate-500 hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300"
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
            <h3 className="text-sm font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-accent-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">
              Connect
            </h3>
            <div className="bg-background-card border border-border rounded-xl p-4">
              <div className="space-y-2 text-sm text-slate-500">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-tertiary" />
                  Open to opportunities
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-tertiary" />
                  Available for freelance
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-tertiary" />
                  Let&apos;s collaborate!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-2">
            <span>© {currentYear}</span>
            <span className="text-accent-primary">{personalInfo.name}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-accent-rose inline" /> using Next.js
            </span>
          </p>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-background-card border border-border rounded-lg text-slate-500 hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300 text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
