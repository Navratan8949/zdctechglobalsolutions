"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BlogCard } from "@/components/site/BlogCard";
import { blogPosts as fallbackPosts, type BlogPost } from "@/data/blog";
import { getBlogs } from "@/service/blog.service";
import { unwrapApiResponse } from "@/lib/public-api";

export function HomeBlogSection() {
  const [items, setItems] = useState<BlogPost[]>(fallbackPosts);

  useEffect(() => {
    let active = true;
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        if (!active) return;
        const liveItems = unwrapApiResponse<BlogPost[]>(res) || [];
        if (liveItems.length > 0) {
          setItems(liveItems);
        }
      } catch (err) {
        // Fallback already set
      }
    };
    void fetchBlogs();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Latest Insights"
          title="From Our Blog"
          description="Thoughts, trends and practical advice from our team of experts."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
