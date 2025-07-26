'use client';

export default function AnimatedBanner() {
  return (
    <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] py-2 overflow-hidden border-b border-[var(--card-border)]">
      <div className="animate-marquee whitespace-nowrap">
      <span className="text-white text-sm font-medium mx-4">
          We Offer a Full suite of Services to help you grow your business:
        </span>
        <span className="text-white text-sm font-medium mx-4">
          📱 Software Development
        </span>
        <span className="text-white text-sm font-medium mx-4">
          �� From Code to Cloud with Security Built-In, Not Bolted-On
        </span>
        <span className="text-white text-sm font-medium mx-4">
          🏦 Fintech & Banking Security Solutions
        </span>
       </div>
    </div>
  );
} 