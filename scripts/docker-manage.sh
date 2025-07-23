#!/bin/bash

# TechFlow Solutions - Docker Management Script
# This script provides comprehensive Docker container and image management

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

print_header() {
    echo -e "${PURPLE}$1${NC}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start       Start all services (docker-compose up -d)"
    echo "  stop        Stop all services (docker-compose down)"
    echo "  restart     Restart all services"
    echo "  reset       Full reset: stop, clean, prune, and start all services"
    echo "  status      Show status of all containers"
    echo "  logs        Show logs for a specific service"
    echo "  build       Build all services"
    echo "  rebuild     Rebuild all services (force rebuild)"
    echo "  clean       Clean up unused Docker resources"
    echo "  backup      Create backup of container data"
    echo "  restore     Restore container data from backup"
    echo "  shell       Open shell in a specific container"
    echo "  exec        Execute command in a specific container"
    echo ""
    echo "Options:"
    echo "  -s, --service SERVICE    Specify service name for logs/shell/exec"
    echo "  -c, --command COMMAND    Command to execute (for exec command)"
    echo "  -f, --follow             Follow logs (for logs command)"
    echo "  -n, --lines NUMBER       Number of log lines to show (default: 50)"
    echo "  --help                   Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start                           # Start all services"
    echo "  $0 logs -s backend -f              # Follow backend logs"
    echo "  $0 shell -s frontend               # Open shell in frontend container"
    echo "  $0 exec -s backend -c 'npm test'   # Run npm test in backend"
    echo "  $0 clean                           # Clean up Docker resources"
}

# Function to check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
}

# Function to start services
start_services() {
    print_status "Starting TechFlow Solutions services..."
    
    if docker compose up -d; then
        print_success "All services started successfully"
        print_status "Services:"
        docker compose ps
    else
        print_error "Failed to start services"
        exit 1
    fi
}

# Function to stop services
stop_services() {
    print_status "Stopping TechFlow Solutions services..."
    
    if docker compose down; then
        print_success "All services stopped successfully"
    else
        print_error "Failed to stop services"
        exit 1
    fi
}

# Function to restart services
restart_services() {
    print_status "Restarting TechFlow Solutions services..."
    
    stop_services
    sleep 2
    start_services
}

# Function to show service status
show_status() {
    print_header "📊 TechFlow Solutions Service Status"
    echo ""
    
    if docker compose ps; then
        echo ""
        print_header "🔍 Container Resource Usage"
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
    else
        print_error "Failed to get service status"
        exit 1
    fi
}

# Function to show logs
show_logs() {
    local service="$1"
    local follow="$2"
    local lines="$3"
    
    if [[ -z "$service" ]]; then
        print_error "Please specify a service name"
        echo "Available services:"
        docker compose config --services
        exit 1
    fi
    
    print_status "Showing logs for service: $service"
    
    local log_cmd="docker compose logs"
    
    if [[ "$follow" == true ]]; then
        log_cmd="$log_cmd -f"
    fi
    
    if [[ -n "$lines" ]]; then
        log_cmd="$log_cmd --tail=$lines"
    fi
    
    log_cmd="$log_cmd $service"
    
    if ! eval "$log_cmd"; then
        print_error "Failed to show logs for service: $service"
        exit 1
    fi
}

# Function to build services
build_services() {
    local force_rebuild="$1"
    
    print_status "Building TechFlow Solutions services..."
    
    local build_cmd="docker compose build"
    
    if [[ "$force_rebuild" == true ]]; then
        build_cmd="$build_cmd --no-cache"
        print_status "Force rebuilding (no cache)..."
    fi
    
    if eval "$build_cmd"; then
        print_success "All services built successfully"
        
        # Automatically restart services after successful build
        print_status "Restarting services with new images..."
        if docker compose up -d; then
            print_success "All services restarted successfully"
            print_status "Services:"
            docker compose ps
        else
            print_error "Failed to restart services"
            exit 1
        fi
    else
        print_error "Failed to build services"
        exit 1
    fi
}

# Function to clean Docker resources
clean_resources() {
    print_status "Cleaning up Docker resources..."
    
    # Remove stopped containers
    local stopped_containers=$(docker container ls -a -q -f status=exited)
    if [[ -n "$stopped_containers" ]]; then
        print_status "Removing stopped containers..."
        docker container rm "$stopped_containers"
    fi
    
    # Remove unused images
    local unused_images=$(docker images -q -f dangling=true)
    if [[ -n "$unused_images" ]]; then
        print_status "Removing unused images..."
        docker rmi "$unused_images"
    fi
    
    # Remove unused volumes
    local unused_volumes=$(docker volume ls -q -f dangling=true)
    if [[ -n "$unused_volumes" ]]; then
        print_status "Removing unused volumes..."
        docker volume rm "$unused_volumes"
    fi
    
    # Remove unused networks
    local unused_networks=$(docker network ls -q -f type=custom)
    if [[ -n "$unused_networks" ]]; then
        print_status "Removing unused networks..."
        docker network rm "$unused_networks" 2>/dev/null || true
    fi
    
    print_success "Docker cleanup completed"
}

