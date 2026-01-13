'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Tag,
  ArrowLeft,
  Search,
  ExternalLink
} from 'lucide-react';
import { blogPosts } from '@/lib/data';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))];

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {/* Back Link */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-terminal-green transition-colors font-mono text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>cd ~</span>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-terminal-pink/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-terminal-pink" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                  Blog
                </h1>
                <p className="text-zinc-500 font-mono text-sm">
                  ~/blog $ ls -la
                </p>
              </div>
            </div>

            <p className="text-zinc-400 max-w-2xl">
              Explore my technical articles on Medium and follow my tech insights on Twitter. 
              Covering backend development, distributed systems, and software engineering.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background-card border border-border rounded-xl font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-terminal-pink transition-colors"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  selectedTag === null
                    ? 'bg-terminal-pink/20 border-terminal-pink text-terminal-pink'
                    : 'bg-background-card border-border text-zinc-500 hover:border-terminal-pink/50'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                    selectedTag === tag
                      ? 'bg-terminal-pink/20 border-terminal-pink text-terminal-pink'
                      : 'bg-background-card border-border text-zinc-500 hover:border-terminal-pink/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-background-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-terminal-pink/50 hover:shadow-lg hover:shadow-terminal-pink/5">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Date Column */}
                      <div className="md:w-32 flex-shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                            post.type === 'medium' 
                              ? 'bg-terminal-green/10 text-terminal-green border border-terminal-green/20'
                              : 'bg-terminal-cyan/10 text-terminal-cyan border border-terminal-cyan/20'
                          }`}>
                            {post.type === 'medium' ? 'Medium' : 'Twitter'}
                          </span>
                          <ExternalLink className="w-3 h-3 text-zinc-500" />
                        </div>
                        <div className="font-mono text-sm text-terminal-cyan">
                          {formatDate(post.date)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-terminal-pink transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-terminal-cyan/10 text-terminal-cyan rounded"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                          <span className="flex items-center gap-1 text-xs font-mono text-zinc-500 group-hover:text-terminal-pink transition-colors ml-auto">
                            Visit {post.type === 'medium' ? 'Medium' : 'Twitter'}
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-500 font-mono">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

