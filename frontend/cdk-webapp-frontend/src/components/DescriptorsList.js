import React, { useState, useEffect } from 'react';
import { Card, Table, Form, InputGroup, Button, Spinner, Alert, Dropdown, Badge, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Get backend URL from environment variable or use API proxy for local development
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '/api';

// Descriptor categories for grouping
const DESCRIPTOR_CATEGORIES = {
  "Constitutional": [
    "AtomCount", "BondCount", "AromaticAtomsCount", "AromaticBondsCount", 
    "RotatableBondsCount", "MolecularWeight", "FractionalCSP3", "HeavyAtomCount", 
    "LargestChain", "LargestPiSystem", "LongestAliphaticChain", "AcidicGroupCount", 
    "BasicGroupCount", "Weight"
  ],
  "Topological": [
    "WienerNumbers", "ZagrebIndex", "TPSADescriptor", "PetitjeanNumber", 
    "KappaShapeIndices", "EccentricConnectivity", "ChiPath", "ChiChain", 
    "ChiPathCluster", "ChiCluster", "FragmentComplexity", "VAdjMa"
  ],
  "Electronic": [
    "IPMolecular", "AtomHybridization", "BPol", "ALOGP", "APol",
    "AutocorrelationCharge", "AutocorrelationPolarizability", "CarbonTypes"
  ],
  "Geometrical": [
    "MomentOfInertia", "WHIM", "CPSA", "GravitationalIndex", "LengthOverBreadth",
    "PetitjeanShape"
  ],
  "Drug-like": [
    "XLogP", "HBondAcceptorCount", "HBondDonorCount", "RuleOfFive", "MannholdLogP",
    "TPSA", "QED"
  ],
  "Fingerprints": [
    "KierHallSmarts", "MDEDescriptor", "BCUTDescriptor", "FMF"
  ],
  "Others": []
};

// Function to determine descriptor category
const getDescriptorCategory = (descriptor) => {
  const id = descriptor.id.split('.').pop();
  
  for (const [category, descriptors] of Object.entries(DESCRIPTOR_CATEGORIES)) {
    if (descriptors.some(desc => id.includes(desc))) {
      return category;
    }
  }
  return "Others";
};

function DescriptorsList() {
  const [descriptors, setDescriptors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [descriptorCategory, setDescriptorCategory] = useState('All');

  useEffect(() => {
    const fetchDescriptors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/molecules/descriptors`);
        setDescriptors(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching descriptors:', err);
        setError('Failed to load descriptors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDescriptors();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking on the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending for new sort field
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Group descriptors by category
  const descriptorsByCategory = {
    'All': descriptors
  };

  descriptors.forEach(descriptor => {
    const category = getDescriptorCategory(descriptor);
    if (!descriptorsByCategory[category]) {
      descriptorsByCategory[category] = [];
    }
    descriptorsByCategory[category].push(descriptor);
  });

  // Get the list of descriptors according to the selected category
  const activeDescriptors = descriptorCategory === 'All'
    ? descriptors
    : descriptorsByCategory[descriptorCategory] || [];

  const filteredAndSortedDescriptors = activeDescriptors
    .filter(descriptor => 
      !searchTerm || 
      descriptor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      descriptor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (descriptor.description && descriptor.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const valA = a[sortField]?.toLowerCase() || '';
      const valB = b[sortField]?.toLowerCase() || '';
      
      if (sortDirection === 'asc') {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });

  return (
    <Card className="mt-4 descriptor-list-card">
      <Card.Header as="h5">
        <div className="d-flex justify-content-between align-items-center">
          <span><i className="bi bi-list-check me-2"></i>Available CDK Descriptors (v2.11)</span>
          <Badge bg="primary" pill className="px-3 py-2">
            Total: {descriptors.length}
          </Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="descriptor-info mb-3">
          <p className="text-muted">
            The Chemistry Development Kit (CDK) provides {descriptors.length} molecular descriptors
            that can be used to characterize chemical structures. These descriptors are grouped into categories
            based on the properties they measure:
          </p>
          <div className="descriptor-categories-list">
            <Row>
              <Col md={4}>
                <ul className="small">
                  <li><strong>Constitutional</strong>: Atom and bond counts, molecular weight</li>
                  <li><strong>Topological</strong>: Molecular connectivity and shape</li>
                  <li><strong>Electronic</strong>: Charge distribution, polarizability</li>
                </ul>
              </Col>
              <Col md={4}>
                <ul className="small">
                  <li><strong>Geometrical</strong>: 3D shape and spatial arrangement</li>
                  <li><strong>Drug-like</strong>: Properties relevant to pharmaceuticals</li>
                  <li><strong>Fingerprints</strong>: Structural features and patterns</li>
                </ul>
              </Col>
              <Col md={4}>
                <ul className="small">
                  <li><strong>QSAR</strong>: Quantitative Structure-Activity Relationships</li>
                  <li><strong>Pharmacophore</strong>: Features related to biological activity</li>
                </ul>
              </Col>
            </Row>
          </div>
        </div>
        
        <Row className="mb-3">
          <Col md={8}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search descriptors..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setSearchTerm('')}
                >
                  Clear
                </Button>
              )}
            </InputGroup>
          </Col>
          <Col md={4} className="d-flex align-items-center justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary">
                Category: {descriptorCategory} <Badge bg="info" pill>{filteredAndSortedDescriptors.length}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDescriptorCategory('All')}>
                  All <Badge bg={descriptorCategory === 'All' ? 'primary' : 'secondary'} pill>{descriptors.length}</Badge>
                </Dropdown.Item>
                <Dropdown.Divider />
                {Object.keys(descriptorsByCategory)
                  .filter(cat => cat !== 'All')
                  .sort()
                  .map(category => (
                    <Dropdown.Item 
                      key={category}
                      onClick={() => setDescriptorCategory(category)}
                    >
                      {category} <Badge bg={descriptorCategory === category ? 'primary' : 'secondary'} pill>{descriptorsByCategory[category].length}</Badge>
                    </Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center p-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading descriptors...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <p className="text-muted mb-2">
              Found {filteredAndSortedDescriptors.length} descriptors
              {searchTerm && ` matching "${searchTerm}"`}
              {descriptorCategory !== 'All' && ` in category "${descriptorCategory}"`}
            </p>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('name')}
                  >
                    Name {getSortIcon('name')}
                  </th>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('id')}
                  >
                    Descriptor ID {getSortIcon('id')}
                  </th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedDescriptors.map((descriptor, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{descriptor.name}</strong>
                      <div className="small text-muted mt-1">
                        <span className="me-2">
                          <Badge 
                            bg={getDescriptorCategory(descriptor) === "Others" ? "secondary" : "primary"} 
                            className="category-badge"
                          >
                            {getDescriptorCategory(descriptor)}
                          </Badge>
                        </span>
                      </div>
                    </td>
                    <td>
                      <code>{descriptor.id.split('.').pop()}</code>
                      <div className="small text-muted mt-1">
                        <em>{descriptor.id}</em>
                      </div>
                    </td>
                    <td>
                      {descriptor.description !== descriptor.id 
                        ? descriptor.description 
                        : "Molecular descriptor from CDK"}
                      
                      {descriptor.id.includes("Count") && (
                        <div className="small text-info mt-1">
                          <i className="bi bi-info-circle me-1"></i>
                          Returns a count of specific molecular features
                        </div>
                      )}
                      
                      {descriptor.id.includes("BCUT") && (
                        <div className="small text-info mt-1">
                          <i className="bi bi-info-circle me-1"></i>
                          BCUT descriptors use eigenvalues of modified adjacency matrices
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default DescriptorsList;
