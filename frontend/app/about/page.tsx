export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">About TechFlow Solutions</h1>
      
      {/* Mission & Vision Section */}
      <div className="bg-[var(--card-bg)] rounded-xl p-8 border border-[var(--card-border)] mb-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Our Mission</h2>
        <p className="text-gray-200 text-lg leading-relaxed mb-6">
          TechFlow Solutions is a DevSecOps consulting company specializing in secure CI/CD pipelines, cloud infrastructure security, container orchestration, compliance, and more. We help banks, fintechs, and SaaS companies build secure, scalable, and modern software systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--primary)]/20 rounded-lg p-4 border border-[var(--accent)]/20">
            <h3 className="text-white font-semibold mb-2">🏦 Industry Focus</h3>
            <p className="text-gray-300 text-sm">
              Specializing in fintech, banking, and enterprise solutions with compliance-first approach.
            </p>
          </div>
          <div className="bg-[var(--primary)]/20 rounded-lg p-4 border border-[var(--accent)]/20">
            <h3 className="text-white font-semibold mb-2">🛡️ Security-First</h3>
            <p className="text-gray-300 text-sm">
              Security built-in, not bolted-on. Zero trust, maximum security for your applications.
            </p>
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--card-border)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Core Services</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[var(--primary)] font-bold">🚀</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">CI/CD Pipeline Security</h3>
                <p className="text-gray-300 text-sm">Automated pipelines with security scanning at every stage</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">☁️</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Cloud Infrastructure Security</h3>
                <p className="text-gray-300 text-sm">Secure AWS, Azure, and GCP deployments with best practices</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">🐳</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Container & Kubernetes Security</h3>
                <p className="text-gray-300 text-sm">Secure containerization and orchestration solutions</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">📋</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Compliance & Regulatory</h3>
                <p className="text-gray-300 text-sm">ISO 27001, SOC 2, and industry-specific compliance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--card-border)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Value Propositions</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[var(--primary)] font-bold">⚡</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Deploy Faster, Deploy Safer</h3>
                <p className="text-gray-300 text-sm">Automated security checks without slowing down development</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">🔐</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Security Built-In</h3>
                <p className="text-gray-300 text-sm">Security integrated from code to cloud, not added later</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">🏦</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Fintech Expertise</h3>
                <p className="text-gray-300 text-sm">Specialized solutions for banking and financial services</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">📊</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Continuous Monitoring</h3>
                <p className="text-gray-300 text-sm">24/7 security monitoring and incident response</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--card-border)] mb-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--primary)]/20 rounded-lg p-4 border border-[var(--accent)]/20">
            <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mb-3">
              <span className="text-[var(--primary)] font-bold text-xl">KK</span>
            </div>
            <h3 className="text-white font-semibold">Kelly Kitui</h3>
            <p className="text-gray-300 text-sm">Founder & Lead DevSecOps Consultant</p>
          </div>
          
          <div className="bg-[var(--primary)]/20 rounded-lg p-4 border border-[var(--accent)]/20">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <h3 className="text-white font-semibold">Jane Doe</h3>
            <p className="text-gray-300 text-sm">Cloud Security Architect</p>
          </div>
          
          <div className="bg-[var(--primary)]/20 rounded-lg p-4 border border-[var(--accent)]/20">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-xl">JS</span>
            </div>
            <h3 className="text-white font-semibold">John Smith</h3>
            <p className="text-gray-300 text-sm">Senior DevOps Engineer</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--card-border)]">
        <h2 className="text-2xl font-semibold text-white mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center">
              <span className="text-[var(--primary)] font-bold">🛡️</span>
            </div>
            <span className="text-white">Security-first mindset</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">📚</span>
            </div>
            <span className="text-white">Continuous learning and improvement</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🤝</span>
            </div>
            <span className="text-white">Transparency and collaboration</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">💼</span>
            </div>
            <span className="text-white">Delivering real business value</span>
          </div>
        </div>
      </div>
    </div>
  );
} 