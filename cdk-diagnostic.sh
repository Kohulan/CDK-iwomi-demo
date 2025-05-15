#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}==== CDK Backend Diagnostic Tool ====${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}Docker is not running. Please start Docker Desktop first.${NC}"
  exit 1
fi

# Check if the backend container exists
if ! docker ps -a | grep -q cdk-backend; then
  echo -e "${RED}Backend container (cdk-backend) not found. Start the application first.${NC}"
  exit 1
fi

echo -e "\n${CYAN}==== Checking CDK Dependencies ====${NC}"
docker exec cdk-backend find /root/.m2/repository/org/openscience/cdk -type d -name "cdk-*" | sort

echo -e "\n${CYAN}==== Maven Dependency Tree ====${NC}"
docker exec cdk-backend mvn dependency:tree -Dincludes=org.openscience.cdk

echo -e "\n${CYAN}==== Environment Variables ====${NC}"
docker exec cdk-backend env | grep -i java

echo -e "\n${CYAN}==== Testing CDK in Backend Container ====${NC}"
docker exec cdk-backend bash -c "cd /app && cat > TestCDK.java << 'EOF'
import org.openscience.cdk.interfaces.IChemObjectBuilder;
import org.openscience.cdk.silent.SilentChemObjectBuilder;
import org.openscience.cdk.smiles.SmilesParser;

public class TestCDK {
    public static void main(String[] args) {
        try {
            System.out.println(\"Testing CDK classes...\");
            
            // Test SilentChemObjectBuilder
            IChemObjectBuilder builder = SilentChemObjectBuilder.getInstance();
            System.out.println(\"SilentChemObjectBuilder: \" + (builder != null ? \"OK\" : \"FAIL\"));
            
            // Test SmilesParser
            SmilesParser parser = new SmilesParser(builder);
            System.out.println(\"SmilesParser: \" + (parser != null ? \"OK\" : \"FAIL\"));
            
            // Try parsing a simple molecule
            parser.parseSmiles(\"CC\");
            System.out.println(\"SMILES parsing: OK\");
            
            System.out.println(\"All CDK tests passed!\");
        } catch (Exception e) {
            System.err.println(\"CDK test failed: \" + e);
            e.printStackTrace();
        }
    }
}
EOF"

echo -e "\n${CYAN}==== Compiling and Running Test ====${NC}"
docker exec cdk-backend bash -c "cd /app && javac -cp /root/.m2/repository/org/openscience/cdk/cdk-silent/${cdk.version}/cdk-silent-${cdk.version}.jar:/root/.m2/repository/org/openscience/cdk/cdk-core/${cdk.version}/cdk-core-${cdk.version}.jar:/root/.m2/repository/org/openscience/cdk/cdk-smiles/${cdk.version}/cdk-smiles-${cdk.version}.jar TestCDK.java && java -cp .:/root/.m2/repository/org/openscience/cdk/cdk-silent/${cdk.version}/cdk-silent-${cdk.version}.jar:/root/.m2/repository/org/openscience/cdk/cdk-core/${cdk.version}/cdk-core-${cdk.version}.jar:/root/.m2/repository/org/openscience/cdk/cdk-smiles/${cdk.version}/cdk-smiles-${cdk.version}.jar TestCDK" || echo -e "${RED}Test failed${NC}"

echo -e "\n${GREEN}Diagnostic complete. If you still have issues, check the Maven dependencies and ensure all required CDK modules are included.${NC}"
