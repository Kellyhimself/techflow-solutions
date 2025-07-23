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
