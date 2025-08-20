# Koradi Bingo Deployment Makefile
# Manages Docker Compose services for production deployment

.PHONY: help up down restart logs build clean status shell-server shell-mongo backup restore

# Default target
help:
	@echo "Koradi Bingo Deployment Commands:"
	@echo "  up          - Start all services"
	@echo "  down        - Stop all services"
	@echo "  restart     - Restart all services"
	@echo "  logs        - Show logs for all services"
	@echo "  logs-f      - Follow logs for all services"
	@echo "  build       - Build client and start services"
	@echo "  clean       - Stop services and remove volumes"
	@echo "  status      - Show service status"
	@echo "  shell-server - Open shell in server container"
	@echo "  shell-mongo - Open shell in mongo container"
	@echo "  backup      - Backup MongoDB data"
	@echo "  restore     - Restore MongoDB data from backup"

# Start all services
up:
	bash run-server.sh run

# Stop all services
down:
	bash run-server.sh down

# Restart all services
restart-docker:
	bash run-server.sh restart

# Restart all services
restart: restart-docker logs-f
	
# Show logs
logs:
	docker-compose logs

# Follow logs
logs-f:
	docker-compose logs -f

# Build client and start services
build:
	@echo "Building client..."
	cd ../client && make build
	@echo "Starting services..."
	docker-compose up -d

# Clean up - stop services and remove volumes
clean:
	docker-compose down -v
	docker system prune -f

# Show service status
status:
	docker-compose ps

# Open shell in server container
shell-server:
	docker-compose exec server sh

# Open shell in mongo container
shell-mongo:
	docker-compose exec mongo mongosh

# Backup MongoDB data
backup:
	@mkdir -p backups
	docker-compose exec mongo mongodump --db koradi_bingo --out /tmp/backup
	docker cp $$(docker-compose ps -q mongo):/tmp/backup ./backups/backup-$$(date +%Y%m%d-%H%M%S)
	@echo "Backup created in backups/ directory"

# Restore MongoDB data from backup (usage: make restore BACKUP=backup-20231201-120000)
restore:
	@if [ -z "$(BACKUP)" ]; then echo "Usage: make restore BACKUP=backup-folder-name"; exit 1; fi
	docker cp ./backups/$(BACKUP) $$(docker-compose ps -q mongo):/tmp/restore
	docker-compose exec mongo mongorestore --db koradi_bingo --drop /tmp/restore/koradi_bingo
	@echo "Database restored from $(BACKUP)"
