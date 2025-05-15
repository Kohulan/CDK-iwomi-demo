# CDK Webapp - Cheminformatics Web Application

A web-based cheminformatics toolkit using the Chemistry Development Kit (CDK) as the backend, focusing on 2D molecular visualization and chemical descriptor calculations.

## Features

- Parse molecules from SMILES notation
- Generate 2D molecular visualizations
- Calculate chemical descriptors
- Convert between chemical file formats

## Architecture

### Backend

- **Spring Boot**: Java-based backend framework
- **CDK**: Chemistry Development Kit for cheminformatics functions
- **REST API**: Endpoints for molecule parsing, rendering, and descriptor calculation

### Frontend

- **React**: JavaScript library for building the user interface
- **Bootstrap**: CSS framework for responsive design
- **Axios**: HTTP client for API calls

## Prerequisites

- Java 11 or higher
- Maven
- Node.js and npm

## Project Structure

```
cdk-webapp/
├── backend/
│   └── cdk-webapp-backend/ - Spring Boot application with CDK
├── frontend/
│   └── cdk-webapp-frontend/ - React application
└── start.sh - Script to build and run both backend and frontend
```

## Getting Started

1. Clone the repository
2. Run the start script:
   ```
   ./start.sh
   ```
3. Open your browser and navigate to http://localhost:3000

## API Endpoints

- `POST /api/molecules/parse`: Parse a molecule from SMILES and return details
- `GET /api/molecules/image`: Get a PNG image of a molecule from SMILES

## Sample Molecules

The application includes several sample molecules for testing:
- Aspirin (`CC(=O)OC1=CC=CC=C1C(=O)O`)
- Caffeine (`CN1C=NC2=C1C(=O)N(C(=O)N2C)C`)
- Ibuprofen (`CC(C)CC1=CC=C(C=C1)C(C)C(=O)O`)
- Paracetamol (`CC(=O)NC1=CC=C(C=C1)O`)
