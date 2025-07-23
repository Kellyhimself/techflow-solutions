# Week 1: Linux Mastery & Bash Scripting Practice Guide

## 🎯 Current Status: Environment Setup Complete ✅

You've successfully completed the environment setup phase and your scripts are working! Now it's time to dive into **Week 1: Linux Mastery** from your DevSecOps learning plan, specifically focusing on **Days 3-5: Bash Scripting & Practical Linux**.

## 📋 What You've Accomplished

✅ **Environment Setup Complete:**
- Created comprehensive setup script (`scripts/setup-environment.sh`)
- Set up project structure (frontend, backend, infrastructure)
- Created Docker Compose configuration
- Set up PostgreSQL database with initial schema
- Created deployment, monitoring, and management scripts

✅ **Scripts Working:**
- `scripts/deploy.sh` - Deployment automation ✅
- `scripts/database-backup.sh` - Database management ✅
- `scripts/monitor.sh` - System monitoring ✅
- `scripts/docker-manage.sh` - Container management ✅

## 🚀 Next Steps: Week 1 Focus Areas

### **Day 3-4: Bash Scripting & Automation** (Current Focus)

You now have these powerful bash scripts to practice with. Let's enhance your bash scripting skills!

### **Day 5: Practical Linux Skills**

## 🛠️ Hands-On Bash Scripting Exercises

### **Exercise 1: Understanding Your Scripts**

Start by understanding what each script does:

```bash
# Study the deployment script structure
head -30 scripts/deploy.sh

# Study the monitoring script structure  
head -30 scripts/monitor.sh

# Study the database backup script structure
head -30 scripts/database-backup.sh

# Study the Docker management script structure
head -30 scripts/docker-manage.sh
```

**Questions to answer:**
1. How does each script handle command-line arguments?
2. What error handling mechanisms are used?
3. How are functions organized in each script?
4. What color coding is used for output?

### **Exercise 2: Practice Script Execution**

```bash
# Test the monitoring script (should now work without errors)
./scripts/monitor.sh

# Test the deployment script help
./scripts/deploy.sh -h

# Test Docker management status
./scripts/docker-manage.sh status

# Test database backup help
./scripts/database-backup.sh
```

### **Exercise 3: Modify and Enhance Scripts**

**Task 1: Add Error Handling to monitor.sh**
Add a function to check if required commands exist:

```bash
# Add this function to your monitor.sh script
check_required_commands() {
    local commands=("docker" "docker-compose" "curl" "netstat")
    for cmd in "${commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            print_error "Required command not found: $cmd"
            exit 1
        fi
    done
}
```

**Task 2: Add Logging to deploy.sh**
Add logging functionality:

```bash
# Add this to your deploy.sh script
log_message() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $message" >> "./logs/deploy.log"
}
```

**Task 3: Create a New Script**
Create a script to check system updates:

```bash
#!/bin/bash
# scripts/system-updates.sh

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

check_updates() {
    print_status "Checking for system updates..."
    
    # Update package list
    sudo apt update
    
    # Check for available upgrades
    local upgrades=$(apt list --upgradable 2>/dev/null | wc -l)
    upgrades=$((upgrades - 1))  # Subtract header line
    
    if [[ $upgrades -gt 0 ]]; then
        print_warning "Found $upgrades packages that can be upgraded"
        return 1
    else
        print_success "System is up to date"
        return 0
    fi
}

main() {
    check_updates
}

main "$@"
```

### **Exercise 4: Advanced Bash Scripting**

**Task 1: Create a Configuration Management Script**
Create `scripts/config-manager.sh`:

```bash
#!/bin/bash
# scripts/config-manager.sh

set -e

CONFIG_FILE="./config/settings.conf"

# Function to read config
read_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        source "$CONFIG_FILE"
    else
        print_error "Config file not found: $CONFIG_FILE"
        exit 1
    fi
}

# Function to write config
write_config() {
    local key="$1"
    local value="$2"
    
    mkdir -p "$(dirname "$CONFIG_FILE")"
    
    if grep -q "^$key=" "$CONFIG_FILE" 2>/dev/null; then
        # Update existing key
        sed -i "s/^$key=.*/$key=$value/" "$CONFIG_FILE"
    else
        # Add new key
        echo "$key=$value" >> "$CONFIG_FILE"
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  get KEY           Get configuration value"
    echo "  set KEY VALUE     Set configuration value"
    echo "  list              List all configurations"
    echo "  init              Initialize default configuration"
}

# Main execution
case "$1" in
    get)
        read_config
        echo "${!2}"
        ;;
    set)
        write_config "$2" "$3"
        print_success "Configuration updated: $2=$3"
        ;;
    list)
        if [[ -f "$CONFIG_FILE" ]]; then
            cat "$CONFIG_FILE"
        else
            print_warning "No configuration file found"
        fi
        ;;
    init)
        write_config "DB_HOST" "localhost"
        write_config "DB_PORT" "5434"
        write_config "DB_NAME" "techflow_dev"
        write_config "DB_USER" "postgres"
        write_config "DB_PASSWORD" "password"
        print_success "Default configuration initialized"
        ;;
    *)
        show_usage
        exit 1
        ;;
esac
```

**Task 2: Create a Service Management Script**
Create `scripts/service-manager.sh`:

