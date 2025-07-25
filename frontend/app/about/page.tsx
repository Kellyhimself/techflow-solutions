export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto bg-card rounded-xl p-8 shadow-lg border border-primary/30">
      <h1 className="text-3xl font-bold text-accent mb-4">About TechFlow Solutions</h1>
      <p className="mb-6 text-gray-200">
        TechFlow Solutions is a DevSecOps consulting company specializing in secure CI/CD pipelines, cloud infrastructure security, container orchestration, compliance, and more. We help banks, fintechs, and SaaS companies build secure, scalable, and modern software systems.
      </p>
      <h2 className="text-2xl font-semibold text-accent mb-2">Our Team</h2>
      <ul className="space-y-2 mb-6">
        <li className="bg-darkBg rounded p-4 border border-primary/20">
          <span className="font-bold text-white">Kelly Kitui</span> – Founder & Lead DevSecOps Consultant
        </li>
        <li className="bg-darkBg rounded p-4 border border-primary/20">
          <span className="font-bold text-white">Jane Doe</span> – Cloud Security Architect
        </li>
        <li className="bg-darkBg rounded p-4 border border-primary/20">
          <span className="font-bold text-white">John Smith</span> – Senior DevOps Engineer
        </li>
      </ul>
      <h2 className="text-2xl font-semibold text-accent mb-2">Our Values</h2>
      <ul className="list-disc list-inside text-gray-200">
        <li>Security-first mindset</li>
        <li>Continuous learning and improvement</li>
        <li>Transparency and collaboration</li>
        <li>Delivering real business value</li>
      </ul>
    </section>
  );
} 