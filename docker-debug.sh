#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}==== Docker Container Status ====${NC}"
docker ps -a

echo -e "\n${CYAN}==== Docker Network Information ====${NC}"
docker network ls
echo -e "\nDetails for cdk-network:"
docker network inspect cdk-network

echo -e "\n${CYAN}==== Backend Container Logs ====${NC}"
docker logs cdk-backend 2>&1 | tail -n 50

echo -e "\n${CYAN}==== Frontend Container Logs ====${NC}"
docker logs cdk-frontend 2>&1 | tail -n 50

echo -e "\n${CYAN}==== Backend Health Check ====${NC}"
docker exec cdk-backend curl -v http://localhost:8080/api/molecules/health 2>&1 || echo -e "${RED}Health check failed${NC}"

echo -e "\n${CYAN}==== Frontend to Backend Connection Test ====${NC}"
docker exec cdk-frontend curl -v http://cdk-backend:8080/api/molecules/health 2>&1 || echo -e "${RED}Connection test failed${NC}"

echo -e "\n${CYAN}==== DNS Resolution Test ====${NC}"
docker exec cdk-frontend nslookup cdk-backend 2>&1 || echo -e "${RED}DNS resolution failed${NC}"

echo -e "\n${GREEN}If you're experiencing issues, try the following:${NC}"
echo "1. Run './restart-docker.sh' to restart all containers"
echo "2. Check if the backend API is ready: http://localhost:8080/api/molecules/health"
echo "3. Check the frontend app: http://localhost:3000"
echo "4. If the frontend can't connect to the backend, try accessing the API directly from your browser"
