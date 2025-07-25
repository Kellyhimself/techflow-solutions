import { notFound } from 'next/navigation';

// Type definition for a case study
interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  description: string;
  client_name?: string;
  industry?: string;
  technologies?: string[];
  results?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch a single case study by slug
async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.error) return null;
  return data;
}

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return notFound();

  return (
    <article className="max-w-2xl mx-auto bg-card rounded-xl p-8 shadow-lg border border-primary/30">
      <h1 className="text-3xl font-bold text-accent mb-4">{study.title}</h1>
      <div className="text-xs text-accent mb-2">{study.industry}</div>
      <div className="mb-4 text-gray-300">{study.client_name}</div>
      <div className="prose prose-invert text-white max-w-none mb-4">{study.description}</div>
      {study.technologies && (
        <div className="mb-4">
          <span className="font-semibold text-accent">Technologies:</span>
          <span className="ml-2 text-gray-200">{study.technologies.join(', ')}</span>
        </div>
      )}
      {study.results && (
        <div className="mt-4 p-4 rounded bg-primary/20 text-accent">
          <span className="font-semibold">Results:</span> {study.results}
        </div>
      )}
    </article>
  );
} 