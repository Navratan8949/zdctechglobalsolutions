"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  Pin,
  Tag,
  ChevronRight,
} from "lucide-react";
import { samplePosts, type Post } from "@/data/posts";
import { getPostBySlug, getPosts } from "@/service/post.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { resolveImageUrl } from "@/lib/utils";
import { PostCard } from "@/components/site/PostCard";

export default function PostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        setLoading(true);

        // 1. Fetch current post
        let current: Post | null = null;
        try {
          const res = await getPostBySlug(slug);
          const data = unwrapApiResponse<Post>(res);
          if (data && data.title) {
            current = data;
          }
        } catch (err) {
          // Fallback to sample
          current = samplePosts.find((p) => p.slug === slug) || null;
        }

        if (!current) {
          current = samplePosts.find((p) => p.slug === slug) || null;
        }

        if (active && current) {
          setPost(current);
        }

        // 2. Fetch related posts
        try {
          const allRes = await getPosts();
          const allData = unwrapApiResponse<Post[]>(allRes);
          const pool =
            Array.isArray(allData) && allData.length > 0
              ? allData
              : samplePosts;
          const others = pool.filter((p) => p.slug !== slug).slice(0, 3);
          if (active) setRelatedPosts(others);
        } catch (err) {
          const others = samplePosts.filter((p) => p.slug !== slug).slice(0, 3);
          if (active) setRelatedPosts(others);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (slug) {
      void loadData();
    }

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded mb-4" />
          <div className="h-12 w-3/4 bg-slate-200 rounded mb-6" />
          <div className="h-96 w-full bg-slate-200 rounded-2xl mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 text-center">
        <div className="mx-auto max-w-md px-4">
          <h1 className="text-2xl font-bold text-[#0b1b3d]">Post Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The post you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/posts"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0ea5e9] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date || Date.now()).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 bg-slate-50/60 py-3.5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0ea5e9]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/posts" className="hover:text-[#0ea5e9]">
            Daily Posts
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#0b1b3d] line-clamp-1">{post.title}</span>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10">
        {/* Post Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-[#0ea5e9]/20">
              {post.category || "Daily Post"}
            </span>
            {post.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 text-white px-3 py-1 text-[11px] font-black uppercase tracking-wider shadow-sm">
                <Pin className="h-3 w-3 fill-white" />
                Pinned
              </span>
            )}
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0b1b3d] leading-[1.2]">
            {post.title}
          </h1>

          {/* Author Bar */}
          <div className="flex items-center gap-3 pt-4 pb-6 border-b border-gray-100">
            {resolveImageUrl(post.author?.avatar) ? (
              <img
                src={resolveImageUrl(post.author?.avatar)}
                alt={post.author?.name || "Author"}
                className="h-11 w-11 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#0ea5e9] to-blue-700 text-white font-bold text-sm shadow-md">
                {post.author?.name ? post.author.name[0] : "Z"}
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-[#0b1b3d]">
                {post.author?.name || "ZDC Tech Team"}
              </p>
              <p className="text-xs text-slate-400">
                {post.author?.role || "Author"}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Cover Image - Using object-contain and max-h so image is 100% visible and uncropped */}
        {(() => {
          const coverUrl = resolveImageUrl(post.image);
          if (!coverUrl) return null;
          return (
            <div className="my-8 overflow-hidden rounded-3xl bg-slate-900/5 shadow-sm border border-gray-100 flex items-center justify-center p-2 sm:p-4">
              <img
                src={coverUrl}
                alt={post.title}
                className="w-full h-auto max-h-[650px] object-contain rounded-2xl"
              />
            </div>
          );
        })()}

        {/* Excerpt / Lead Description */}
        {post.excerpt && (
          <div className="mb-8 rounded-2xl bg-blue-50/60 border-l-4 border-[#0ea5e9] p-6 text-[17px] sm:text-[19px] leading-relaxed text-slate-700 font-medium italic shadow-sm">
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        )}

        {/* Full Post Content */}
        {post.content && (
          <div
            className="prose prose-slate prose-lg max-w-none [&>p]:mb-5 [&>p]:text-[16px] [&>p]:leading-relaxed [&>p]:text-slate-600 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#0b1b3d] [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#0b1b3d] [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-[#0ea5e9] [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:text-slate-700 [&>pre]:bg-slate-900 [&>pre]:text-slate-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>img]:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Card */}
        <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0b1b3d] text-white text-xl font-bold">
            {post.author?.name ? post.author.name[0] : "Z"}
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#0ea5e9]">
              Published By
            </span>
            <h3 className="text-lg font-bold text-[#0b1b3d]">
              {post.author?.name || "ZDC Tech Team"}
            </h3>
            <p className="text-xs font-medium text-slate-400 mb-2">
              {post.author?.role || "Author"}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Contributing daily engineering notes, product announcements, and technical articles on behalf of ZDC Tech Global Solutions.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0b1b3d] shadow-sm hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Daily Posts
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 pt-16 border-t border-gray-100 bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#0ea5e9]">
                Keep Reading
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1b3d] mt-1">
                More Daily Updates
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rPost, i) => (
                <PostCard key={rPost.slug || i} post={rPost} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
