#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}==== CDK Web Application Setup Script ====${NC}"

# Function to check if Docker is available
check_docker() {
  if command -v docker &> /dev/null && command -v docker-compose &> /dev/null && docker info &> /dev/null; then
    echo "Docker and docker-compose are available and running."
    return 0
  else
    echo "Docker or docker-compose is not available or not running."
    if command -v docker &> /dev/null && ! docker info &> /dev/null; then
      echo -e "${RED}Docker is installed but not running. Start Docker Desktop first.${NC}"
    fi
    return 1
  fi
}

# Function to check Java installation
check_java() {
  if command -v java &> /dev/null; then
    echo "Java is installed:"
    java -version
    return 0
  else
    echo "Java is not installed."
    return 1
  fi
}

# Function to check Maven installation
check_maven() {
  if command -v mvn &> /dev/null; then
    echo "Maven is installed:"
    mvn -version
    return 0
  else
    echo "Maven is not installed."
    return 1
  fi
}

# Function to check Node.js installation
check_node() {
  if command -v node &> /dev/null; then
    echo "Node.js is installed:"
    node -v
    return 0
  else
    echo "Node.js is not installed."
    return 1
  fi
}

# Function to start with Docker
start_with_docker() {
  echo -e "${YELLOW}Starting application with Docker...${NC}"
  docker-compose up
}

# Function to start directly
start_direct() {
  echo -e "${YELLOW}Starting application directly...${NC}"
  
  # Fix application.properties if needed
  PROPERTIES_FILE="backend/cdk-webapp-backend/src/main/resources/application.properties"
  if grep -q "filepath:" "$PROPERTIES_FILE"; then
    echo "Fixing application.properties file..."
    sed -i '' '1s/^.*$/# Application settings/' "$PROPERTIES_FILE"
  fi
  
  # Build and start backend
  echo -e "${YELLOW}Building and starting backend...${NC}"
  cd backend/cdk-webapp-backend
  mvn clean package spring-boot:run &
  BACKEND_PID=$!
  cd ../..

  # Install frontend dependencies and start
  echo -e "${YELLOW}Installing frontend dependencies and starting...${NC}"
  cd frontend/cdk-webapp-frontend
  npm install
  npm start &
  FRONTEND_PID=$!
  cd ../..

  echo -e "${GREEN}Application started:${NC}"
  echo "Backend running at http://localhost:8080"
  echo "Frontend running at http://localhost:3000"
  echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

  trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
  wait
}

# Main script logic
echo -e "${YELLOW}Checking environment...${NC}"

# Check if Docker is available
if check_docker; then
  echo -e "${GREEN}Docker is available. We can use Docker to run the application.${NC}"
  USE_DOCKER=true
else
  USE_DOCKER=false
  
  # Check other requirements
  JAVA_OK=$(check_java && echo true || echo false)
  MAVEN_OK=$(check_maven && echo true || echo false)
  NODE_OK=$(check_node && echo true || echo false)
  
  if [ "$JAVA_OK" = true ] && [ "$MAVEN_OK" = true ] && [ "$NODE_OK" = true ]; then
    echo -e "${GREEN}All requirements are met. We can run the application directly.${NC}"
  else
    echo -e "${RED}Some requirements are missing. Cannot start the application.${NC}"
    echo "Please install the missing components or use Docker."
    exit 1
  fi
fi

# Ask user how to start
if [ "$USE_DOCKER" = true ]; then
  echo -e "${YELLOW}How would you like to start the application?${NC}"
  echo "1) Using Docker (recommended)"
  echo "2) Direct (requires Java, Maven, Node.js)"
  read -p "Enter your choice (1-2): " CHOICE
  
  case $CHOICE in
    1)
      start_with_docker
      ;;
    2)
      start_direct
      ;;
    *)
      echo "Invalid choice. Defaulting to Docker."
      start_with_docker
      ;;
  esac
else
  start_direct
fi
