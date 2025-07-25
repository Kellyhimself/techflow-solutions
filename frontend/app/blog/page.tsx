// Type definition for a blog post
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author_id?: number | null;
  published: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

import React from 'react';

// Fetch blog posts from the backend API
async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <h1 className="text-4xl font-bold mb-8 text-accent">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.length === 0 && (
          <div className="text-gray-400">No blog posts found.</div>
        )}
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-xl bg-gradient-to-tr from-primary to-card shadow-lg hover:scale-105 transition border border-primary/30"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{post.title}</h2>
            <p className="text-gray-200 mb-2">{post.excerpt}</p>
            <div className="text-xs text-accent">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}</div>
          </a>
        ))}
      </div>
    </section>
  );
} 