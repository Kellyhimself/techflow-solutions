## DevSecOps Daily Learning Plan for Kelly Kitui

### Goal: Become a Practical, Job-Ready DevSecOps Practitioner in 4 Months

This schedule is designed to:
- Equip you with practical, hands-on DevSecOps skills.
- Make you employable by banks, fintechs, and competitive in the freelance market.
- Focus on the most **applicable, must-know concepts**.

---

# Phase 1: Core Foundations (Weeks 1 - 4)

## **Week 1: Linux Mastery**
- **Day 1-2:** Linux file systems, permissions, users & groups.  
  *Resource:* Linux Essentials by Linux Academy (YouTube)
- **Day 3-4:** Basic Bash scripting (create, modify files, loops).  
  *Resource:* Bash Scripting Crash Course by Traversy Media
- **Day 5:** Practical: Install Ubuntu on VirtualBox, create users, write basic scripts.
- **Day 6:** Networking basics: TCP/IP, ports, DNS.  
  *Resource:* Computer Networking Full Course (YouTube: NetworkChuck)
- **Day 7:** Practical review: Create a local network on VirtualBox.

## **Week 2: Git & Networking Deep Dive**
- **Day 8-9:** Git basics: branches, commits, pull requests.  
  *Resource:* Git & GitHub Crash Course by Traversy Media
- **Day 10-11:** GitHub workflows: Fork, merge, resolve conflicts.
- **Day 12-13:** Networking: HTTP, HTTPS, proxies, firewalls.  
  *Resource:* TryHackMe: Network Fundamentals
- **Day 14:** Practical: Set up GitHub project, push your scripts.

