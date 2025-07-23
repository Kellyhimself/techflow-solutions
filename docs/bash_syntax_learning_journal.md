# Bash Scripting Learning Journal

> **Bash Basics for Beginners**
>
> This section explains the most common Bash commands and syntax you'll see in scripts. If you ever feel lost, check here!
>
> - **`#!/bin/bash`**: This line at the top of a script tells your computer to use Bash to run the script. It's called a "shebang".
> - **`cat`**: Stands for "concatenate". It's used to display the contents of a file, or to create a new file when used with `>`.
> - **`EOF`**: Means "End Of File". It's used as a marker when creating multi-line text (like scripts or config files) inside another script. You can use any word, but `EOF` is common.
> - **`chmod`**: Changes file permissions. `chmod +x file.sh` makes a script executable (so you can run it).
> - **`sudo`**: Runs a command as the superuser (admin). Needed for system changes.
> - **`$USER`**: This is a variable that holds your username.
> - **`$0`, `$1`, `$2`, ...**: These are special variables. `$0` is the script name, `$1` is the first argument, `$2` is the second, etc.
> - **`function_name() { ... }`**: This is how you define a function in Bash.
> - **`if [[ ... ]]; then ... fi`**: This is how you write an if-statement (a decision) in Bash.
> - **`#`**: Anything after this is a comment. It's ignored by Bash, but helps humans understand the code.
> - **`exit 1`**: Stops the script and returns an error code (1 means error, 0 means success).
> - **`print_*` functions**: These are custom functions (not built-in) for printing messages. You can define them yourself for pretty output.

---

## Script: check_updates

### Code
```bash
check_updates() {
    print_status "Checking for system updates..."  # Print a message (custom function)
    # Update package list (fetches latest info about available software)
    sudo apt update
    # Check for available upgrades
    local upgrades=$(apt list --upgradable 2>/dev/null | wc -l)  # Count upgradable packages
    upgrades=$((upgrades - 1))  # Subtract header line (the first line is not a package)
    if [[ $upgrades -gt 0 ]]; then
        print_warning "Found $upgrades packages that can be upgraded"  # Warn if updates are available
        return 1  # Return 1 (means: updates found)
    else
        print_success "System is up to date"  # Success message
        return 0  # Return 0 (means: all good)
    fi
}

main() {
    check_updates  # Call the function above
}

main "$@"  # Run main with all script arguments
```

### What does this mean?
- **`sudo apt update`**: Asks your computer to check for new software updates. `sudo` means you need admin rights.
- **`apt list --upgradable`**: Shows a list of software that can be updated.
- **`wc -l`**: Counts the number of lines (so you know how many updates there are).
- **`local upgrades=...`**: Stores the number of upgradable packages in a variable called `upgrades`.
- **`upgrades=$((upgrades - 1))`**: The first line of the list is just a header, not a real package, so we subtract 1.
- **`if [[ $upgrades -gt 0 ]]; then ... fi`**: If there are more than 0 upgrades, print a warning. Otherwise, print success.
- **`return 1` / `return 0`**: These numbers tell the script if something needs attention (1) or if all is good (0).
- **`main "$@"`**: Runs the `main` function, passing along any arguments you gave the script.

### Example Usage
```bash
chmod +x update_checker.sh  # Make the script executable
./update_checker.sh         # Run the script
```

---

## Script: config-manager.sh

### Code
```bash
#!/bin/bash  # Use Bash to run this script
# scripts/config-manager.sh  # (This is just a comment for the file path)

set -e  # Stop the script if any command fails (safety feature)
CONFIG_FILE="./config/settings.conf"  # Where the config file will be stored

# Function to read config
read_config() {
    if [[ -f "$CONFIG_FILE" ]]; then  # Check if the config file exists
        source "$CONFIG_FILE"  # Load the config file (makes its variables available)
    else
        print_error "Config file not found: $CONFIG_FILE"  # Print an error (custom function)
        exit 1  # Stop the script with an error
    fi
}

# Function to write config
write_config() {
    local key="$1"  # The first argument is the key (like DB_HOST)
    local value="$2"  # The second argument is the value (like localhost)
    mkdir -p "$(dirname "$CONFIG_FILE")"  # Make sure the config folder exists
    if grep -q "^$key=" "$CONFIG_FILE" 2>/dev/null; then  # If the key already exists
        sed -i "s/^$key=.*/$key=$value/" "$CONFIG_FILE"  # Update the value
    else
        echo "$key=$value" >> "$CONFIG_FILE"  # Add a new key-value pair
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"  # $0 is the script name
    echo ""
    echo "Commands:"
    echo "  get KEY           Get configuration value"
    echo "  set KEY VALUE     Set configuration value"
    echo "  list              List all configurations"
    echo "  init              Initialize default configuration"
}

# Main execution
case "$1" in  # $1 is the first argument (the command)
    get)
        read_config  # Load the config file
        echo "${!2}"  # Print the value of the variable named by $2 (the key)
        ;;
    set)
        write_config "$2" "$3"  # Set a key to a value
        print_success "Configuration updated: $2=$3"  # Print a success message
        ;;
    list)
        if [[ -f "$CONFIG_FILE" ]]; then
            cat "$CONFIG_FILE"  # Show the whole config file
        else
            print_warning "No configuration file found"  # Warn if missing
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
        show_usage  # Show help if the command is not recognized
        exit 1
        ;;
esac
```