# Function to create backup
create_backup() {
    local backup_dir="./backups/docker"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="$backup_dir/backup_$timestamp.tar"
    
    print_status "Creating Docker backup..."
    
    mkdir -p "$backup_dir"
    
    # Stop services before backup
    print_status "Stopping services for backup..."
    docker compose down
    
    # Create backup of volumes
    if docker run --rm -v techflow-solutions_postgres_data:/data -v "$(pwd)/$backup_dir":/backup alpine tar czf "/backup/postgres_$timestamp.tar.gz" -C /data .; then
        print_success "PostgreSQL data backed up: postgres_$timestamp.tar.gz"
    else
        print_warning "Failed to backup PostgreSQL data"
    fi
    
    # Create backup of configuration
    if tar czf "$backup_file" docker-compose.yml infrastructure/ scripts/; then
        print_success "Configuration backed up: $(basename "$backup_file")"
    else
        print_warning "Failed to backup configuration"
    fi
    
    # Restart services
    print_status "Restarting services..."
    docker compose up -d
    
    print_success "Backup completed successfully"
}

# Function to restore backup
restore_backup() {
    local backup_file="$1"
    
    if [[ -z "$backup_file" ]]; then
        print_error "Please specify a backup file to restore"
        echo "Available backups:"
        ls -la ./backups/docker/ 2>/dev/null || echo "No backups found"
        exit 1
    fi
    
    local backup_path="./backups/docker/$backup_file"
    
    if [[ ! -f "$backup_path" ]]; then
        print_error "Backup file not found: $backup_path"
        exit 1
    fi
    
    print_warning "This will overwrite current data. Are you sure? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_status "Restore cancelled"
        exit 0
    fi
    
    print_status "Restoring from backup: $backup_file"
    
    # Stop services
    docker compose down
    
    # Restore configuration
    if tar xzf "$backup_path"; then
        print_success "Configuration restored"
    else
        print_error "Failed to restore configuration"
        exit 1
    fi
    
    # Restart services
    docker compose up -d
    
    print_success "Restore completed successfully"
}

# Function to open shell in container
open_shell() {
    local service="$1"
    
    if [[ -z "$service" ]]; then
        print_error "Please specify a service name"
        echo "Available services:"
        docker compose config --services
        exit 1
    fi
    
    print_status "Opening shell in service: $service"
    
    if ! docker compose exec "$service" /bin/bash; then
        # Try with sh if bash is not available
        if ! docker compose exec "$service" /bin/sh; then
            print_error "Failed to open shell in service: $service"
            exit 1
        fi
    fi
}

# Function to test database connection
db_test_connection() {
    print_status "Checking if database container is running..."
    if ! docker ps | grep -q techflow_db; then
        print_warning "Database container is not running. Starting it..."
        docker compose up -d db
        sleep 5  # Give it a moment to start
    else
        print_success "Database container is already running."
    fi

    print_status "Testing database connection with psql..."
    if ! command -v psql &> /dev/null; then
        print_error "psql is not installed. Please install postgresql-client."
        exit 1
    fi

    # Try to connect and list databases
    if PGPASSWORD=password psql -h localhost -U postgres -d techflow_dev -c '\l'; then
        print_success "Successfully connected to the database!"
    else
        print_error "Failed to connect to the database. Check Docker logs and credentials."
        exit 1
    fi
}

# Function to execute command in container
execute_command() {
    local service="$1"
    local command="$2"
    
    if [[ -z "$service" ]]; then
        print_error "Please specify a service name"
        exit 1
    fi
    
    if [[ -z "$command" ]]; then
        print_error "Please specify a command to execute"
        exit 1
    fi
    
    print_status "Executing command in service: $service"
    print_status "Command: $command"
    
    if ! docker compose exec "$service" sh -c "$command"; then
        print_error "Failed to execute command in service: $service"
        exit 1
    fi
}

# Function to perform a full reset (cleanup and restart)
reset_services() {
    print_warning "This will stop all containers, remove all volumes, prune all unused Docker resources, and restart services. This is DESTRUCTIVE. Continue? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_status "Reset cancelled"
        exit 0
    fi
    print_status "Stopping and removing all containers, volumes, and orphans..."
    docker compose down --volumes --remove-orphans
    print_status "Pruning all unused Docker resources..."
    docker system prune -af
    print_status "Starting all services..."
    docker compose up -d
    print_success "Full reset completed. All services are up."
    docker compose ps
}

# Parse command line arguments
COMMAND=""
SERVICE=""
COMMAND_TO_EXEC=""
FOLLOW_LOGS=false
LOG_LINES="50"

while [[ $# -gt 0 ]]; do
    case $1 in
        start|stop|restart|reset|status|logs|build|rebuild|clean|backup|restore|shell|dbtest|exec)
            COMMAND="$1"
            shift
            ;;
        -s|--service)
            SERVICE="$2"
            shift 2
            ;;
        -c|--command)
            COMMAND_TO_EXEC="$2"
            shift 2
            ;;
        -f|--follow)
            FOLLOW_LOGS=true
            shift
            ;;
        -n|--lines)
            LOG_LINES="$2"
            shift 2
            ;;
        --help)
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

# Check if command is provided
if [[ -z "$COMMAND" ]]; then
    print_error "Please specify a command"
    show_usage
    exit 1
fi

# Check prerequisites
check_docker
check_docker_compose

# Main execution
case "$COMMAND" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    reset)
        reset_services
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs "$SERVICE" "$FOLLOW_LOGS" "$LOG_LINES"
        ;;
    build)
        build_services false
        ;;
    rebuild)
        build_services true
        ;;
    clean)
        clean_resources
        ;;
    backup)
        create_backup
        ;;
    restore)
        restore_backup "$SERVICE"
        ;;
    shell)
        open_shell "$SERVICE"
        ;;
    dbtest)
        db_test_connection
        ;;
    exec)
        execute_command "$SERVICE" "$COMMAND_TO_EXEC"
        ;;
    *)
        print_error "Unknown command: $COMMAND"
        show_usage
        exit 1
        ;;
esac 