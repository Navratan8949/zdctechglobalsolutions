"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Pin,
} from "lucide-react";
import type { Post } from "@/data/posts";

interface PostCardProps {
  post: Post;
  index?: number;
  featured?: boolean;
}

export function PostCard({ post, index = 0, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.date || Date.now()).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const postImageUrl =
    post.image?.url ||
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#0ea5e9]/40 hover:-translate-y-1 ${
        featured ? "lg:col-span-2 lg:flex-row" : ""
      }`}
    >
      {/* Cover Image Container with object-contain so full flyer/poster is visible */}
      <div
        className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${
          featured
            ? "aspect-[16/10] lg:aspect-auto lg:w-1/2 min-h-[260px]"
            : "aspect-[16/10]"
        }`}
      >
        <img
          src={postImageUrl}
          alt={post.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0b1b3d]/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20 shadow-sm">
            {post.category || "Daily Post"}
          </span>
          {post.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              <Pin className="h-2.5 w-2.5 fill-white" />
              Pinned
            </span>
          )}
        </div>

        {/* Date Stamp on Image */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white/90">
            <Calendar className="h-3 w-3 text-[#0ea5e9]" />
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 bg-white">
        <div>
          {/* Author info */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#0ea5e9] font-bold text-xs border border-blue-100">
              {post.author?.name ? post.author.name[0] : "Z"}
            </div>
            <div>
              <span className="font-bold text-[#0b1b3d] block">
                {post.author?.name || "ZDC Tech Team"}
              </span>
              {post.author?.role && (
                <span className="text-[11px] text-slate-400 block -mt-0.5">
                  {post.author.role}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-[#0b1b3d] leading-snug transition-colors group-hover:text-[#0ea5e9] ${
              featured ? "text-xl sm:text-2xl" : "text-lg sm:text-[19px]"
            }`}
          >
            <Link href={`/posts/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <div
            className="mt-2.5 text-[14px] leading-relaxed text-slate-500 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: post.excerpt || post.content?.replace(/<[^>]*>/g, "") || "",
            }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Read More Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0ea5e9] transition-all group-hover:translate-x-1"
          >
            <span>Read Full Post</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-[11px] font-medium text-slate-400">
            {post.category || "Daily Post"}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
