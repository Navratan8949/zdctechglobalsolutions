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
      <article className="pt-32 lg:pt-40 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#0ea5e9] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={3} />
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 text-[13px] font-bold text-slate-500 mb-6 uppercase tracking-wider">
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-[#0ea5e9]">
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

          <h1 className="text-4xl font-bold text-[#0b1b3d] sm:text-5xl lg:text-6xl leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-8 mb-12">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-14 w-14 rounded-full shadow-sm object-cover"
            />
            <div>
              <p className="font-bold text-[#0b1b3d] text-[16px]">{post.author.name}</p>
              <p className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                {post.author.role}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
          <div className="aspect-[21/9] overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed prose-a:text-[#0ea5e9] hover:prose-a:text-blue-600 prose-img:rounded-2xl prose-img:border prose-img:border-slate-100 prose-img:shadow-sm prose-headings:text-[#0b1b3d] prose-headings:font-bold">
            {post.content.map((section, idx) => (
              <div key={idx} className="mb-10">
                {section.heading && (
                  <h2 className="text-3xl font-bold text-[#0b1b3d] mt-12 mb-6">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-slate-600 text-[18px] mb-6 leading-relaxed"
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
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-[#0b1b3d]">
                Related Articles
              </h2>
              <Link
                href="/blog"
                className="text-[14px] font-bold uppercase tracking-widest text-[#0ea5e9] hover:underline"
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

      {/* <CTASection /> */}
    </>
  );
}
