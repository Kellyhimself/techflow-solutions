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

import React from 'react';

// Fetch case studies from the backend API
async function getCaseStudies(): Promise<CaseStudy[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch case studies');
  return res.json();
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <section>
      <h1 className="text-4xl font-bold mb-8 text-accent">Case Studies</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {studies.length === 0 && (
          <div className="text-gray-400">No case studies found.</div>
        )}
        {studies.map((study) => (
          <a
            key={study.id}
            href={`/case-studies/${study.slug}`}
            className="block p-6 rounded-xl bg-gradient-to-tr from-primary to-card shadow-lg hover:scale-105 transition border border-primary/30"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{study.title}</h2>
            <p className="text-gray-200 mb-2">{study.description}</p>
            <div className="text-xs text-accent">{study.industry}</div>
          </a>
        ))}
      </div>
    </section>
  );
} 