# Networking Deep Dive Lab (DevSecOps Essentials)

This lab notebook is your hands-on guide to mastering the most important networking concepts and workflows for DevSecOps. For each step, follow the instructions, record your output, and reflect on what you learned.

---

## Step 1: HTTP/HTTPS Requests & Debugging
**Goal:** Understand how web requests work, analyze them using browser DevTools, and use curl for API testing.

**Instructions:**
- Add a button to your frontend that fetches data from a public API (e.g., https://jsonplaceholder.typicode.com/posts/1).
- Open your browser DevTools → Network tab. Click the button and observe the request/response (method, status, headers, CORS).
- Use curl to make the same request from your terminal. Record the output.

**Output:**

**Notes/Reflection:**

---

## Step 2: Proxies in Local Development
**Goal:** Learn why and how to use a proxy for local development (CORS, security, API routing).

**Instructions:**
- Configure your frontend dev server to proxy API requests to a backend or public API (e.g., using next.config.js or http-proxy-middleware).
- Make a request through the proxy and observe how the request path, headers, and CORS behavior change.

**Output:**

**Notes/Reflection:**
the front end and backend of an app have a relationship. for them to communicate, while in the development env we need to configure the front ends to proxy API requests to backends. You can always use curl to test the requests. in next js we configure this in the next.config.ts or js. 

eg.   // next.config.js
     module.exports = {
       async rewrites() {
         return [
           {
             source: '/api/:path*',
             destination: 'http://localhost:3001/api/:path*', // Proxy to backend
           },
         ];
       },
     };

     This means requests to /api/case-studies from the frontend will be transparently proxied to your backend.

---

## Step 3: Linux Firewall (ufw) Basics
**Goal:** Understand how to secure your development environment using a firewall.

**Instructions:**
- Enable ufw: `sudo ufw enable`
- Allow HTTP: `sudo ufw allow 80`
- Deny a port (e.g., 8080): `sudo ufw deny 8080`
- Check status: `sudo ufw status`
- Try to access those ports locally (browser/curl) and observe the effect.

**Output:**

**Notes/Reflection:**

---

## Step 4: Essential Networking Tools
**Goal:** Use key networking tools to test and debug connectivity.

**Instructions:**
- Use `curl` to GET your frontend or a public API. Record the output and headers.
- Use `ping` and `traceroute` to check connectivity to google.com. Record the results.
- Use `netstat` or `ss` to see open ports and connections on your machine.

**Output:**

**Notes/Reflection:**

---

## Step 5: (Optional) Docker Networking
**Goal:** Explore how Docker handles networking for containers.

**Instructions:**
- List Docker networks: `docker network ls`
- Inspect a network: `docker network inspect <network-name>`
- Run two containers on the same network and test communication between them.

**Output:**

**Notes/Reflection:**

---

## Step 6: (Optional) Add a Reverse Proxy
**Goal:** Set up a simple reverse proxy (e.g., Nginx) to route traffic to your frontend/backend.

**Instructions:**
- Install Nginx: `sudo apt install nginx`
- Configure a basic reverse proxy in `/etc/nginx/sites-available/default`.
- Restart Nginx and test routing.

**Output:**

**Notes/Reflection:**

---

## Step 7: Reflection
**Key lessons:**

**Gotchas:** 