# CDK Web Application - Startup Instructions

## Docker Setup (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Docker Desktop running (for macOS and Windows)

### Starting the Application with Docker

```bash
cd /Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp
./restart-docker.sh
```

This script will:
1. Stop any running containers
2. Clean up Docker volumes
3. Rebuild and start both backend and frontend containers

### Accessing the Application

- Frontend UI: http://localhost:3000
- Backend API: http://localhost:8080/api/molecules/health

### Troubleshooting Docker Issues

If you encounter connection issues between frontend and backend:

1. Run the debug script to get detailed diagnostics:
   ```bash
   ./docker-debug.sh
   ```

2. Common issues and solutions:
   - **Docker daemon not running**: Start Docker Desktop
   - **Container startup errors**: Check logs with `docker logs cdk-backend` or `docker logs cdk-frontend`
   - **Network connectivity**: Make sure containers are on the same network

## Non-Docker Setup

If you prefer not to use Docker, you can run the application directly:

```bash
cd /Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp
./start-no-docker.sh
```

This requires Java 11+, Maven, and Node.js to be installed on your system.

## Option 3: Manual Startup

### Starting the Backend

```bash
cd /Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp/backend/cdk-webapp-backend
./mvnw clean spring-boot:run
```

### Starting the Frontend

```bash
cd /Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp/frontend/cdk-webapp-frontend
npm install
npm start
```

## Accessing the Application

- Backend API: http://localhost:8080/api/molecules
- Frontend UI: http://localhost:3000
