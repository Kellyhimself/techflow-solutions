import React from 'react';

export default function AppsShowcase() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-6">Our Built Solutions</h1>
      <p className="text-gray-300 mb-10 text-lg">
        Explore the fullstack applications we have built for various industries and use cases. These solutions are live, production-ready, and available for demo or deployment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <a href="https://pos.veylor360.com" target="_blank" rel="noopener noreferrer" className="block bg-[var(--primary)]/20 p-6 rounded-lg border border-[var(--accent)]/20 hover:border-[var(--accent)] hover:bg-[var(--primary)]/30 transition-all">
          <h2 className="text-xl font-semibold text-white mb-2">POS & Inventory Management</h2>
          <p className="text-gray-300 mb-2">A robust app for sales and inventory management, ideal for retail and wholesale businesses.</p>
          <span className="text-[var(--accent)] font-medium">pos.veylor360.com</span>
        </a>
        <a href="https://sms.veylor360.com" target="_blank" rel="noopener noreferrer" className="block bg-[var(--primary)]/20 p-6 rounded-lg border border-[var(--accent)]/20 hover:border-[var(--accent)] hover:bg-[var(--primary)]/30 transition-all">
          <h2 className="text-xl font-semibold text-white mb-2">School Management System</h2>
          <p className="text-gray-300 mb-2">A comprehensive platform for managing school operations, students, staff, and academics.</p>
          <span className="text-[var(--accent)] font-medium">sms.veylor360.com</span>
        </a>
        <a href="https://agrovet.veylor360.com" target="_blank" rel="noopener noreferrer" className="block bg-[var(--primary)]/20 p-6 rounded-lg border border-[var(--accent)]/20 hover:border-[var(--accent)] hover:bg-[var(--primary)]/30 transition-all">
          <h2 className="text-xl font-semibold text-white mb-2">Agrovet Sales & Inventory</h2>
          <p className="text-gray-300 mb-2">A specialized system for agrovet businesses to manage sales, inventory, and reporting.</p>
          <span className="text-[var(--accent)] font-medium">agrovet.veylor360.com</span>
        </a>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4">Video Overview</h3>
        <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden border border-[var(--card-border)]">
          <iframe
            src="https://www.loom.com/embed/89b5612d4779411999f22f24691ef761"
            frameBorder="0"
            allowFullScreen
            className="w-full h-72 md:h-96"
            title="App Overview Video"
          ></iframe>
        </div>
        <p className="text-gray-400 text-sm mt-2">Watch a tutorial and overview of our School Management and POS apps.</p>
      </div>
    </main>
  );
} 