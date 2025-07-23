#!/bin/bash

# TechFlow Solutions - Database Backup and Restore Script
# This script handles PostgreSQL database backup and restore operations

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

# Database configuration (Docker container)
DB_HOST="localhost"
DB_PORT="5434"
DB_NAME="techflow_dev"
DB_USER="postgres"
DB_PASSWORD="password"
BACKUP_DIR="./backups"
DATE_FORMAT=$(date +"%Y%m%d_%H%M%S")

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  backup     Create a database backup"
    echo "  restore    Restore database from backup"
    echo "  list       List available backups"
    echo "  clean      Clean old backups (keep last 7 days)"
    echo ""
    echo "Options:"
    echo "  -f, --file FILENAME    Specify backup filename"
    echo "  -h, --host HOST        Database host (default: localhost)"
    echo "  -p, --port PORT        Database port (default: 5432)"
    echo "  -d, --database DB      Database name (default: techflow_dev)"
    echo "  -u, --user USER        Database user (default: postgres)"
    echo "  -w, --password PASS    Database password (default: password)"
    echo "  --help                 Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 backup                           # Create backup with auto-generated name"
    echo "  $0 backup -f my_backup.sql         # Create backup with custom name"
    echo "  $0 restore -f backup_20231201.sql  # Restore from specific backup"
    echo "  $0 list                            # List all available backups"
}

# Function to check if PostgreSQL client is installed
check_pg_client() {
    if ! command -v pg_dump &> /dev/null; then
        print_error "PostgreSQL client (pg_dump) is not installed"
        print_status "Installing PostgreSQL client..."
        sudo apt update && sudo apt install -y postgresql-client
    fi
}

# Function to test database connection
test_connection() {
    print_status "Testing database connection..."
    if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
        print_success "Database connection successful"
    else
        print_error "Cannot connect to database. Please check your credentials and ensure the database is running."
        exit 1
    fi
}

# Function to create backup directory
create_backup_dir() {
    if [[ ! -d "$BACKUP_DIR" ]]; then
        print_status "Creating backup directory: $BACKUP_DIR"
        mkdir -p "$BACKUP_DIR"
    fi
}

# Function to create backup
create_backup() {
    local filename="$1"
    
    if [[ -z "$filename" ]]; then
        filename="backup_${DATE_FORMAT}.sql"
    fi
    
    local backup_path="$BACKUP_DIR/$filename"
    
    print_status "Creating database backup: $backup_path"
    
    # Create backup with pg_dump
    if PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" --verbose --clean --if-exists > "$backup_path"; then
        print_success "Backup created successfully: $backup_path"
        
        # Show backup file size
        local file_size=$(du -h "$backup_path" | cut -f1)
        print_status "Backup size: $file_size"
        
        # Create a checksum for integrity
        sha256sum "$backup_path" > "$backup_path.sha256"
        print_status "Checksum created: $backup_path.sha256"
    else
        print_error "Backup failed"
        exit 1
    fi
}

# Function to restore backup
restore_backup() {
    local filename="$1"
    
    if [[ -z "$filename" ]]; then
        print_error "Please specify a backup file to restore"
        show_usage
        exit 1
    fi
    
    local backup_path="$BACKUP_DIR/$filename"
    
    if [[ ! -f "$backup_path" ]]; then
        print_error "Backup file not found: $backup_path"
        exit 1
    fi
    
    # Verify checksum if it exists
    if [[ -f "$backup_path.sha256" ]]; then
        print_status "Verifying backup integrity..."
        if cd "$BACKUP_DIR" && sha256sum -c "$filename.sha256"; then
            print_success "Backup integrity verified"
        else
            print_error "Backup integrity check failed"
            exit 1
        fi
    else
        print_warning "No checksum file found for integrity verification"
    fi
    
    print_warning "This will overwrite the current database. Are you sure? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_status "Restore cancelled"
        exit 0
    fi
    
    print_status "Restoring database from: $backup_path"
    
    # Restore database
    if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" < "$backup_path"; then
        print_success "Database restored successfully"
    else
        print_error "Database restore failed"
        exit 1
    fi
}

# Function to list backups
list_backups() {
    print_status "Available backups in $BACKUP_DIR:"
    
    if [[ ! -d "$BACKUP_DIR" ]] || [[ -z "$(ls -A "$BACKUP_DIR" 2>/dev/null)" ]]; then
        print_warning "No backups found"
        return
    fi
    
    echo ""
    printf "%-30s %-15s %-10s\n" "Filename" "Size" "Date"
    echo "------------------------------------------------------------"
    
    for file in "$BACKUP_DIR"/*.sql; do
        if [[ -f "$file" ]]; then
            filename=$(basename "$file")
            size=$(du -h "$file" | cut -f1)
            date=$(stat -c %y "$file" | cut -d' ' -f1)
            printf "%-30s %-15s %-10s\n" "$filename" "$size" "$date"
        fi
    done
    echo ""
}

# Function to clean old backups
clean_backups() {
    print_status "Cleaning backups older than 7 days..."
    
    if [[ ! -d "$BACKUP_DIR" ]]; then
        print_warning "Backup directory does not exist"
        return
    fi
    
    local deleted_count=0
    
    # Find and delete files older than 7 days
    while IFS= read -r -d '' file; do
        if [[ -f "$file" ]]; then
            rm "$file"
            # Also remove corresponding checksum file if it exists
            if [[ -f "$file.sha256" ]]; then
                rm "$file.sha256"
            fi
            deleted_count=$((deleted_count + 1))
            print_status "Deleted: $(basename "$file")"
        fi
    done < <(find "$BACKUP_DIR" -name "*.sql" -mtime +7 -print0)
    
    if [[ $deleted_count -eq 0 ]]; then
        print_status "No old backups found to clean"
    else
        print_success "Cleaned $deleted_count old backup(s)"
    fi
}

# Parse command line arguments
COMMAND=""
BACKUP_FILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        backup|restore|list|clean)
            COMMAND="$1"
            shift
            ;;
        -f|--file)
            BACKUP_FILE="$2"
            shift 2
            ;;
        -h|--host)
            DB_HOST="$2"
            shift 2
            ;;
        -p|--port)
            DB_PORT="$2"
            shift 2
            ;;
        -d|--database)
            DB_NAME="$2"
            shift 2
            ;;
        -u|--user)
            DB_USER="$2"
            shift 2
            ;;
        -w|--password)
            DB_PASSWORD="$2"
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

# Main execution
case "$COMMAND" in
    backup)
        check_pg_client
        test_connection
        create_backup_dir
        create_backup "$BACKUP_FILE"
        ;;
    restore)
        check_pg_client
        test_connection
        restore_backup "$BACKUP_FILE"
        ;;
    list)
        list_backups
        ;;
    clean)
        clean_backups
        ;;
    *)
        print_error "Unknown command: $COMMAND"
        show_usage
        exit 1
        ;;
esac 