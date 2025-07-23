# Azure Cloud Basics (DevSecOps Week 3) - Microsoft Learn Path

## Overview & Goals
This document guides you through the essential, industry-standard Azure skills every DevSecOps engineer must know using **Microsoft Learn's free sandbox environments**. By the end, you'll have:
- Launched and secured an Azure Virtual Machine (VM)
- Used Blob Storage for secure, versioned storage
- Managed access with Azure Active Directory (AD)
- Understood Virtual Network (VNet) basics
- Deployed a static website to Blob Storage

**No credit card required - all labs use Microsoft Learn sandboxes!**

---

## Microsoft Learn Learning Path
**Complete this learning path:** [Azure Fundamentals](https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/)

---

https://learn.microsoft.com/api/achievements/share/en-us/KellyHimself-3623/H7TDFPE8?sharingId=614B449FA10FDB46

## 1. Virtual Machines (VMs): Launch & Secure a Cloud Server
**Goal:** Launch, secure, and connect to a VM using best practices.

### Microsoft Learn Modules:
- [Create a virtual machine](https://docs.microsoft.com/en-us/learn/modules/create-vm-azure/)
- [Secure your Azure resources with network security groups](https://docs.microsoft.com/en-us/learn/modules/secure-network-connectivity/)

### Steps:
- [ ] Complete the "Create a virtual machine" module
- [ ] Complete the "Secure your Azure resources" module
- [ ] Document your VM details (public IP, OS, NSG rules, etc.)
- [ ] Take screenshots of your completed labs

**Industry Standard:** Never expose SSH to 0.0.0.0/0; use least-privilege NSG rules.

---

## 2. Blob Storage: Secure, Scalable Storage
**Goal:** Store and serve static assets securely.

### Microsoft Learn Modules:
- [Store data in Azure](https://learn.microsoft.com/en-us/training/modules/store-data-in-azure/)
- [Secure your Azure storage account](https://docs.microsoft.com/en-us/learn/modules/secure-azure-storage-account/)

### Steps:
- [ ] Complete the "Store data in Azure" module
- [ ] Complete the "Secure your Azure storage account" module
- [ ] Create a Blob container and upload files
- [ ] Enable soft delete/versioning for blobs
- [ ] Document container access policies and versioning settings

**Industry Standard:** Never store secrets in Blob Storage; always enable versioning/soft delete for important data.

---

## 3. Azure Active Directory (AD): Identity & Access Management
**Goal:** Control access to Azure resources securely.

### Microsoft Learn Modules:
- [Manage access with Azure Active Directory](https://docs.microsoft.com/en-us/learn/modules/manage-access-with-azure-active-directory/)
- [Secure your Azure resources with Azure role-based access control](https://docs.microsoft.com/en-us/learn/modules/secure-azure-resources-with-rbac/)

### Steps:
- [ ] Complete the "Manage access with Azure Active Directory" module
- [ ] Complete the "Secure your Azure resources with RBAC" module
- [ ] Create a new user and assign roles
- [ ] Document user/role setup

**Industry Standard:** Never use global admin for daily tasks; always use roles and MFA.

---

## 4. Virtual Network (VNet): Networking Security
**Goal:** Understand Azure networking and resource isolation.

### Microsoft Learn Modules:
- [Connect your services together](https://docs.microsoft.com/en-us/learn/modules/connect-services-together/)
- [Design and implement Azure networking](https://docs.microsoft.com/en-us/learn/modules/design-implement-azure-networking/)

### Steps:
- [ ] Complete the "Connect your services together" module
- [ ] Complete the "Design and implement Azure networking" module
- [ ] Document VNet/subnet setup

**Industry Standard:** Use private subnets for backend resources; public only for load balancers or jump hosts.

---

## 5. Deploy a Static Website to Blob Storage
**Goal:** Host your frontend or a simple HTML page on Blob Storage.

### Microsoft Learn Modules:
- [Host a web application with Azure App Service](https://docs.microsoft.com/en-us/learn/modules/host-a-web-app-with-azure-app-service/)
- [Store application data with Azure Blob storage](https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/)

### Steps:
- [ ] Complete the "Host a web application" module
- [ ] Complete the "Store application data with Azure Blob storage" module
- [ ] Enable static website hosting on your Storage Account
- [ ] Upload your frontend build or index.html
- [ ] Document the endpoint URL

**Industry Standard:** For production, use Azure CDN + HTTPS.

---

## Microsoft Learn Sandbox Benefits
- **No credit card required**
- **Pre-configured environments**
- **Guided step-by-step instructions**
- **Real Azure portal access**
- **Automatic cleanup** (no billing concerns)
- **Industry-recognized** learning experience

---

## Checklist: What to Document
- VM details (IP, OS, NSG rules)
- Storage Account/container name, access policies, versioning
- Azure AD user/role setup
- VNet/subnet details
- Static site endpoint
- Screenshots of completed labs
- Microsoft Learn module completion certificates

---

## Reflection
- What did you find easy/hard?
- How does Microsoft Learn compare to manual Azure setup?
- What would you automate next time?
- How does this compare to local/server deployments?

---

## Next Steps After Microsoft Learn
- Consider pursuing [Microsoft Certified: Azure Fundamentals (AZ-900)](https://docs.microsoft.com/en-us/learn/certifications/exams/az-900)
- Practice with real Azure account (if billing issues are resolved)
- Apply these concepts to your DevSecOps projects 