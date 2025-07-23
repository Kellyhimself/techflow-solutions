#!/bin/bash
# scripts/service-manager.sh

set -e

SERVICES=("frontend" "backend" "database" "redis")

# Function to check service status
check_service_status() {
    local service="$1"
    
    case "$service" in
        frontend)
            curl -f http://localhost:3000 > /dev/null 2>&1
            ;;
        backend)
            curl -f http://localhost:3001/health > /dev/null 2>&1
            ;;
        database)
            docker-compose exec -T db pg_isready -U postgres > /dev/null 2>&1
            ;;
        redis)
            docker-compose exec -T redis redis-cli ping > /dev/null 2>&1
            ;;
        *)
            return 1
            ;;
    esac
}

# Function to start service
start_service() {
    local service="$1"
    print_status "Starting $service..."
    
    case "$service" in
        frontend|backend|database|redis)
            docker-compose up -d "$service"
            ;;
        *)
            print_error "Unknown service: $service"
            return 1
            ;;
    esac
}

# Function to stop service
stop_service() {
    local service="$1"
    print_status "Stopping $service..."
    
    case "$service" in
        frontend|backend|database|redis)
            docker-compose stop "$service"
            ;;
        *)
            print_error "Unknown service: $service"
            return 1
            ;;
    esac
}

# Function to restart service
restart_service() {
    local service="$1"
    stop_service "$service"
    sleep 2
    start_service "$service"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [SERVICE]"
    echo ""
    echo "Commands:"
    echo "  start SERVICE     Start a specific service"
    echo "  stop SERVICE      Stop a specific service"
    echo "  restart SERVICE   Restart a specific service"
    echo "  status SERVICE    Check service status"
    echo "  status-all        Check status of all services"
    echo ""
    echo "Services:"
    for service in "${SERVICES[@]}"; do
        echo "  $service"
    done
}

# Main execution
case "$1" in
    start)
        start_service "$2"
        ;;
    stop)
        stop_service "$2"
        ;;
    restart)
        restart_service "$2"
        ;;
    status)
        if check_service_status "$2"; then
            print_success "$2 is running"
        else
            print_error "$2 is not running"
        fi
        ;;
    status-all)
        for service in "${SERVICES[@]}"; do
            if check_service_status "$service"; then
                print_success "$service: RUNNING"
            else
                print_error "$service: STOPPED"
            fi
        done
        ;;
    *)
        show_usage
        exit 1
        ;;
esac
```