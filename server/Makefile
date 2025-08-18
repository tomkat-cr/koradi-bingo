.PHONY: install build dev start clean test lint

# Install dependencies
install:
	npm install

# Build the project (if needed for production)
build:
	@echo "No build step required for server"

# Run in development mode with nodemon
dev:
	npm run dev

run: dev

# Run in production mode
start:
	npm run start

# Clean node_modules and package-lock.json
clean:
	rm -rf node_modules package-lock.json

# Reinstall dependencies
reinstall: clean install

# Run tests (when implemented)
test:
	npm test

# Run linter (when implemented)
lint:
	npm run lint

# Show help
help:
	@echo "Available commands:"
	@echo "  install    - Install npm dependencies"
	@echo "  dev        - Run server in development mode"
	@echo "  start      - Run server in production mode"
	@echo "  clean      - Remove node_modules and package-lock.json"
	@echo "  reinstall  - Clean and reinstall dependencies"
	@echo "  test       - Run tests"
	@echo "  lint       - Run linter"
	@echo "  help       - Show this help message"