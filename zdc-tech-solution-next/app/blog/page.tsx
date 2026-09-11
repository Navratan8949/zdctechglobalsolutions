"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { BlogCard } from "@/components/site/BlogCard";
import { blogPosts as fallbackPosts, type BlogPost } from "@/data/blog";
import { getBlogs } from "@/service/blog.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getBlogs()
      .then((response) => {
        if (!active) return;
        setPosts(unwrapApiResponse<BlogPost[]>(response) || []);
      })
      .catch((requestError) => {
        if (!active) return;
        setPosts(fallbackPosts);
        setError(getApiErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const regularPosts = featuredPost
    ? posts.filter((post) => post.slug !== featuredPost.slug)
    : [];

  return (
    <>
      <PageHero
        eyebrow="Our Blog"
        title="Insights & Perspectives"
        description="Thoughts, trends and practical advice from our team of technology experts."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Loading blog posts...
            </p>
          )}
          {error && (
            <p className="mb-8 text-center text-sm text-amber-300">{error}</p>
          )}
          {!loading && posts.length === 0 && (
            <p className="mb-16 text-center text-muted-foreground">
              No published blog posts are available yet.
            </p>
          )}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="mb-8 text-2xl font-bold text-white">
                Featured Article
              </h2>
              <BlogCard post={featuredPost} featured={true} />
            </div>
          )}

          {regularPosts.length > 0 && (
            <div>
              <h2 className="mb-8 text-2xl font-bold text-white">
                Latest Posts
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* <CTASection /> */}
    </>
  );
}
