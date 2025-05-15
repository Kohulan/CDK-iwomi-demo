#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BACKEND_DIR="/Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp/backend/cdk-webapp-backend"
FRONTEND_DIR="/Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp/frontend/cdk-webapp-frontend"

echo -e "${GREEN}==== Starting CDK Web Application with No Docker ====${NC}"

# Ensure application.properties is valid
APP_PROPS_FILE="${BACKEND_DIR}/src/main/resources/application.properties"
if grep -q "filepath:" "${APP_PROPS_FILE}" 2>/dev/null; then
  echo -e "${YELLOW}Fixing application.properties file...${NC}"
  sed -i.bak '1s/^.*$/# Application settings/' "${APP_PROPS_FILE}"
  rm -f "${APP_PROPS_FILE}.bak"
fi

# Check if Maven wrapper exists
if [ ! -f "${BACKEND_DIR}/mvnw" ]; then
  echo -e "${YELLOW}Maven wrapper not found, creating...${NC}"
  cat > "${BACKEND_DIR}/mvnw" << 'EOF'
#!/bin/sh
# Maven Wrapper

# Use system maven if available
if command -v mvn >/dev/null 2>&1; then
  mvn "$@"
  exit $?
fi

echo "Maven not found. Please install Maven or use Docker."
exit 1
EOF
  chmod +x "${BACKEND_DIR}/mvnw"
fi

# Start backend
echo -e "${YELLOW}Starting backend...${NC}"
cd "${BACKEND_DIR}"
./mvnw spring-boot:run &
BACKEND_PID=$!
cd -

# Check if npm is available
if ! command -v npm >/dev/null 2>&1; then
  echo -e "${RED}npm not found. Please install Node.js and npm.${NC}"
  kill $BACKEND_PID
  exit 1
fi

# Start frontend
echo -e "${YELLOW}Starting frontend...${NC}"
cd "${FRONTEND_DIR}"
npm install
npm start &
FRONTEND_PID=$!
cd -

echo -e "${GREEN}Application starting:${NC}"
echo "Backend should be available at http://localhost:8080"
echo "Frontend should be available at http://localhost:3000"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM EXIT
wait
