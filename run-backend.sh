#!/bin/bash

# Try to find Java installation
echo "Looking for Java installations..."
JAVA_LOCATIONS=(
  "/Library/Java/JavaVirtualMachines"
  "/System/Library/Java/JavaVirtualMachines"
  "/usr/libexec/java_home"
  "$HOME/.sdkman/candidates/java"
)

for loc in "${JAVA_LOCATIONS[@]}"; do
  if [ -d "$loc" ]; then
    echo "Found potential Java installation at: $loc"
    if [ "$loc" == "/usr/libexec/java_home" ]; then
      # Use macOS java_home utility if available
      if command -v /usr/libexec/java_home &> /dev/null; then
        JAVA_HOME=$(/usr/libexec/java_home 2>/dev/null || echo "")
        if [ -n "$JAVA_HOME" ]; then
          echo "Setting JAVA_HOME to $JAVA_HOME using /usr/libexec/java_home"
          break
        fi
      fi
    else
      # Look for latest Java version
      for version in $(ls -1 "$loc" | sort -r); do
        potential_java_home="$loc/$version/Contents/Home"
        if [ -d "$potential_java_home" ]; then
          JAVA_HOME="$potential_java_home"
          echo "Setting JAVA_HOME to $JAVA_HOME"
          break 2
        fi
      done
    fi
  fi
done

if [ -z "$JAVA_HOME" ]; then
  echo "Could not find a valid Java installation. Please install Java 11 or later."
  exit 1
fi

# Export the JAVA_HOME
export JAVA_HOME

# Print Java version
echo "Using Java from: $JAVA_HOME"
"$JAVA_HOME/bin/java" -version

# Navigate to the backend directory
cd /Volumes/Data_Drive/Project/2025/iwomi_demo/cdk-webapp/backend/cdk-webapp-backend

# Build and run the Spring Boot application
echo "Building and starting the Spring Boot application..."
MAVEN_OPTS="-Xmx512m" "$JAVA_HOME/bin/java" -jar $(find "$HOME/.m2/repository/org/apache/maven/apache-maven" -name "maven-core-*.jar" | sort -V | tail -n 1 | xargs dirname)/../../../bin/mvn clean spring-boot:run
