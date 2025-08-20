# Koradi Bingo Deployment Makefile
# Manages Docker Compose services for production deployment

.PHONY: help up down restart logs build clean status

# Default target
help:
	cat Makefile

# Start all services
up:
	cd deploy && make up && make logs-f

run: up

# Stop all services
down:
	cd deploy && make down

# Restart all services
restart:
	cd deploy && make restart

# Restart all services
hard-restart:
	cd deploy && make down && make up && make logs-f

# Show logs
logs:
	cd deploy && make logs

# Follow logs
logs-f:
	cd deploy && make logs-f

# Clean up - stop services and remove volumes
clean-docker:
	docker-compose down -v
	docker system prune -f

# Show service status
status:
	docker-compose ps

install:
	npm run install:all

build:
	npm run build

start:
	npm run start

dev:
	npm run dev

clean:
	npm run clean

list-scripts:
	npm run --workspace=koradi-bingo-server
	npm run --workspace=koradi-bingo-client

ssl-certs-creation:
	@echo "Creating SSL certificates"
	@bash ./scripts/local_ssl_certs_creation.sh
	