## **Week 3: Cloud Basics (Azure)**
- **Day 15-16:** Azure Virtual Machines (launch, SSH, network security groups).  
  *Resource:* Microsoft Learn: "Create a Linux virtual machine in Azure" ([link](https://learn.microsoft.com/en-us/training/modules/create-linux-virtual-machine-in-azure/))
- **Day 17-18:** Azure Blob Storage (containers, permissions, versioning).  
  *Resource:* Microsoft Learn: "Store application data in Azure Blob Storage" ([link](https://learn.microsoft.com/en-us/training/modules/store-app-data-with-azure-blob-storage/))
- **Day 19:** Azure Active Directory (Identity & Access Management) security basics.  
  *Resource:* Microsoft Learn: "Secure your Azure resources with Azure Active Directory" ([link](https://learn.microsoft.com/en-us/training/modules/secure-azure-resources-with-azure-ad/))
- **Day 20:** Azure Virtual Network and networking security basics.  
  *Resource:* Microsoft Learn: "Secure network connectivity in Azure" ([link](https://learn.microsoft.com/en-us/training/modules/secure-network-connectivity-in-azure/))
- **Day 21:** Practical: Deploy a static website on Azure Blob Storage with secure permissions.  
  *Resource:* Microsoft Learn: "Host a static website in Azure Storage" ([link](https://learn.microsoft.com/en-us/training/modules/host-a-static-website-with-azure-storage/))

## **Week 4: Docker Essentials**
- **Day 22-23:** Docker basics: containers, images, volumes.
- **Day 24-25:** Build and run a Docker container for a simple Node.js app.
- **Day 26-27:** Docker Compose: multi-container setup.
- **Day 28:** Practical: Dockerize a Node.js web app, push it to Docker Hub.

---

# Phase 2: DevOps Core (Weeks 5 - 8)

# DevSecOps Learning Plan: Weeks 5–12 (Beginner-Friendly, Azure-Focused)

This section provides a gradual, hands-on DevSecOps journey from Week 5 onward, using Microsoft Learn and Azure. Each week builds on the previous, with clear goals and practical labs. All resources are free and beginner-friendly.

---

## **Week 5: CI/CD Fundamentals**
**Goal:** Understand and implement basic CI/CD pipelines using GitHub Actions and Azure Pipelines.

- **Intro:** Learn what CI/CD is, why it matters, and how automation improves software delivery.
- **Topics:**
  - What is CI/CD?
  - Introduction to GitHub Actions
  - Introduction to Azure Pipelines
- **Hands-on Labs:**
  - [Implement GitHub Actions for CI/CD](https://microsoftlearning.github.io/AZ400-DesigningandImplementingMicrosoftDevOpsSolutions/Instructions/Labs/AZ400%5FM02%5FL05%5FImplement%5FGitHub%5FActions%5Ffor%5FCI%5FCD.html)
  - [Enable Continuous Integration with Azure Pipelines](https://microsoftlearning.github.io/AZ400-DesigningandImplementingMicrosoftDevOpsSolutions/Instructions/Labs/AZ400%5FM02%5FL04%5FEnable%5FContinuous%5FIntegration%5Fwith%5FAzure%5FPipelines.html)
- **Practical:** Set up a simple pipeline to build and test a sample app automatically.

---

## **Week 6: Advanced CI/CD & Deployment**
**Goal:** Build multi-stage pipelines and deploy applications to Azure.

- **Intro:** Learn how to automate deployments and manage releases safely.
- **Topics:**
  - Multi-stage pipelines (build, test, deploy)
  - YAML pipeline basics
  - Release strategies and approvals
- **Hands-on Labs:**
  - [Configure Pipelines as Code with YAML](https://microsoftlearning.github.io/AZ400-DesigningandImplementingMicrosoftDevOpsSolutions/Instructions/Labs/AZ400%5FM03%5FL07%5FConfigure%5FPipelines%5Fas%5FCode%5Fwith%5FYAML.html)
  - [Control Deployments using Release Gates](https://microsoftlearning.github.io/AZ400-DesigningandImplementingMicrosoftDevOpsSolutions/Instructions/Labs/AZ400%5FM03%5FL08%5FControl%5FDeployments%5Fusing%5FRelease%5FGates.html)
  - [Deploy a web app to Azure virtual machines using Jenkins](https://learn.microsoft.com/en-us/training/modules/deploy-web-app-to-azure-vm-using-jenkins/)
- **Practical:** Deploy a sample app to Azure using a pipeline with manual approval.

---

## **Week 7: Kubernetes Basics**
**Goal:** Deploy and manage containerized applications with Azure Kubernetes Service (AKS).

- **Intro:** Learn what Kubernetes is and why it’s used for modern app deployment.
- **Topics:**
  - Kubernetes concepts (pods, services, deployments)
  - Azure Kubernetes Service (AKS)
  - Secrets and config maps
- **Hands-on Labs:**
  - [Deploy and run a containerized web app with Azure Kubernetes Service](https://learn.microsoft.com/en-us/training/modules/deploy-run-container-app-service/)
  - [Deploy Docker containers to Azure App Service web apps](https://microsoftlearning.github.io/AZ400-DesigningandImplementingMicrosoftDevOpsSolutions/Instructions/Labs/AZ400%5FM02%5FL06%5FDeploy%5FDocker%5Fcontainers%5Fto%5FAzure%5FApp%5FService%5Fweb%5Fapps.html)
- **Practical:** Deploy a simple web app to AKS and manage secrets/configs.

---

## **Week 8: Infrastructure as Code (IaC)**
**Goal:** Automate infrastructure deployment using Terraform and Bicep.

- **Intro:** Learn why IaC is important and how it makes cloud management easier.
- **Topics:**
  - What is Infrastructure as Code?
  - Terraform basics
  - Azure Bicep basics
  - Managing secrets in IaC
- **Hands-on Labs:**
  - [Provision infrastructure in Azure with Terraform](https://learn.microsoft.com/en-us/training/modules/terraform-infrastructure-as-code/)
  - [Deployments using Azure Bicep templates](https://microsoftlearning.github.io/AZ400-DesigningandImplementingMicrosoftDevOpsSolutions/Instructions/Labs/AZ400%5FM05%5FL12%5FDeployments%5Fusing%5FAzure%5FBicep%5Ftemplates.html)
- **Practical:** Write and run a Terraform script to deploy a VM in Azure.

---

## **Week 9: Secure CI/CD Pipelines**
**Goal:** Integrate security into your CI/CD pipelines.

- **Intro:** Learn how to scan for vulnerabilities and protect secrets in your pipelines.
- **Topics:**
  - Security scanning (Trivy, Snyk)
  - Securing pipeline credentials
  - Using Azure Key Vault
- **Hands-on Labs:**
  - [Integrate Azure Key Vault with Azure DevOps](https://microsoftlearning.github.io/AZ400-DesigningandImplementingMicrosoftDevOpsSolutions/Instructions/Labs/AZ400%5FM04%5FL10%5FIntegrate%5FAzure%5FKey%5FVault%5Fwith%5FAzure%5FDevOps.html)
  - [Security in GitHub Actions](https://learn.microsoft.com/en-us/training/modules/secure-github-actions-pipelines/)
- **Practical:** Add a security scan and secret management to your pipeline.

---

## **Week 10: Container & Web Security**
**Goal:** Harden containers and web apps against common threats.

- **Intro:** Learn about container security and web vulnerabilities (OWASP Top 10).
- **Topics:**
  - Container hardening
  - OWASP Top 10
  - Using OWASP ZAP for scanning
- **Hands-on Labs:**
  - [Secure your containerized applications in Azure](https://learn.microsoft.com/en-us/training/modules/secure-containerized-apps-azure/)
  - [OWASP Top 10 and Azure security best practices](https://learn.microsoft.com/en-us/security/benchmark/azure/)
- **Practical:** Scan your app for vulnerabilities and apply fixes.

---

## **Week 11: Monitoring & Logging**
**Goal:** Monitor and analyze your applications using Azure tools.

- **Intro:** Learn how to track app health, performance, and logs.
- **Topics:**
  - Azure Monitor basics
  - Log Analytics
  - Dashboards and alerts
- **Hands-on Labs:**
  - [Monitor and scale Azure applications](https://learn.microsoft.com/en-us/training/modules/monitor-azure-apps/)
  - [Analyze data with Azure Monitor logs](https://learn.microsoft.com/en-us/training/modules/analyze-data-azure-monitor-logs/)
- **Practical:** Set up monitoring and create a dashboard for your app.

---

## **Week 12: Cloud Security & Compliance**
**Goal:** Understand cloud security best practices and compliance requirements.

- **Intro:** Learn about cloud misconfigurations, IAM, and compliance standards.
- **Topics:**
  - Cloud security basics
  - Azure Active Directory (IAM)
  - Data protection and compliance (ISO 27001, local laws)
- **Hands-on Labs:**
  - [Manage identity and access in Azure Active Directory](https://learn.microsoft.com/en-us/training/modules/identity-access-management-azure-ad/)
  - [Secure your cloud data](https://learn.microsoft.com/en-us/training/modules/secure-your-cloud-data/)
  - [Azure compliance documentation](https://learn.microsoft.com/en-us/compliance/regulatory/)
- **Practical:** Apply IAM and compliance checks to your Azure resources.

---

**Tip:**
- Take notes and document your process each week.
- Push your code and notes to GitHub for your portfolio.
- Don’t rush—master each week before moving on!

---

# Phase 3: DevSecOps Integration (Weeks 9 - 12)

## **Week 9: Secure CI/CD Pipelines**
- **Day 57-58:** Integrating Trivy for container vulnerability scanning.
- **Day 59-60:** Integrating Snyk for open-source security scans.
- **Day 61-62:** Jenkins security: securing credentials, role-based access.
- **Day 63:** Practical: Build a Jenkins pipeline that fails builds on security vulnerabilities.

## **Week 10: Container Security & Web Security Basics**
- **Day 64-65:** Container hardening and best practices.
- **Day 66-67:** OWASP Top 10 practical overview.
- **Day 68-69:** Use OWASP ZAP to scan web applications.
- **Day 70:** Practical: Harden your Docker images and scan your deployed app.

## **Week 11: Monitoring & Logging**
- **Day 71-72:** Azure Monitor basics: monitoring CPU, memory, containers.  
  *Resource:* Microsoft Learn: "Monitor and scale Azure applications" ([link](https://learn.microsoft.com/en-us/training/modules/monitor-azure-apps/))
- **Day 73-74:** Azure Dashboards and Log Analytics.  
  *Resource:* Microsoft Learn: "Analyze data with Azure Monitor logs" ([link](https://learn.microsoft.com/en-us/training/modules/analyze-data-azure-monitor-logs/))
- **Day 75-76:** Centralized logging with ELK stack basics.
- **Day 77:** Practical: Set up monitoring and logging for your deployed app using Azure Monitor and Log Analytics.

## **Week 12: Cloud Security & Compliance**
- **Day 78-79:** Cloud security misconfigurations (Microsoft Learn: "Secure your cloud data")
- **Day 80-81:** Azure Active Directory security deep dive.  
  *Resource:* Microsoft Learn: "Manage identity and access in Azure Active Directory" ([link](https://learn.microsoft.com/en-us/training/modules/identity-access-management-azure-ad/))
- **Day 82-83:** Kenyan Data Protection Act, ISO 27001 basics.
- **Day 84:** Practical: Apply Azure AD security to your deployed Azure resources.

---

# Continuous Practice (After Week 12)
- Participate in GitHub DevSecOps projects.
- Build a portfolio of 2-3 fully secured CI/CD pipelines.
- Compete in TryHackMe, Hacker101, or Bugcrowd challenges.

---

# Freelance Fit: Pitch These Services
- CI/CD setup for SMEs.
- Secure cloud deployments for local fintechs.
- Dockerizing and automating legacy software.
- Cloud backup and disaster recovery solutions.

---

# Final Notes: What Would Make Banks Hire You?
- Ability to set up **secure CI/CD pipelines** (automated security scans).
- Strong Azure and container security basics.
- Solid understanding of **regulatory security** (Data Protection Act, ISO 27001).
- Confidence in **monitoring, logging, and incident response.**
- A strong **GitHub portfolio with real-world projects** showing deployment, security, and monitoring skills.

---

## If You Were Me:
- Focus on practical delivery.
- Document your process like a consultant (professional reports, README files).
- Push everything to GitHub.
- Start pitching simple freelance jobs by **Week 8-9** while learning advanced topics.

---

**Let’s refer to this as our master curriculum for your journey.**

