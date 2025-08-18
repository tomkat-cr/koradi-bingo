#!/bin/bash
# run-server.sh
# 2025-08-18 | CR
#
if [ ! -f ../server/.env ]; then
    echo "Error: .env file not found in 'server' directory"
    exit 1
fi
if [ ! -f ../client/.env ]; then
    echo "Error: .env file not found in 'client' directory"
    exit 1
fi
echo "Loading environment variables from ../server/.env"
set -o allexport; . ../server/.env; set +o allexport ;
echo "Loading environment variables from ../client/.env"
set -o allexport; . ../client/.env; set +o allexport ;
echo "Starting services..."
docker-compose up -d
