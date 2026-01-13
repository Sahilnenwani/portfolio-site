'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  Send, 
  Mail, 
  Github, 
  Linkedin,
  Twitter,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, just simulate success
    setStatus('success');

    // Reset form after success
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  const socialLinks = [
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email', value: personalInfo.email },
    { icon: Github, href: personalInfo.github, label: 'GitHub', value: 'Sahilnenwani' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn', value: 'sahilnenwani' },
    { icon: Twitter, href: personalInfo.twitter, label: 'Twitter', value: '@NenwaniSah7402' },
    { icon: BookOpen, href: personalInfo.medium, label: 'Medium', value: '@SahilNenwani' },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative" ref={ref}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Get In <span className="text-accent-primary">Touch</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-background-card border border-border rounded-2xl overflow-hidden">
              {/* Form Header */}
              <div className="px-6 py-4 bg-background-light border-b border-border">
                <h3 className="font-heading font-semibold text-white">Send a Message</h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-400">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-light border border-border rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-light border border-border rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-400">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background-light border border-border rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-primary transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full py-3 px-6 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === 'success'
                      ? 'bg-accent-tertiary/20 text-accent-tertiary border border-accent-tertiary'
                      : 'btn-primary'
                  }`}
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                >
                  {status === 'idle' && (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message Sent!</span>
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>Error. Try again.</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Info Card */}
            <div className="bg-background-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-heading font-semibold text-white mb-4">
                Let&apos;s Build Something <span className="text-accent-primary">Amazing</span>
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                I&apos;m always interested in hearing about new opportunities, 
                challenging projects, or just having a chat about technology. 
                Whether you need help with backend systems, distributed architectures, 
                or AWS infrastructure – feel free to reach out!
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 text-slate-400 mb-6">
                <div className="p-2 bg-accent-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-accent-primary" />
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 bg-background-light border border-border rounded-lg hover:border-accent-tertiary/50 transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-accent-tertiary/10 rounded-lg group-hover:bg-accent-tertiary/20 transition-colors">
                      <social.icon className="w-5 h-5 text-accent-tertiary" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{social.label}</div>
                      <div className="text-sm text-white">{social.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-gradient-to-br from-accent-primary/10 to-accent-tertiary/10 border border-accent-primary/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-accent-tertiary animate-pulse" />
                <span className="text-sm font-medium text-accent-tertiary">Available for opportunities</span>
              </div>
              <p className="text-slate-400 text-sm">
                Currently open to full-time positions, contract work, and interesting collaborations 
                in backend development, distributed systems, and cloud architecture.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
