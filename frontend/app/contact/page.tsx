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
    <section className="max-w-xl mx-auto bg-card rounded-xl p-8 shadow-lg border border-primary/30">
      <h1 className="text-3xl font-bold text-accent mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 rounded bg-darkBg text-white border border-primary/30 focus:outline-none focus:border-accent"
          placeholder="Name*"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          className="w-full p-3 rounded bg-darkBg text-white border border-primary/30 focus:outline-none focus:border-accent"
          placeholder="Email*"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
        />
        <input
          className="w-full p-3 rounded bg-darkBg text-white border border-primary/30 focus:outline-none focus:border-accent"
          placeholder="Company"
          value={form.company}
          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
        />
        <input
          className="w-full p-3 rounded bg-darkBg text-white border border-primary/30 focus:outline-none focus:border-accent"
          placeholder="Service Interest"
          value={form.service_interest}
          onChange={e => setForm(f => ({ ...f, service_interest: e.target.value }))}
        />
        <textarea
          className="w-full p-3 rounded bg-darkBg text-white border border-primary/30 focus:outline-none focus:border-accent"
          placeholder="Message*"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded bg-primary text-white font-bold hover:bg-accent transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && <div className="text-green-400 mt-2">Message sent! We&apos;ll get back to you soon.</div>}
        {status === "error" && <div className="text-red-400 mt-2">Something went wrong. Please try again.</div>}
      </form>
    </section>
  );
} 