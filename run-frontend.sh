#!/bin/bash

# Navigate to the frontend directory
cd /Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp/frontend/cdk-webapp-frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

# Start the React application
echo "Starting the React application..."
npm start