### What does this mean?
- **`set -e`**: If any command fails, the script stops right away. This helps prevent mistakes from piling up.
- **`CONFIG_FILE=...`**: This sets where your settings will be saved. You can change the path if you want.
- **`source "$CONFIG_FILE"`**: Loads all the variables from the config file so you can use them in your script.
- **`grep -q ...`**: Checks if a line starting with your key (like `DB_HOST=`) exists in the file.
- **`sed -i ...`**: Edits the file in place, changing the value for an existing key.
- **`echo "$key=$value" >> ...`**: Adds a new line to the end of the file.
- **`case "$1" in ... esac`**: This is like a menu. It checks what command you typed (like `get`, `set`, etc.) and runs the right code.
- **`${!2}`**: This is a special way to get the value of a variable whose name is stored in another variable. For example, if `$2` is `DB_HOST`, `${!2}` gives you the value of `DB_HOST`.
- **`print_*` functions**: These are not built-in. You can make your own functions like `print_success` or `print_error` to show colored or styled messages.

### Example Usage
```bash
./config-manager.sh init        # Set up default settings
./config-manager.sh get DB_HOST # Show the value of DB_HOST
./config-manager.sh set DB_PORT 5432  # Change DB_PORT to 5432
./config-manager.sh list        # Show all settings
./config-manager.sh wrong       # Show help message
```

---

## Script: service-manager.sh

### Code
```bash
#!/bin/bash  # Use Bash to run this script
# scripts/service-manager.sh

set -e  # Stop the script if any command fails

SERVICES=("frontend" "backend" "database" "redis")  # List of services we can manage

# Function to check if a service is running
check_service_status() {
    local service="$1"  # The service name (like frontend)
    case "$service" in
        frontend)
            curl -f http://localhost:3000 > /dev/null 2>&1  # Check if frontend is up
            ;;
        backend)
            curl -f http://localhost:3001/health > /dev/null 2>&1  # Check if backend is up
            ;;
        database)
            docker-compose exec -T db pg_isready -U postgres > /dev/null 2>&1  # Check if database is ready
            ;;
        redis)
            docker-compose exec -T redis redis-cli ping > /dev/null 2>&1  # Check if redis is up
            ;;
        *)
            return 1  # Unknown service
            ;;
    esac
}

# Function to start a service
start_service() {
    local service="$1"
    print_status "Starting $service..."  # Print a status message
    case "$service" in
        frontend|backend|database|redis)
            docker-compose up -d "$service"  # Start the service in the background
            ;;
        *)
            print_error "Unknown service: $service"  # Print an error if not found
            return 1
            ;;
    esac
}

# Function to stop a service
stop_service() {
    local service="$1"
    print_status "Stopping $service..."
    case "$service" in
        frontend|backend|database|redis)
            docker-compose stop "$service"  # Stop the service
            ;;
        *)
            print_error "Unknown service: $service"
            return 1
            ;;
    esac
}

# Function to restart a service
restart_service() {
    local service="$1"
    stop_service "$service"  # Stop first
    sleep 2  # Wait 2 seconds
    start_service "$service"  # Then start again
}

# Function to show usage instructions
show_usage() {
    echo "Usage: $0 [COMMAND] [SERVICE]"  # $0 is the script name
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

# Main execution: figure out what the user wants to do
case "$1" in
    start)
        start_service "$2"  # Start the service named in $2
        ;;
    stop)
        stop_service "$2"   # Stop the service named in $2
        ;;
    restart)
        restart_service "$2"  # Restart the service named in $2
        ;;
    status)
        if check_service_status "$2"; then
            print_success "$2 is running"  # Print if running
        else
            print_error "$2 is not running"  # Print if not running
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
        show_usage  # Show help if command is not recognized
        exit 1
        ;;
esac
```

