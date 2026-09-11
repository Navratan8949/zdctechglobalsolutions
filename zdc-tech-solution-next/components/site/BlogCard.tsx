'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/40 lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold text-foreground">
              Featured
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 lg:p-8">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary lg:text-2xl">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="h-9 w-9 rounded-full border border-border object-cover" />
              <div>
                <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/40"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute left-4 top-4 rounded-full border border-border bg-white/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
            <img src={post.author.avatar} alt={post.author.name} className="h-7 w-7 rounded-full border border-border object-cover" />
            <span className="text-xs text-muted-foreground">{post.author.name}</span>
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
