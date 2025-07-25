"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", service_interest: "" });
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "", service_interest: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--card-border)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Phone</p>
                <a href="tel:0795510924" className="text-white font-medium hover:text-[var(--accent)] transition-colors">
                  0795 510 924
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-300 text-sm">WhatsApp</p>
                <a href="https://wa.me/254795510924" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-green-400 transition-colors">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Email</p>
                <a href="mailto:support@veylor360.com" className="text-white font-medium hover:text-[var(--accent)] transition-colors">
                  support@veylor360.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-[var(--primary)]/20 rounded-lg border border-[var(--accent)]/20">
            <h3 className="text-white font-semibold mb-2">Quick Response</h3>
            <p className="text-gray-300 text-sm">
              We typically respond within 2-4 hours during business hours. For urgent matters, please call or WhatsApp us directly.
            </p>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--card-border)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Send Message</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="w-full p-2 rounded bg-[var(--primary)]/20 text-white border border-[var(--card-border)] focus:outline-none focus:border-[var(--accent)] text-sm"
                placeholder="Name*"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                className="w-full p-2 rounded bg-[var(--primary)]/20 text-white border border-[var(--card-border)] focus:outline-none focus:border-[var(--accent)] text-sm"
                placeholder="Email*"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <input
              className="w-full p-2 rounded bg-[var(--primary)]/20 text-white border border-[var(--card-border)] focus:outline-none focus:border-[var(--accent)] text-sm"
              placeholder="Company"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            />
            <input
              className="w-full p-2 rounded bg-[var(--primary)]/20 text-white border border-[var(--card-border)] focus:outline-none focus:border-[var(--accent)] text-sm"
              placeholder="Service Interest"
              value={form.service_interest}
              onChange={e => setForm(f => ({ ...f, service_interest: e.target.value }))}
            />
            <textarea
              className="w-full p-2 rounded bg-[var(--primary)]/20 text-white border border-[var(--card-border)] focus:outline-none focus:border-[var(--accent)] text-sm resize-none"
              placeholder="Message*"
              rows={4}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded bg-gradient-to-r from-[var(--accent)] to-blue-500 text-white font-bold hover:scale-105 transition-all disabled:opacity-60 text-sm"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && <div className="text-green-400 text-sm mt-2">Message sent! We&apos;ll get back to you soon.</div>}
            {status === "error" && <div className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</div>}
          </form>
        </div>
      </div>
    </div>
  );
} 