### What does this mean?
- **`SERVICES=(...)`**: This is an array (a list) of service names you can manage with this script.
- **`curl -f ...`**: This command checks if a web service is running by trying to connect to it. If it works, the service is up.
- **`docker-compose up -d ...`**: Starts a service in the background using Docker Compose.
- **`docker-compose exec ...`**: Runs a command inside a running Docker container (like checking if the database is ready).
- **`case "$1" in ... esac`**: This is a menu that checks what command you typed (like start, stop, etc.) and runs the right function.
- **`print_*` functions**: These are custom functions for printing messages. You can define them to make your output look nice.
- **`sleep 2`**: Waits for 2 seconds. Useful when restarting services to give them time to stop.
- **`for service in "${SERVICES[@]}"; do ... done`**: Loops through all services in the list.

### Example Usage
```bash
./service-manager.sh start frontend      # Start the frontend service
./service-manager.sh status backend      # Check if backend is running
./service-manager.sh status-all          # Check all services
./service-manager.sh start invalid       # Try to start a service that doesn't exist
./service-manager.sh                    # Show usage instructions
```

---

## Task: Create Application User

### Code
```bash
# Create a new user for the application
sudo adduser techflow-app  # Adds a new user called 'techflow-app'. You will be asked to set a password.

# Set up proper permissions
sudo chown -R techflow-app:techflow-app /home/kellyhimself/Development/DevSecOps/techflow-solutions  # Make 'techflow-app' the owner of all files in the project

# Create service account
sudo useradd -r -s /bin/false techflow-service  # Adds a system user (no login allowed) for running services
```

### What does this mean?
- **`sudo adduser techflow-app`**: Makes a new user on your system. This is useful for running your app as a non-admin for better security.
- **`sudo chown -R ...`**: Changes the owner of all files in your project to the new user, so only that user can change them.
- **`sudo useradd -r -s /bin/false ...`**: Creates a special user for running background services. The `-r` means "system user" (not for logging in), and `-s /bin/false` means this user can't log in at all.

---

## Task: Set Up File Permissions

### Code
```bash
cat > scripts/set-permissions.sh << 'EOF'  # Create a new script file
#!/bin/bash
# Set proper permissions for the project
sudo chown -R $USER:$USER .  # Make everything in this folder owned by you
sudo chmod +x scripts/*.sh    # Make all scripts in 'scripts/' executable
sudo chmod 644 *.yml *.json *.md  # Set read/write permissions for config/docs
sudo chmod 755 frontend backend infrastructure  # Allow everyone to enter these folders
echo "Permissions set successfully"  # Print a message
EOF

chmod +x scripts/set-permissions.sh  # Make the new script itself executable
```

### What does this mean?
- **`cat > file << 'EOF' ... EOF`**: This is a way to create a new file from the command line. Everything between `<< 'EOF'` and the ending `EOF` goes into the file.
- **`chmod +x`**: Makes a file executable (so you can run it as a program).
- **`chmod 644`**: Sets permissions so you (the owner) can read/write, and others can only read.
- **`chmod 755`**: Lets everyone read and enter the folder, but only you can change it.
- **`$USER`**: This is a variable that holds your username.

---

## Task: Create Systemd Service

### Code
```bash
sudo tee /etc/systemd/system/techflow-api.service > /dev/null << 'EOF'  # Create a new service file
[Unit]
Description=TechFlow Solutions API  # A short description
After=network.target               # Start this service after the network is ready

[Service]
Type=simple                        # This is a simple service (just runs a command)
User=kellyhimself                  # Run as this user
WorkingDirectory=/home/kellyhimself/Development/DevSecOps/techflow-solutions  # Where to run the command
ExecStart=/usr/bin/docker-compose up backend   # Command to start the backend
ExecStop=/usr/bin/docker-compose stop backend  # Command to stop the backend
Restart=always                    # Restart if it crashes

[Install]
WantedBy=multi-user.target         # Start this service when the system boots (multi-user mode)
EOF

# Enable and start the service
sudo systemctl daemon-reload       # Reload systemd to read the new service file
sudo systemctl enable techflow-api # Enable the service to start on boot
sudo systemctl start techflow-api  # Start the service right now
```

### What does this mean?
- **`sudo tee ... << 'EOF' ... EOF`**: Like the `cat` example above, but works with `sudo` to write files you don't own.
- **`[Unit]`**: Section for describing the service and when it should start.
- **`[Service]`**: Section for how to run your app (user, working directory, start/stop commands).
- **`[Install]`**: Section for when to start the service (like at boot).
- **`systemctl daemon-reload`**: Tells the system to read new/changed service files.
- **`systemctl enable ...`**: Makes the service start automatically when you boot up.
- **`systemctl start ...`**: Starts the service right now.

