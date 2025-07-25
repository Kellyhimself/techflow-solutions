import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 bg-[var(--gradient)] text-white rounded-3xl shadow-lg mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Secure Your <span className="text-[var(--accent)]">DevOps</span> Pipeline<br />
          with <span className="text-[var(--accent)]">TechFlow Solutions</span>
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto opacity-90">
          End-to-end DevSecOps and CI/CD consulting for modern, secure, and scalable software delivery. Empower your team to build, test, and deploy with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="button text-lg px-8 py-4 shadow-xl">
            Get Started
          </Link>
          <Link href="/about" className="btn text-lg px-8 py-4 bg-white text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--accent)] hover:text-white transition">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="card flex flex-col items-center text-center">
          <Image src="/globe.svg" alt="CI/CD" width={48} height={48} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-[var(--primary)]">CI/CD Automation</h2>
          <p className="text-base text-[var(--foreground)] opacity-80">
            Streamline your software delivery with robust, automated pipelines for build, test, and deploy. Integrate security at every stage.
          </p>
        </div>
        <div className="card flex flex-col items-center text-center">
          <Image src="/window.svg" alt="Cloud Security" width={48} height={48} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-[var(--primary)]">Cloud & Container Security</h2>
          <p className="text-base text-[var(--foreground)] opacity-80">
            Secure your cloud infrastructure and containers with best practices, compliance, and continuous monitoring.
          </p>
        </div>
        <div className="card flex flex-col items-center text-center">
          <Image src="/file.svg" alt="DevSecOps" width={48} height={48} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-[var(--primary)]">DevSecOps Enablement</h2>
          <p className="text-base text-[var(--foreground)] opacity-80">
            Empower your teams with training, tools, and processes to embed security into every phase of the SDLC.
          </p>
        </div>
      </section>
    </div>
  );
}
