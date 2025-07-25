import { notFound } from 'next/navigation';

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

// Fetch a single blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.error) return null;
  return data;
}

type Props = { params: Promise<{ slug: string }> };

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return notFound();

  return (
    <article className="max-w-2xl mx-auto bg-card rounded-xl p-8 shadow-lg border border-primary/30">
      <h1 className="text-3xl font-bold text-accent mb-4">{post.title}</h1>
      <div className="text-xs text-accent mb-6">
        {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
      </div>
      <div className="prose prose-invert text-white max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
} 