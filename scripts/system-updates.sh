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