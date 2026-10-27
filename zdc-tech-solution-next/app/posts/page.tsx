"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";
import { samplePosts, type Post } from "@/data/posts";
import { getPosts } from "@/service/post.service";
import { unwrapApiResponse, getApiErrorMessage } from "@/lib/public-api";
import {
  Search,
  Sparkles,
  Newspaper,
  Layers,
  Calendar,
  Rss,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        if (!active) return;
        const live = unwrapApiResponse<Post[]>(res);
        if (Array.isArray(live) && live.length > 0) {
          setPosts(live);
        }
      } catch (err) {
        if (!active) return;
        setError(getApiErrorMessage(err));
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchPosts();
    return () => {
      active = false;
    };
  }, []);

  // Compute categories and counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    for (const p of posts) {
      const cat = p.category?.trim() || "Daily Update";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [posts]);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    Object.keys(categoryCounts).forEach((c) => set.add(c));
    return Array.from(set);
  }, [categoryCounts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const cat = post.category?.trim() || "Daily Update";
      const matchesCategory =
        activeCategory === "All" || cat === activeCategory;
      const matchesSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        (post.tags &&
          post.tags.some((t) =>
            t.toLowerCase().includes(search.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  const pinnedPost = useMemo(() => {
    if (activeCategory !== "All" || search !== "") return null;
    return filteredPosts.find((p) => p.pinned) || null;
  }, [filteredPosts, activeCategory, search]);

  const regularPosts = useMemo(() => {
    if (pinnedPost) {
      return filteredPosts.filter((p) => p.slug !== pinnedPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, pinnedPost]);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        eyebrow="Daily Company Feed"
        title="Daily Posts & Engineering Updates"
        description="Daily notes, technical breakthroughs, project announcements, and culture highlights straight from the ZDC Tech team."
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Controls: Search + Categories */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => {
                const count = categoryCounts[category] || 0;
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#0ea5e9] text-white shadow-md shadow-[#0ea5e9]/20 scale-105"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0b1b3d]"
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search daily posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-slate-50/80 py-2.5 pl-10 pr-4 text-xs font-medium text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all"
              />
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <p className="mt-6 text-center text-sm text-amber-500">{error}</p>
          )}

          {/* Pinned Featured Post (Only in "All" view without search) */}
          {pinnedPost && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#0ea5e9] animate-pulse" />
                <h2 className="text-xs font-black uppercase tracking-widest text-[#0ea5e9]">
                  Featured Daily Highlight
                </h2>
              </div>
              <PostCard post={pinnedPost} featured={true} index={0} />
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                {activeCategory === "All" ? "All Daily Updates" : `${activeCategory} Posts`} (
                {filteredPosts.length})
              </h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${search}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {regularPosts.map((post, i) => (
                  <PostCard key={post.slug || post._id || i} post={post} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredPosts.length === 0 && !loading && (
              <div className="mt-12 text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Newspaper className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <h3 className="text-lg font-bold text-slate-700">No posts found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  {search
                    ? `No daily posts matched your search for "${search}".`
                    : `There are currently no posts under "${activeCategory}".`}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearch("");
                  }}
                  className="mt-4 inline-flex items-center rounded-lg bg-[#0ea5e9] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0284c7] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Daily Newsletter / Stay Updated Section */}
      <section className="py-16 bg-[#0b1b3d] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-blue-900/60 to-slate-900/80 p-8 sm:p-12 border border-white/10">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#0ea5e9]">
                Never Miss a Post
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                Subscribe for Daily Technology Updates
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Get our curated daily engineering snippets, design tips, and enterprise software updates directly in your inbox.
              </p>
            </div>
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#0ea5e9] text-white px-8 text-xs font-bold uppercase tracking-wider transition-all hover:bg-blue-500 hover:scale-105 shadow-lg shadow-[#0ea5e9]/20"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
