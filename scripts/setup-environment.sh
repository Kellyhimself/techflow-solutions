#!/bin/bash

# TechFlow Solutions - Development Environment Setup Script
# This script automates the setup of our development environment

set -e  # Exit on any error

echo "🚀 Setting up TechFlow Solutions development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Check and install Node.js
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_warning "Node.js not found. Installing via NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install --lts
    nvm use --lts
else
    print_success "Node.js is already installed: $(node --version)"
fi

# Check and install Docker
print_status "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_warning "Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    print_warning "Docker installed. Please log out and back in for group changes to take effect."
else
    print_success "Docker is already installed: $(docker --version)"
fi

# Check and install Docker Compose
print_status "Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null; then
    print_warning "Docker Compose not found. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    print_success "Docker Compose is already installed: $(docker-compose --version)"
fi

# Install PostgreSQL client tools
print_status "Installing PostgreSQL client tools..."
sudo apt install -y postgresql-client

# Create project directories if they don't exist
print_status "Creating project directories..."
mkdir -p frontend backend infrastructure scripts docs

# Create .gitignore files
print_status "Creating .gitignore files..."

# Root .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.next/
out/

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Docker
.dockerignore

# AWS
.aws/

# Terraform
*.tfstate
*.tfstate.*
.terraform/
.terraform.lock.hcl

# Database
*.db
*.sqlite
EOF

# Frontend .gitignore
cat > frontend/.gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Logs
*.log

# IDE
.vscode/
.idea/
EOF

# Backend .gitignore
cat > backend/.gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/

# IDE
.vscode/
.idea/
EOF

# Create environment files template
print_status "Creating environment file templates..."

# Frontend environment template
cat > frontend/.env.example << 'EOF'
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

# Backend environment template
cat > backend/.env.example << 'EOF'
# Backend Environment Variables
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/techflow_dev

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# AWS (for production)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket
EOF

# Create Docker Compose for development
print_status "Creating Docker Compose configuration..."
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL Database
  db:
    image: postgres:15
    container_name: techflow_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: techflow_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./infrastructure/db/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - techflow_network

  # Redis (for caching)
  redis:
    image: redis:7-alpine
    container_name: techflow_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    networks:
      - techflow_network

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: techflow_backend
    restart: unless-stopped
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://postgres:password@db:5432/techflow_dev
      REDIS_URL: redis://redis:6379
    ports:
      - "3001:3001"
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      - db
      - redis
    networks:
      - techflow_network

  # Frontend (Next.js)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: techflow_frontend
    restart: unless-stopped
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - techflow_network

volumes:
  postgres_data:

networks:
  techflow_network:
    driver: bridge
EOF

# Create database initialization script
print_status "Creating database initialization script..."
mkdir -p infrastructure/db
cat > infrastructure/db/init.sql << 'EOF'
-- TechFlow Solutions Database Initialization
-- This script creates the initial database schema

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id INTEGER REFERENCES users(id),
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    client_name VARCHAR(255),
    industry VARCHAR(100),
    technologies TEXT[],
    results TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    message TEXT NOT NULL,
    service_interest VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Insert default admin user (password: admin123 - change this in production!)
INSERT INTO users (email, password_hash, role) 
VALUES ('admin@techflow.com', '$2b$10$rQZ8K9mX2nL1pQ3sT5uV7w', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, content, excerpt, published) 
VALUES (
    'Getting Started with DevSecOps',
    'getting-started-with-devsecops',
    'DevSecOps is the integration of security practices within the DevOps process...',
    'Learn the fundamentals of DevSecOps and how to implement security in your development pipeline.',
    true
) ON CONFLICT (slug) DO NOTHING;

-- Insert sample case study
INSERT INTO case_studies (title, slug, description, client_name, industry, technologies, published) 
VALUES (
    'Secure CI/CD Implementation for FinTech',
    'secure-cicd-fintech',
    'Implemented a secure CI/CD pipeline for a leading fintech company...',
    'FinTech Solutions Inc.',
    'Financial Services',
    ARRAY['Jenkins', 'Docker', 'AWS', 'SonarQube'],
    true
) ON CONFLICT (slug) DO NOTHING;
EOF

# Set execute permissions
chmod +x scripts/setup-environment.sh

print_success "Environment setup script created successfully!"
print_status "Next steps:"
echo "1. Run: ./scripts/setup-environment.sh"
echo "2. Start Docker services: docker-compose up -d"
echo "3. Initialize frontend: cd frontend && npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias '@/*'"
echo "4. Initialize backend: cd backend && npm init -y && npm install express typescript @types/node @types/express prisma @prisma/client"

print_success "🎉 TechFlow Solutions development environment setup complete!" 