---

## Task: Create Systemd Service (with sudo tee and here-document)

### Code
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

### What does this mean?
- **`sudo tee /etc/systemd/system/techflow-api.service > /dev/null << 'EOF'`**: This command creates a new file in a system directory (which needs admin rights) and fills it with the lines between `<< 'EOF'` and the ending `EOF`.
  - **`sudo`**: Runs the command as an administrator (root), so you can write to protected system folders.
  - **`tee /etc/systemd/system/techflow-api.service`**: The `tee` command takes input and writes it to a file. Here, it writes the service file.
  - **`> /dev/null`**: Hides the normal output of `tee` so your terminal stays clean.
  - **`<< 'EOF' ... EOF`**: This is a "here-document"—a way to give multi-line input to a command. Everything between these markers goes into the file.
  - **Why not use `cat`?**: If you tried `cat << 'EOF' > /etc/systemd/system/techflow-api.service`, the shell would try to write the file before `sudo` runs, and you'd get a permission error. Using `sudo tee` lets you write to system folders safely and simply.

- **Service File Content:**
  - **`[Unit]`**: Describes the service and when it should start. `Description` is a short name, and `After=network.target` means wait until the network is ready.
  - **`[Service]`**: Tells systemd how to run your app:
    - `Type=simple`: Just runs the command (doesn't fork or split into background processes).
    - `User`: Runs as this user (not root, for safety).
    - `WorkingDirectory`: Where to run the commands from.
    - `ExecStart`: Command to start the service.
    - `ExecStop`: Command to stop the service.
    - `Restart=always`: Restart if it crashes.
  - **`[Install]`**: When to start the service (here, at system boot in multi-user mode).

- **Enable and Start the Service:**
  - **`sudo systemctl daemon-reload`**: Tells systemd to read new/changed service files.
  - **`sudo systemctl enable techflow-api`**: Makes the service start automatically at boot.
  - **`sudo systemctl start techflow-api`**: Starts the service right now.

### Why Not Use `cat`?
- If you use `cat << 'EOF' > /etc/systemd/system/techflow-api.service`, the shell tries to write the file before `sudo` runs, so you get a "Permission denied" error.
- You could work around this with: `sudo bash -c "cat << 'EOF' > /etc/systemd/system/techflow-api.service ... EOF"`, but that's more complicated.
- `sudo tee` is simpler and more common for this use case. It lets you write to protected files in one step, and you can hide the output with `> /dev/null`.

### Summary
- Use `sudo tee ... << 'EOF'` to safely and simply create system files with multi-line content.
- The service file tells systemd how and when to run your app.
- `tee` is preferred over `cat` for writing to system folders because it works smoothly with `sudo`.

---

## Exercise 7: Network Configuration

### Task 1: Configure Firewall

#### Code
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

#### What does this mean?
- **`sudo ufw status`**: Checks if the firewall is active and shows which ports are open or blocked. `ufw` stands for Uncomplicated Firewall, a simple tool for managing firewall rules. `sudo` is needed because firewall settings require admin rights.
- **`sudo ufw allow <port>/tcp`**: Opens a specific port for TCP traffic. For example, `3000/tcp` is for the frontend, `3001/tcp` for the backend, `5434/tcp` for the database, and `6379/tcp` for Redis. This lets outside computers connect to these services.
- **`sudo ufw enable`**: Turns on the firewall, enforcing all the rules you've set. Be careful: if you're connected via SSH, make sure port 22 is allowed, or you could lock yourself out!

**Why this matters:**
- Firewalls protect your system by blocking unwanted network traffic. Only the ports you open are accessible from outside, which keeps your app safer.
- Checking the status first helps you see what rules are already in place before making changes.

---

### Task 2: Network Monitoring Script

#### Code (scripts/network-monitor.sh)
```bash
#!/bin/bash
# scripts/network-monitor.sh

set -e  # Stop the script if any command fails

# Function to check port status
check_port() {
    local port="$1"  # The port number to check
    local service="$2"  # The name of the service (for messages)
    
    if netstat -tuln | grep ":$port " > /dev/null 2>&1; then  # Is the port open?
        print_success "$service is listening on port $port"  # Print success message
        return 0
    else
        print_error "$service is not listening on port $port"  # Print error message
        return 1
    fi
}

# Function to check connectivity
check_connectivity() {
    local host="$1"  # The host to ping (like 8.8.8.8)
    local description="$2"  # A label for the test
    
    if ping -c 1 "$host" > /dev/null 2>&1; then  # Can we reach the host?
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

#### What does this mean?
- **`#!/bin/bash`**: Tells the system to use Bash to run this script.
- **`set -e`**: Stops the script if any command fails, so you don't get misleading results.
- **`check_port` function**: Checks if a service is listening on a specific port using `netstat` (shows open ports) and `grep` (searches for the port number). If found, prints a success message; if not, prints an error.
  - `netstat -tuln`: Lists all open TCP/UDP ports.
  - `grep ":$port "`: Looks for the exact port number in the list.
  - `> /dev/null 2>&1`: Hides all output, so only your custom messages show.
- **`check_connectivity` function**: Uses `ping` to test if a host (like 8.8.8.8 or google.com) is reachable. Prints success or error based on the result.
  - `ping -c 1`: Sends one ping packet to the host.
- **`print_header`, `print_success`, `print_error`**: These are custom functions (not built-in) for pretty output. You can define them yourself to show colored or styled messages.
- **Main section**: Calls the functions to check each service port and network connectivity.

**Why this matters:**
- This script helps you quickly see if your app's services are running and reachable, and if your server can access the internet and resolve domain names.
- It's a great troubleshooting tool for DevOps and deployment!

**Note:**
- `netstat` is part of the `net-tools` package. If you don't have it, install with `sudo apt install net-tools`.
- The script assumes you have defined `print_success`, `print_error`, and `print_header` elsewhere. Example definitions:
  ```bash
  print_success() { echo -e "\033[32m✔ $1\033[0m"; }
  print_error() { echo -e "\033[31m✘ $1\033[0m"; }
  print_header() { echo -e "\n\033[1m$1\033[0m\n"; }
  ```

---

## Common Terms Glossary

- **Bash**: A popular command-line shell and scripting language for Linux.
- **Script**: A file with commands that you can run all at once.
- **Shebang (`#!/bin/bash`)**: Tells your computer to use Bash to run the script.
- **sudo**: Run a command as the system administrator (superuser).
- **chmod**: Change file permissions (who can read/write/execute).
- **chown**: Change file ownership (who owns the file).
- **cat**: Show the contents of a file, or create a file when used with `>`.
- **EOF**: "End Of File" marker for multi-line text in scripts.
- **systemd**: The system that manages services (background programs) on Linux.
- **service**: A program that runs in the background (like a web server).
- **docker-compose**: A tool to manage multi-container Docker applications.
- **array**: A list of items in Bash (like `SERVICES=(a b c)`).
- **function**: A reusable block of code in a script.
- **variable**: A name that stores a value (like `USER` or `CONFIG_FILE`).
- **case ... esac**: Like a menu or switch statement; runs different code depending on input.
- **systemctl**: Command to control systemd services (start, stop, enable, etc.).
- **print_* functions**: Custom functions you can write to print messages in a nice way.

---

## Tips for Beginners
- Run on Linux (Ubuntu recommended).
- Use `chmod +x` to make scripts executable.
- Test commands in the terminal to understand them.
- Define print_* functions for clear output.
- Experiment and modify scripts to learn more.

---

## Example Inputs and Outputs

### config-manager.sh
- **Initialize Config:**
  ```bash
  ./config-manager.sh init
  # Output: Success: Default configuration initialized
  ```
- **Get a Value:**
  ```bash
  ./config-manager.sh get DB_HOST
  # Output: localhost
  ```
- **Set a Value:**
  ```bash
  ./config-manager.sh set DB_PORT 5432
  # Output: Success: Configuration updated: DB_PORT=5432
  ```
- **List Config:**
  ```bash
  ./config-manager.sh list
  # Output: DB_HOST=localhost ...
  ```
- **Invalid Command:**
  ```bash
  ./config-manager.sh wrong
  # Output: Usage: ./config-manager.sh [COMMAND] [OPTIONS] ...
  ```

### service-manager.sh
- **Start a Service:**
  ```bash
  ./service-manager.sh start frontend
  # Output: Status: Starting frontend...
  ```
- **Check Status:**
  ```bash
  ./service-manager.sh status backend
  # Output: Success: backend is running
  ```
- **Check All Statuses:**
  ```bash
  ./service-manager.sh status-all
  # Output: Success: frontend: RUNNING ...
  ```
- **Invalid Service:**
  ```bash
  ./service-manager.sh start invalid
  # Output: Status: Starting invalid... Error: Unknown service: invalid
  ```
- **Show Usage:**
  ```bash
  ./service-manager.sh
  # Output: Usage: ./service-manager.sh [COMMAND] [SERVICE] ...
  ``` 