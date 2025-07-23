#!/bin/sh
set -e

# Ensure .next is owned by node user
chown -R node:node /app/.next || true

# Drop privileges to node and run the command
exec gosu node "$@" 