```bash
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

## 🐧 Linux System Administration Exercises

### **Exercise 5: User and Permission Management**

**Task 1: Create Application User**
```bash
# Create a new user for the application
sudo adduser techflow-app

# Set up proper permissions
sudo chown -R techflow-app:techflow-app /home/kellyhimself/Development/DevSecOps/techflow-solutions

# Create service account
sudo useradd -r -s /bin/false techflow-service
```

**Task 2: Set Up File Permissions**
```bash
# Create a script to set proper permissions
cat > scripts/set-permissions.sh << 'EOF'
#!/bin/bash

# Set proper permissions for the project
sudo chown -R $USER:$USER .
sudo chmod +x scripts/*.sh
sudo chmod 644 *.yml *.json *.md
sudo chmod 755 frontend backend infrastructure

echo "Permissions set successfully"
EOF

chmod +x scripts/set-permissions.sh
```

### **Exercise 6: Service Configuration**

**Task 1: Create Systemd Service**
```bash
# Create a systemd service file for your application
sudo tee /etc/systemd/system/techflow-api.service > /dev/null << 'EOF'
[Unit]
Description=TechFlow Solutions API
After=network.target

[Service]
Type=simple
User=kellyhimself
WorkingDirectory=/home/kellyhimself/Development/DevSecOps/techflow-solutions
ExecStart=/usr/bin/docker-compose up backend
ExecStop=/usr/bin/docker-compose stop backend
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable techflow-api
sudo systemctl start techflow-api
```

### **Exercise 7: Network Configuration**

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

## 📚 Learning Resources for Week 1

### **Bash Scripting Resources:**
1. **Bash Scripting Crash Course** by Traversy Media (YouTube)
2. **Linux Command Line Basics** by Linux Academy
3. **Advanced Bash-Scripting Guide** (online)

### **Practical Linux Resources:**
1. **Linux Essentials** by Linux Academy (YouTube)
2. **Ubuntu Server Administration** tutorials
3. **System Administration** courses on Linux Academy

## 🎯 Week 1 Learning Objectives

### **By the end of Week 1, you should be able to:**

1. **Bash Scripting:**
   - Write complex bash scripts with error handling
   - Use loops, conditionals, and functions
   - Parse command-line arguments
   - Handle file operations and text processing

2. **Linux System Administration:**
   - Manage users, groups, and permissions
   - Configure network settings
   - Set up and manage services
   - Monitor system resources

3. **Practical Skills:**
   - Automate repetitive tasks
   - Create deployment pipelines
   - Monitor system health
   - Manage database operations

## 🔧 Daily Practice Schedule

### **Day 3-4: Bash Scripting Focus**
- **Morning:** Study bash scripting concepts
- **Afternoon:** Practice with your existing scripts
- **Evening:** Create new scripts and enhance existing ones

### **Day 5: Linux Administration Focus**
- **Morning:** Study Linux system administration
- **Afternoon:** Practice user and permission management
- **Evening:** Configure services and network settings

### **Day 6-7: Integration and Practice**
- **Morning:** Combine bash scripting with Linux administration
- **Afternoon:** Create comprehensive automation scripts
- **Evening:** Document your learning and create a portfolio

## 🚀 Getting Started Right Now

### **Step 1: Test Your Current Scripts**
```bash
# Test the monitoring script (should work now)
./scripts/monitor.sh

# Test the deployment script
./scripts/deploy.sh -h

# Test Docker management
./scripts/docker-manage.sh status

# Test database backup
./scripts/database-backup.sh list
```

### **Step 2: Create Your First New Script**
```bash
# Create the system updates script
nano scripts/system-updates.sh
# Copy the script from Exercise 3 above

# Make it executable
chmod +x scripts/system-updates.sh

# Test it
./scripts/system-updates.sh
```

### **Step 3: Practice Modifying Existing Scripts**
```bash
# Add the error handling function to monitor.sh
nano scripts/monitor.sh
# Add the check_required_commands function

# Test the enhanced script
./scripts/monitor.sh
```

## 📈 Success Metrics for Week 1

- [ ] Can write bash scripts with proper error handling
- [ ] Can manage Linux users, groups, and permissions
- [ ] Can configure and manage system services
- [ ] Can monitor system resources and health
- [ ] Can automate deployment and backup processes
- [ ] Can troubleshoot common Linux issues

## 🔗 Integration with Your Project

Your bash scripting skills will directly benefit your TechFlow Solutions project:

1. **Automated Deployments:** Your `deploy.sh` script will evolve into a production-ready CI/CD pipeline
2. **System Monitoring:** Your `monitor.sh` script will become part of your production monitoring stack
3. **Database Management:** Your `database-backup.sh` script will ensure data safety
4. **Container Management:** Your `docker-manage.sh` script will streamline development workflows

## 🎯 Next Week Preview

After completing Week 1, you'll move to **Week 2: Git & Networking Deep Dive**, where you'll:
- Master Git workflows and branching strategies
- Set up GitHub Actions for CI/CD
- Deep dive into networking concepts
- Integrate version control with your automation scripts

---

## 🚀 Ready to Start?

Your environment is set up, your scripts are working, and you have a clear learning path. Start with **Exercise 1** above and work through each task systematically. Remember, the goal is to become comfortable with Linux administration and bash scripting - these are foundational skills for any DevSecOps practitioner!

**Next Action:** Begin with `./scripts/monitor.sh` to see your current system status, then dive into studying and modifying your scripts. 