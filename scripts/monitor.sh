#!/bin/bash

# TechFlow Solutions - System Monitoring Script
# This script monitors system resources and service health

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

print_metric() {
    echo -e "${CYAN}$1${NC}"
}

# Configuration
LOG_FILE="./logs/monitor.log"
ALERT_THRESHOLD_CPU=80
ALERT_THRESHOLD_MEMORY=85
ALERT_THRESHOLD_DISK=90
CHECK_INTERVAL=30  # seconds

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -c, --continuous    Run in continuous monitoring mode"
    echo "  -i, --interval SEC  Set check interval in seconds (default: 30)"
    echo "  -l, --log           Enable logging to file"
    echo "  -s, --services      Monitor only services"
    echo "  -r, --resources     Monitor only system resources"
    echo "  -h, --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Single monitoring check"
    echo "  $0 -c                 # Continuous monitoring"
    echo "  $0 -c -i 60          # Continuous monitoring with 60s interval"
    echo "  $0 -s                 # Monitor only services"
}

# Function to create log directory
create_log_dir() {
    mkdir -p "$(dirname "$LOG_FILE")"
}

# Function to log message
log_message() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $message" >> "$LOG_FILE"
}

# Function to get CPU usage
get_cpu_usage() {
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    echo "$cpu_usage"
}

# Function to get memory usage
get_memory_usage() {
    local mem_info=$(free | grep Mem)
    local total=$(echo $mem_info | awk '{print $2}')
    local used=$(echo $mem_info | awk '{print $3}')
    local usage_percent=$((used * 100 / total))
    echo "$usage_percent"
}

