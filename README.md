# CDK Web Application

A web-based cheminformatics toolkit using the Chemistry Development Kit (CDK) for molecular visualization and chemical descriptor calculations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Overview

This application provides a modern web interface for analyzing chemical molecules using the Chemistry Development Kit (CDK). It allows users to:

- Parse molecules from SMILES notation
- Generate 2D molecular visualizations
- Calculate chemical descriptors
- Organize descriptors into meaningful categories
- View and analyze molecular properties

## Architecture

### Backend
- **Spring Boot**: Java-based REST API
- **CDK Library**: Chemistry Development Kit for cheminformatics functions
- **Maven**: Build tool and dependency management

### Frontend
- **React**: UI framework
- **Bootstrap**: CSS framework for responsive design
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication

## Deployment Options

There are multiple ways to deploy and run this application:

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker and Docker Compose installed
- Docker Desktop running (for macOS and Windows)

#### Setup and Start

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/Test_CDK.git
   cd Test_CDK
   ```

2. Start the application with Docker Compose
   ```bash
   docker-compose up
   ```
   
   To run in detached mode:
   ```bash
   docker-compose up -d
   ```

3. To rebuild containers after code changes:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

#### Accessing the Application
- Frontend UI: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080/api/molecules/health](http://localhost:8080/api/molecules/health)

#### Environment Configuration
The frontend communicates with the backend using the environment variable `REACT_APP_BACKEND_URL`, which is set to `http://localhost:8080` in the Docker configuration.

#### Troubleshooting Docker Issues

If you encounter connection issues between frontend and backend:

1. Run the diagnostic script for detailed diagnostics:
   ```bash
   ./debug-docker-network.sh
   ```

2. Common issues and solutions:
   - **Docker daemon not running**: Start Docker Desktop
   - **Container startup errors**: Check logs with `docker logs cdk-backend` or `docker logs cdk-frontend`
   - **Network connectivity**: Make sure both containers are running on the same network
   - **API errors**: Check if backend API is accessible at `/api/molecules/health` endpoint

3. Restart application with cleaned environment:
   ```bash
   ./restart-app.sh
   ```

### Option 2: Local Development Setup

#### Prerequisites
- Java 11 or higher
- Maven 3.6+
- Node.js 16+ and npm
- Git

#### Starting the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend/cdk-webapp-backend
   ```

2. Build and run the Spring Boot application:
   ```bash
   # If Maven is installed
   mvn clean spring-boot:run
   
   # Or using Maven wrapper
   ./mvnw clean spring-boot:run
   ```

3. The backend server will start at http://localhost:8080.

#### Starting the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend/cdk-webapp-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The frontend development server will start at http://localhost:3000.

## API Documentation

### Core Endpoints

- `GET /api/molecules/health`: Check API health status
- `POST /api/molecules/parse`: Parse a molecule from SMILES notation
  ```json
  {
    "smiles": "CC(=O)OC1=CC=CC=C1C(=O)O"
  }
  ```
- `GET /api/molecules/descriptors`: Get all available chemical descriptors
- `GET /api/molecules/image?smiles={SMILES}`: Generate a PNG image of a molecule

## Development

### Project Structure

```
cdk-webapp/
├── backend/                # Spring Boot application
│   └── cdk-webapp-backend/
│       ├── src/main/java/  # Java source code
│       ├── pom.xml         # Maven configuration
│       └── mvnw            # Maven wrapper
└── frontend/               # React application
    └── cdk-webapp-frontend/
        ├── public/         # Static files
        ├── src/            # React source code
        ├── package.json    # npm dependencies
        └── tailwind.config.js # Tailwind CSS config
```

### Building for Production

#### Backend
```bash
cd backend/cdk-webapp-backend
mvn clean package
```

#### Frontend
```bash
cd frontend/cdk-webapp-frontend
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Chemistry Development Kit](https://cdk.github.io/) - The open-source cheminformatics toolkit
