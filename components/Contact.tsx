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
  MapPin,
  Sparkles,
  MessageSquare,
  ArrowRight
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email', value: personalInfo.email, color: 'hover:bg-red-500' },
    { icon: Github, href: personalInfo.github, label: 'GitHub', value: 'Sahilnenwani', color: 'hover:bg-slate-900' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn', value: 'sahilnenwani', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: personalInfo.twitter, label: 'Twitter', value: '@NenwaniSah7402', color: 'hover:bg-sky-500' },
    { icon: BookOpen, href: personalInfo.medium, label: 'Medium', value: '@SahilNenwani', color: 'hover:bg-green-600' },
  ];

  return (
    <section id="contact" className="py-12 md:py-16 relative overflow-hidden" ref={ref}>
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-tertiary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageSquare className="w-6 h-6 text-accent-primary" />
            </motion.div>
            <span className="text-accent-primary font-medium uppercase tracking-wider text-sm">Contact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
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
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
              {/* Form Header with gradient */}
              <div className="px-6 py-4 bg-gradient-to-r from-accent-primary to-purple-500">
                <h3 className="font-heading font-semibold text-white flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send a Message
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-accent-primary focus:bg-white transition-all"
                      placeholder="Your name"
                    />
                  </motion.div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-accent-primary focus:bg-white transition-all"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <motion.div
                    animate={{ scale: focusedField === 'message' ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-accent-primary focus:bg-white transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`relative w-full py-4 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 ${
                    status === 'success'
                      ? 'bg-accent-tertiary text-white'
                      : 'bg-gradient-to-r from-accent-primary to-purple-500 text-white'
                  }`}
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                >
                  {status === 'idle' && (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span>Sending...</span>
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Message Sent Successfully!</span>
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>Error. Please try again.</span>
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
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">
                Let&apos;s Build Something <span className="gradient-text">Amazing</span>
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                I&apos;m always interested in hearing about new opportunities, 
                challenging projects, or just having a chat about technology. 
                Whether you need help with backend systems, distributed architectures, 
                or AWS infrastructure – feel free to reach out!
              </p>

              {/* Location */}
              <motion.div 
                className="flex items-center gap-3 text-slate-600 mb-6 p-3 bg-slate-50 rounded-xl"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-gradient-to-br from-accent-primary to-purple-500 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{personalInfo.location}</span>
              </motion.div>

              {/* Social Links */}
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all duration-300 group ${social.color} hover:text-white`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-white/20 transition-colors">
                      <social.icon className="w-5 h-5 text-slate-600 group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 group-hover:text-white/70 font-medium">{social.label}</div>
                      <div className="text-sm text-slate-700 group-hover:text-white font-medium">{social.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <motion.div 
              className="relative bg-gradient-to-br from-accent-primary/10 via-purple-500/10 to-accent-tertiary/10 border border-accent-primary/20 rounded-2xl p-6 overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Sparkle decorations */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-accent-gold" />
              </motion.div>
              
              <div className="flex items-center gap-3 mb-3">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-accent-tertiary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-bold text-accent-tertiary">Available for opportunities</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Currently open to full-time positions, contract work, and interesting collaborations 
                in backend development, distributed systems, and cloud architecture.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
