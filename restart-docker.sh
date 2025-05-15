#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}Docker is not running. Please start Docker Desktop and try again.${NC}"
  exit 1
fi

# Navigate to the project directory
cd "$(dirname "$0")"

echo -e "${YELLOW}Stopping any running Docker containers...${NC}"
docker-compose down

echo -e "${YELLOW}Removing any dangling Docker volumes...${NC}"
docker volume prune -f

echo -e "${YELLOW}Rebuilding and starting Docker containers...${NC}"
docker-compose up --build

# If the user pressed Ctrl+C, handle the signal
trap "echo -e '${RED}Stopping containers...${NC}'; docker-compose down; exit" INT TERM
