#!/bin/bash
# scripts/network-manager.sh

**Task 1: Configure Firewall**
```bash
# Check current firewall status
sudo ufw status

# Allow necessary ports
sudo ufw allow 3000/tcp  # Frontend
sudo ufw allow 3001/tcp  # Backend
sudo ufw allow 5434/tcp  # Database
sudo ufw allow 6379/tcp  # Redis

# Enable firewall
sudo ufw enable
```

**Task 2: Network Monitoring Script**
Create `scripts/network-monitor.sh`:

```bash
#!/bin/bash
# scripts/network-monitor.sh

set -e

# Function to check port status
check_port() {
    local port="$1"
    local service="$2"
    
    if netstat -tuln | grep ":$port " > /dev/null 2>&1; then
        print_success "$service is listening on port $port"
        return 0
    else
        print_error "$service is not listening on port $port"
        return 1
    fi
}

# Function to check connectivity
check_connectivity() {
    local host="$1"
    local description="$2"
    
    if ping -c 1 "$host" > /dev/null 2>&1; then
        print_success "$description: OK"
        return 0
    else
        print_error "$description: FAILED"
        return 1
    fi
}

# Main monitoring
print_header "🌐 Network Status Check"

# Check local services
check_port 3000 "Frontend"
check_port 3001 "Backend"
check_port 5434 "Database"
check_port 6379 "Redis"

# Check connectivity
check_connectivity "localhost" "Localhost"
check_connectivity "8.8.8.8" "Internet"
check_connectivity "google.com" "DNS Resolution"
```