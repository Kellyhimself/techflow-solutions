'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MenuItem {
  label: string;
  href?: string;
  description?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Products',
    children: [
      {
        label: 'DevSecOps Platform',
        href: '/products/platform',
        description: 'Complete security integration for your development pipeline'
      },
      {
        label: 'Container Security',
        href: '/products/containers',
        description: 'Secure your containers and Kubernetes deployments'
      },
      {
        label: 'Infrastructure as Code',
        href: '/products/iac',
        description: 'Security scanning for Terraform, CloudFormation, and more'
      },
      {
        label: 'Open Source Security',
        href: '/products/oss',
        description: 'Find and fix vulnerabilities in your dependencies'
      },
      {
        label: 'Our Apps',
        href: '/products/apps',
        description: 'Explore the fullstack applications we have built'
      }
    ]
  },
  {
    label: 'Solutions',
    children: [
      {
        label: 'By Industry',
        href: '/solutions/industries',
        description: 'Tailored security solutions for your industry'
      },
      {
        label: 'By Technology',
        href: '/solutions/technologies',
        description: 'Security for your specific tech stack'
      },
      {
        label: 'Compliance',
        href: '/solutions/compliance',
        description: 'Meet regulatory requirements with automated security'
      },
      {
        label: 'Enterprise',
        href: '/solutions/enterprise',
        description: 'Scalable security for large organizations'
      }
    ]
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Documentation',
        href: '/docs',
        description: 'Comprehensive guides and API references'
      },
      {
        label: 'Blog',
        href: '/blog',
        description: 'Latest insights on DevSecOps and security'
      },
      {
        label: 'Case Studies',
        href: '/case-studies',
        description: 'Real-world success stories from our clients'
      },
      {
        label: 'Webinars',
        href: '/webinars',
        description: 'Live sessions and recorded presentations'
      }
    ]
  },
  {
    label: 'Company',
    children: [
      {
        label: 'About Us',
        href: '/about',
        description: 'Learn about our mission and team'
      },
      {
        label: 'Careers',
        href: '/careers',
        description: 'Join our team of security experts'
      },
      {
        label: 'Contact',
        href: '/contact',
        description: 'Get in touch with our team'
      },
      {
        label: 'Partners',
        href: '/partners',
        description: 'Strategic partnerships and integrations'
      }
    ]
  }
];

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="relative">
      <ul className="flex items-center space-x-0">
        {menuItems.map((item, index) => (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={() => setActiveDropdown(item.label)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center text-white hover:text-[var(--accent)] transition-colors duration-200 text-sm font-normal tracking-tight">
              {item.label}
              <svg
                className="ml-1 w-3 h-3 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {index < menuItems.length - 1 && (
              <span className="mx-2 text-gray-400">|</span>
            )}

            {/* Full-page dropdown - centered like a normal page */}
            {activeDropdown === item.label && item.children && (
              <div className="fixed inset-0 top-16 bg-[var(--card-bg)] border-b border-[var(--card-border)] shadow-2xl z-50 overflow-y-auto">
                <div className="min-h-full flex items-center justify-center">
                  <div className="w-full max-w-7xl mx-auto px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {item.children.map((child) => (
                        <div key={child.label} className="group">
                          <Link
                            href={child.href || '#'}
                            className="block p-6 rounded-lg border border-transparent hover:border-[var(--accent)] hover:bg-[var(--primary)]/10 transition-all duration-200 group-hover:scale-105"
                          >
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                              {child.label}
                            </h3>
                            {child.description && (
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {child.description}
                              </p>
                            )}
                            <div className="mt-4 flex items-center text-[var(--accent)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Learn more
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                    
                    {/* Featured section */}
                    <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] p-6 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Get Started</h4>
                          <p className="text-gray-200 text-sm mb-4">Start your free trial and secure your first project in minutes.</p>
                          <Link href="/trial" className="inline-flex items-center text-[var(--accent)] text-sm font-medium hover:underline">
                            Start free trial
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                        
                        <div className="bg-[var(--primary)]/20 p-6 rounded-lg border border-[var(--accent)]/20">
                          <h4 className="text-white font-semibold mb-2">Schedule Demo</h4>
                          <p className="text-gray-200 text-sm mb-4">See how TechFlow can integrate with your existing workflow.</p>
                          <Link href="/demo" className="inline-flex items-center text-[var(--accent)] text-sm font-medium hover:underline">
                            Book demo
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                        
                        <div className="bg-[var(--primary)]/20 p-6 rounded-lg border border-[var(--accent)]/20">
                          <h4 className="text-white font-semibold mb-2">Support</h4>
                          <p className="text-gray-200 text-sm mb-4">Get help from our security experts and community.</p>
                          <Link href="/support" className="inline-flex items-center text-[var(--accent)] text-sm font-medium hover:underline">
                            Contact support
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
} 