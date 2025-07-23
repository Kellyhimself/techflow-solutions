#!/bin/bash

# TechFlow Solutions - Deployment Script
# This script handles deployment of frontend and backend services

set -e  # Exit on any error

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

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -f, --frontend    Deploy frontend only"
    echo "  -b, --backend     Deploy backend only"
    echo "  -a, --all         Deploy both frontend and backend (default)"
    echo "  -e, --environment ENV  Set environment (dev|staging|prod) (default: dev)"
    echo "  -c, --clean       Clean node_modules and package-lock.json before install"
    echo "  -h, --help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Deploy all services to dev"
    echo "  $0 -f -e prod         # Deploy frontend to production"
    echo "  $0 -b -e staging      # Deploy backend to staging"
}

# Default values
DEPLOY_FRONTEND=false
DEPLOY_BACKEND=false
ENVIRONMENT="dev"
CLEAN_INSTALL=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -f|--frontend)
            DEPLOY_FRONTEND=true
            shift
            ;;
        -b|--backend)
            DEPLOY_BACKEND=true
            shift
            ;;
        -a|--all)
            DEPLOY_FRONTEND=true
            DEPLOY_BACKEND=true
            shift
            ;;
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -c|--clean)
            CLEAN_INSTALL=true
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# If no specific service selected, deploy all
if [[ "$DEPLOY_FRONTEND" == false && "$DEPLOY_BACKEND" == false ]]; then
    DEPLOY_FRONTEND=true
    DEPLOY_BACKEND=true
fi

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(dev|staging|prod)$ ]]; then
    print_error "Invalid environment: $ENVIRONMENT. Must be dev, staging, or prod"
    exit 1
fi

print_status "Starting deployment for environment: $ENVIRONMENT"

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}
# Function to log messages
log_message() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $message" >> "./logs/deploy.log"
}


# Function to deploy frontend
deploy_frontend() {
    print_status "Deploying frontend..."
    
    cd frontend
    
    # Clean node_modules and package-lock.json if requested
    if [[ "$CLEAN_INSTALL" == true ]]; then
        print_status "Cleaning node_modules and package-lock.json..."
        rm -rf node_modules package-lock.json
    fi
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Build the application
    print_status "Building frontend application..."
    if [[ "$ENVIRONMENT" == "prod" ]]; then
        npm run build
        npm run export
    else
        npm run build
    fi
    
    # If production, deploy to S3 (placeholder for AWS deployment)
    if [[ "$ENVIRONMENT" == "prod" ]]; then
        print_warning "Production deployment to S3 would happen here"
        print_status "For now, starting development server..."
        npm run dev &
    else
        print_status "Starting frontend development server..."
        npm run dev &
    fi
    
    cd ..
    print_success "Frontend deployment completed"
}

# Function to deploy backend
deploy_backend() {
    print_status "Deploying backend..."
    
    cd backend
    
    # Clean node_modules and package-lock.json if requested
    if [[ "$CLEAN_INSTALL" == true ]]; then
        print_status "Cleaning node_modules and package-lock.json..."
        rm -rf node_modules package-lock.json
    fi
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    # Run database migrations
    print_status "Running database migrations..."
    npx prisma migrate deploy
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npx prisma generate
    
    # Start the server
    print_status "Starting backend server..."
    if [[ "$ENVIRONMENT" == "prod" ]]; then
        npm run start &
    else
        npm run dev &
    fi
    
    cd ..
    print_success "Backend deployment completed"
}

# Function to check service health
check_health() {
    print_status "Checking service health..."
    
    # Wait a moment for services to start
    sleep 5
    
    # Check frontend health
    if [[ "$DEPLOY_FRONTEND" == true ]]; then
        if curl -f http://localhost:3000 > /dev/null 2>&1; then
            print_success "Frontend is healthy: http://localhost:3000"
        else
            print_warning "Frontend health check failed"
        fi
    fi
    
    # Check backend health
    if [[ "$DEPLOY_BACKEND" == true ]]; then
        if curl -f http://localhost:3001/health > /dev/null 2>&1; then
            print_success "Backend is healthy: http://localhost:3001/health"
        else
            print_warning "Backend health check failed"
        fi
    fi
}

# Main deployment process
main() {
    print_status "🚀 Starting TechFlow Solutions deployment..."
    
    # Check prerequisites
    check_docker
    
    # Create logs directory
    mkdir -p logs
    
    # Deploy services
    if [[ "$DEPLOY_FRONTEND" == true ]]; then
        deploy_frontend
    fi
    
    if [[ "$DEPLOY_BACKEND" == true ]]; then
        deploy_backend
    fi
    
    # Check health
    check_health
    
    print_success "🎉 Deployment completed successfully!"
    print_status "Services:"
    [[ "$DEPLOY_FRONTEND" == true ]] && echo "  - Frontend: http://localhost:3000"
    [[ "$DEPLOY_BACKEND" == true ]] && echo "  - Backend: http://localhost:3001"
    echo "  - Database: localhost:5432"
    echo "  - Redis: localhost:6379"
}

# Run main function
main "$@" 