import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/site/CTASection";
import { BlogCard } from "@/components/site/BlogCard";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
  type BlogPost,
} from "@/data/blog";
import { getBlogBySlug as getLiveBlogBySlug } from "@/service/blog.service";
import { unwrapApiResponse } from "@/lib/public-api";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let post = getPostBySlug(params.slug);
  try {
    post = unwrapApiResponse<BlogPost>(await getLiveBlogBySlug(params.slug));
  } catch {}
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post = getPostBySlug(params.slug);
  try {
    post = unwrapApiResponse<BlogPost>(await getLiveBlogBySlug(params.slug));
  } catch {}
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <>
      <article className="pt-24 lg:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-medium text-primary">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-y border-white/10 py-6 mb-12">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-12 w-12 rounded-full border border-white/10 object-cover"
            />
            <div>
              <p className="font-medium text-white">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.author.role}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
          <div className="aspect-[21/9] overflow-hidden rounded-3xl border border-white/10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-headings:font-display">
            {post.content.map((section, idx) => (
              <div key={idx} className="mb-10">
                {section.heading && (
                  <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-muted-foreground text-lg mb-6 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-white/10 py-20 bg-card/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-bold text-white">
                Related Articles
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all posts
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
