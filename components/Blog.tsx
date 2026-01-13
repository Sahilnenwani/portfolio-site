'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  BookOpen, 
  ArrowRight,
  Tag,
  ExternalLink,
  Clock,
  Heart,
  MessageCircle,
  Repeat2,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';

interface MediumArticle {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  author: string;
}

interface TwitterPost {
  id: string;
  text: string;
  url: string;
  date: string;
  likes: number;
  retweets: number;
  replies: number;
}

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mediumArticles, setMediumArticles] = useState<MediumArticle[]>([]);
  const [twitterPosts, setTwitterPosts] = useState<TwitterPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Medium articles
        const mediumResponse = await fetch('/api/medium');
        const mediumData = await mediumResponse.json();
        if (mediumData.articles) {
          setMediumArticles(mediumData.articles);
        }
        
        // Fetch Twitter posts
        const twitterResponse = await fetch('/api/twitter');
        const twitterData = await twitterResponse.json();
        if (twitterData.posts && twitterData.posts.length > 0) {
          setTwitterPosts(twitterData.posts);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load articles and posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  };

  const formatTwitterDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 48) return 'Yesterday';
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section id="blog" className="py-12 md:py-16 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-light/30 to-background" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background-card border border-border rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-terminal-pink" />
            <span className="font-mono text-sm text-terminal-pink">~/blog</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Latest <span className="text-terminal-pink">Articles</span> & <span className="text-terminal-cyan">Posts</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-mono text-sm">
            <span className="text-terminal-green">$</span> cat ~/blog/*.md | head -6
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-terminal-green animate-spin" />
            <span className="ml-3 font-mono text-zinc-400">Loading articles...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-zinc-500 font-mono mb-4">{error}</p>
            <p className="text-zinc-600 font-mono text-sm">
              Showing fallback links below
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Medium Articles */}
            {mediumArticles.slice(0, 3).map((article) => (
              <motion.article
                key={`medium-${article.url}`}
                variants={cardVariants}
                className="group"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="h-full bg-background-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-terminal-green/50 hover:shadow-lg hover:shadow-terminal-green/5 flex flex-col">
                    {/* Article Image */}
                    {article.image && (
                      <div className="w-full h-40 bg-background-light overflow-hidden relative">
                        <Image 
                          src={article.image} 
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    
                    {/* Post Header */}
                    <div className="p-6 flex-1">
                      {/* Platform Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 text-xs font-mono rounded-full bg-terminal-green/10 text-terminal-green border border-terminal-green/20">
                          Medium
                        </span>
                        <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-terminal-green transition-colors" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-heading font-semibold text-white mb-3 group-hover:text-terminal-green transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                        <span>{formatDate(article.date)}</span>
                      </div>

                      {/* Tags */}
                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-terminal-green/10 text-terminal-green rounded"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Read More */}
                    <div className="px-6 py-4 border-t border-border bg-background-light/50">
                      <span className="flex items-center gap-2 text-sm font-mono text-zinc-400 group-hover:text-terminal-green transition-colors">
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}

            {/* Twitter Posts */}
            {twitterPosts.slice(0, 3).map((post) => (
              <motion.article
                key={`twitter-${post.id}`}
                variants={cardVariants}
                className="group"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="h-full bg-background-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-terminal-cyan/50 hover:shadow-lg hover:shadow-terminal-cyan/5 flex flex-col">
                    {/* Post Header */}
                    <div className="p-6 flex-1">
                      {/* Platform Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 text-xs font-mono rounded-full bg-terminal-cyan/10 text-terminal-cyan border border-terminal-cyan/20">
                          Twitter
                        </span>
                        <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-terminal-cyan transition-colors" />
                      </div>

                      {/* Tweet Text */}
                      <p className="text-zinc-300 text-sm leading-relaxed mb-4 line-clamp-4">
                        {truncateText(post.text, 200)}
                      </p>

                      {/* Date */}
                      <div className="text-xs text-zinc-500 mb-4 font-mono">
                        {formatTwitterDate(post.date)}
                      </div>

                      {/* Engagement Metrics */}
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" />
                          {post.likes > 0 ? post.likes : '—'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Repeat2 className="w-3.5 h-3.5" />
                          {post.retweets > 0 ? post.retweets : '—'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.replies > 0 ? post.replies : '—'}
                        </span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="px-6 py-4 border-t border-border bg-background-light/50">
                      <span className="flex items-center gap-2 text-sm font-mono text-zinc-400 group-hover:text-terminal-cyan transition-colors">
                        <span>View on Twitter</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}

            {/* Fallback if no data */}
            {!loading && mediumArticles.length === 0 && twitterPosts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-zinc-500 font-mono mb-4">
                  No articles or posts found. Check your API configuration.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* View All Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={personalInfo.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background-card border border-border rounded-xl font-mono text-sm text-zinc-400 hover:text-terminal-green hover:border-terminal-green/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-5 h-5" />
              <span>View All Medium Articles</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={personalInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background-card border border-border rounded-xl font-mono text-sm text-zinc-400 hover:text-terminal-cyan hover:border-terminal-cyan/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Follow on Twitter</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
