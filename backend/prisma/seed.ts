import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'admin@techflow.com',
      password_hash: '$2b$10$samplehashforadmin', // Not a real hash, just for demo
      role: 'admin',
    },
  });

  // Create blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Welcome to TechFlow Solutions',
        slug: 'welcome-to-techflow',
        content: 'TechFlow Solutions is your trusted partner in DevSecOps and cloud transformation.',
        excerpt: 'Your trusted partner in DevSecOps and cloud transformation.',
        author_id: user.id,
        published: true,
        published_at: new Date(),
      },
      {
        title: 'How We Secure Cloud Deployments',
        slug: 'secure-cloud-deployments',
        content: 'Learn our approach to securing cloud infrastructure for fintech clients.',
        excerpt: 'Our approach to securing cloud infrastructure.',
        author_id: user.id,
        published: true,
        published_at: new Date(),
      },
    ],
  });

  // Create case studies
  await prisma.caseStudy.createMany({
    data: [
      {
        title: 'Fintech Cloud Migration',
        slug: 'fintech-cloud-migration',
        description: 'Migrated a fintech client to AWS with zero downtime and full compliance.',
        client_name: 'FinBank Ltd.',
        industry: 'Fintech',
        technologies: ['AWS', 'Terraform', 'Docker'],
        results: 'Reduced costs by 30%, improved security posture.',
        published: true,
      },
      {
        title: 'CI/CD Pipeline Automation',
        slug: 'cicd-pipeline-automation',
        description: 'Automated CI/CD for a SaaS provider, enabling rapid, secure deployments.',
        client_name: 'SaaSify Inc.',
        industry: 'SaaS',
        technologies: ['Jenkins', 'GitHub Actions', 'Kubernetes'],
        results: 'Deployment time reduced from hours to minutes.',
        published: true,
      },
    ],
  });

  // Create a contact submission
  await prisma.contactSubmission.create({
    data: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      company: 'Acme Corp',
      message: 'Interested in DevSecOps consulting services.',
      service_interest: 'DevSecOps',
      status: 'new',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 