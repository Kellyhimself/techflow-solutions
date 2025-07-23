'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      { label: 'DevSecOps Platform', href: '/products/platform' },
      { label: 'Container Security', href: '/products/containers' },
      { label: 'Infrastructure as Code', href: '/products/iac' },
      { label: 'Open Source Security', href: '/products/oss' }
    ]
  },
  {
    label: 'Solutions',
    children: [
      { label: 'By Industry', href: '/solutions/industries' },
      { label: 'By Technology', href: '/solutions/technologies' },
      { label: 'Compliance', href: '/solutions/compliance' },
      { label: 'Enterprise', href: '/solutions/enterprise' }
    ]
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Webinars', href: '/webinars' }
    ]
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partners', href: '/partners' }
    ]
  }
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 rounded-md hover:bg-[var(--primary)]/20 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed inset-y-0 right-0 w-80 bg-[var(--card-bg)] shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between text-white hover:text-[var(--accent)] transition-colors py-3 px-4 rounded-lg hover:bg-[var(--primary)]/20"
                    >
                      <span className="font-medium">{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openSection === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {openSection === item.label && item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href || '#'}
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-300 hover:text-[var(--accent)] transition-colors py-2 px-4 rounded-lg hover:bg-[var(--primary)]/10"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile menu footer */}
              <div className="mt-8 pt-6 border-t border-[var(--card-border)] space-y-4">
                <Link
                  href="/trial"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-gradient-to-r from-blue-600 to-sky-400 text-white text-center font-bold py-3 px-4 rounded-lg hover:scale-105 transition-transform"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/demo"
                  onClick={() => setIsOpen(false)}
                  className="block w-full border border-[var(--accent)] text-[var(--accent)] text-center font-bold py-3 px-4 rounded-lg hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-colors"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 