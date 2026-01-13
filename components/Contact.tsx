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
  Terminal,
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
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> Initializing contact form...',
    '> Ready to receive messages',
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate terminal output
    setTerminalLines((prev) => [
      ...prev,
      `> Processing message from ${formState.name}...`,
      '> Validating data...',
    ]);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, just simulate success (you can integrate with an email service later)
    setStatus('success');
    setTerminalLines((prev) => [
      ...prev,
      '> Message sent successfully!',
      '> Thank you for reaching out!',
    ]);

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
    <section id="contact" className="py-12 md:py-16 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background-card border border-border rounded-full mb-4">
            <Send className="w-4 h-4 text-terminal-green" />
            <span className="font-mono text-sm text-terminal-green">~/contact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Get In <span className="text-terminal-green">Touch</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-mono text-sm">
            <span className="text-terminal-green">$</span> ./send_message.sh --to=&quot;sahil&quot;
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Form - Terminal Style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-background-card border border-border rounded-xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-background-light border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-terminal-red" />
                  <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber" />
                  <div className="w-2.5 h-2.5 rounded-full bg-terminal-green" />
                </div>
                <Terminal className="w-3 h-3 text-zinc-500 ml-2" />
                <span className="font-mono text-xs text-zinc-500">contact.sh</span>
              </div>

              {/* Terminal Output */}
              <div className="p-4 border-b border-border bg-background-light/50 font-mono text-xs max-h-24 overflow-y-auto">
                {terminalLines.map((line, index) => (
                  <div key={index} className="text-terminal-green">
                    {line}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block font-mono text-sm text-zinc-400">
                    <span className="text-terminal-cyan">const</span>{' '}
                    <span className="text-terminal-amber">name</span> =
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-light border border-border rounded-lg font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-terminal-green transition-colors"
                    placeholder='"Your Name"'
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block font-mono text-sm text-zinc-400">
                    <span className="text-terminal-cyan">const</span>{' '}
                    <span className="text-terminal-amber">email</span> =
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background-light border border-border rounded-lg font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-terminal-green transition-colors"
                    placeholder='"your@email.com"'
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="block font-mono text-sm text-zinc-400">
                    <span className="text-terminal-cyan">const</span>{' '}
                    <span className="text-terminal-amber">message</span> =
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background-light border border-border rounded-lg font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-terminal-green transition-colors resize-none"
                    placeholder='`Your message here...`'
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full py-3 px-6 rounded-lg font-mono text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === 'success'
                      ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green'
                      : 'btn-primary'
                  }`}
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                >
                  {status === 'idle' && (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{'>'} send_message()</span>
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
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
            className="space-y-4"
          >
            {/* Info Card */}
            <div className="bg-background-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">
                Let&apos;s Build Something <span className="text-terminal-green">Amazing</span>
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                I&apos;m always interested in hearing about new opportunities, 
                challenging projects, or just having a chat about technology. 
                Whether you need help with backend systems, distributed architectures, 
                or AWS infrastructure – feel free to reach out!
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 text-zinc-400 mb-6">
                <div className="p-2 bg-terminal-green/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-terminal-green" />
                </div>
                <span className="font-mono text-sm">{personalInfo.location}</span>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 bg-background-light border border-border rounded-lg hover:border-terminal-cyan/50 transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-terminal-cyan/10 rounded-lg group-hover:bg-terminal-cyan/20 transition-colors">
                      <social.icon className="w-5 h-5 text-terminal-cyan" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-zinc-500">{social.label}</div>
                      <div className="text-sm text-white">{social.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-gradient-to-br from-terminal-green/10 to-terminal-cyan/10 border border-terminal-green/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-terminal-green animate-pulse" />
                <span className="font-mono text-sm text-terminal-green">Available for opportunities</span>
              </div>
              <p className="text-zinc-400 text-sm">
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