# Function to get disk usage
get_disk_usage() {
    local disk_usage=$(df / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
    echo "$disk_usage"
}

# Function to check if service is running
check_service() {
    local service_name="$1"
    local port="$2"
    local url="$3"
    
    if [[ -n "$port" ]]; then
        # Check if port is listening
        if netstat -tuln | grep ":$port " > /dev/null 2>&1; then
            print_success "$service_name is running on port $port"
            return 0
        else
            print_error "$service_name is not running on port $port"
            return 1
        fi
    elif [[ -n "$url" ]]; then
        # Check if URL is accessible
        if curl -f "$url" > /dev/null 2>&1; then
            print_success "$service_name is accessible at $url"
            return 0
        else
            print_error "$service_name is not accessible at $url"
            return 1
        fi
    else
        # Check if process is running (special handling for Docker)
        if [[ "$service_name" == "Docker" ]]; then
            if docker info > /dev/null 2>&1; then
                print_success "$service_name is running"
                return 0
            else
                print_error "$service_name is not running"
                return 1
            fi
        else
            # Check if process is running
            if pgrep -f "$service_name" > /dev/null 2>&1; then
                print_success "$service_name process is running"
                return 0
            else
                print_error "$service_name process is not running"
                return 1
            fi
        fi
    fi
}

# Function to check Docker containers
check_docker_containers() {
    print_header "🐳 Docker Containers Status"
    
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed"
        return
    fi
    
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running"
        return
    fi
    
    local containers=$(docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}")
    if [[ -n "$containers" ]]; then
        echo "$containers"
    else
        print_warning "No containers are running"
    fi
}

# Function to check system resources
check_system_resources() {
    print_header "💻 System Resources"
    
    # CPU Usage
    local cpu_usage=$(get_cpu_usage)
    print_metric "CPU Usage: ${cpu_usage}%"
    if (( $(echo "$cpu_usage > $ALERT_THRESHOLD_CPU" | bc -l) )); then
        print_warning "CPU usage is above threshold ($ALERT_THRESHOLD_CPU%)"
    fi
    
    # Memory Usage
    local mem_usage=$(get_memory_usage)
    print_metric "Memory Usage: ${mem_usage}%"
    if (( mem_usage > ALERT_THRESHOLD_MEMORY )); then
        print_warning "Memory usage is above threshold ($ALERT_THRESHOLD_MEMORY%)"
    fi
    
    # Disk Usage
    local disk_usage=$(get_disk_usage)
    print_metric "Disk Usage: ${disk_usage}%"
    if (( disk_usage > ALERT_THRESHOLD_DISK )); then
        print_warning "Disk usage is above threshold ($ALERT_THRESHOLD_DISK%)"
    fi
    
    # Load Average
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    print_metric "Load Average: $load_avg"
    
    # Uptime
    local uptime_info=$(uptime -p)
    print_metric "Uptime: $uptime_info"
}

# Function to check services
check_services() {
    print_header "🔧 Services Status"
    
    # Check PostgreSQL (Docker container port)
    check_service "PostgreSQL" "5434"
    
    # Check Redis
    check_service "Redis" "6379"
    
    # Check Frontend (Next.js)
    check_service "Frontend" "3000" "http://localhost:3000"
    
    # Check Backend (Express API)
    check_service "Backend" "3001" "http://localhost:3001/health"
    
    # Check Docker
    check_service "Docker" "" ""
}

# Function to check network connectivity
check_network() {
    print_header "🌐 Network Connectivity"
    
    # Check localhost connectivity
    if ping -c 1 localhost > /dev/null 2>&1; then
        print_success "Localhost connectivity: OK"
    else
        print_error "Localhost connectivity: FAILED"
    fi
    
    # Check internet connectivity
    if ping -c 1 8.8.8.8 > /dev/null 2>&1; then
        print_success "Internet connectivity: OK"
    else
        print_warning "Internet connectivity: FAILED"
    fi
    
    # Check DNS resolution
    if nslookup google.com > /dev/null 2>&1; then
        print_success "DNS resolution: OK"
    else
        print_warning "DNS resolution: FAILED"
    fi
}

# Function to check open ports
check_open_ports() {
    print_header "🔌 Open Ports"
    
    local open_ports=$(netstat -tuln | grep LISTEN | awk '{print $4}' | cut -d':' -f2 | sort -n | uniq)
    
    if [[ -n "$open_ports" ]]; then
        echo "Open ports: $open_ports"
    else
        print_warning "No open ports found"
    fi
}

# Function to perform single monitoring check
single_check() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    print_header "📊 System Monitoring Report - $timestamp"
    echo ""
    
    check_system_resources
    echo ""
    
    check_services
    echo ""
    
    check_docker_containers
    echo ""
    
    check_network
    echo ""
    
    check_open_ports
    echo ""
    
    print_header "✅ Monitoring check completed"
}

# Function to run continuous monitoring
continuous_monitoring() {
    print_status "Starting continuous monitoring (interval: ${CHECK_INTERVAL}s)"
    print_status "Press Ctrl+C to stop"
    echo ""
    
    while true; do
        single_check
        
        if [[ "$ENABLE_LOGGING" == true ]]; then
            log_message "Monitoring check completed"
        fi
        
        echo ""
        print_status "Next check in ${CHECK_INTERVAL} seconds..."
        sleep "$CHECK_INTERVAL"
        echo ""
        echo "----------------------------------------"
        echo ""
    done
}

# Parse command line arguments
CONTINUOUS=false
ENABLE_LOGGING=false
MONITOR_SERVICES_ONLY=false
MONITOR_RESOURCES_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--continuous)
            CONTINUOUS=true
            shift
            ;;
        -i|--interval)
            CHECK_INTERVAL="$2"
            shift 2
            ;;
        -l|--log)
            ENABLE_LOGGING=true
            shift
            ;;
        -s|--services)
            MONITOR_SERVICES_ONLY=true
            shift
            ;;
        -r|--resources)
            MONITOR_RESOURCES_ONLY=true
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

# Create log directory if logging is enabled
if [[ "$ENABLE_LOGGING" == true ]]; then
    create_log_dir
fi

# Main execution
if [[ "$CONTINUOUS" == true ]]; then
    continuous_monitoring
else
    single_check
fi 