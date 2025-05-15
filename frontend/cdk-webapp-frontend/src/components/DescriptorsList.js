import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get backend URL from environment variable or use API proxy for local development
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '/api';

// Descriptor categories based on function and properties
const DESCRIPTOR_CATEGORIES = {
  'Constitutional': 'Basic physical and chemical properties',
  'Topological': 'Connectivity and shape descriptors',
  'Electronic': 'Electronic properties and charge distribution',
  'Geometrical': '3D spatial arrangement and structural features',
  'Fragment-based': 'Descriptors based on molecular fragments',
  'Protein-related': 'Properties relevant to protein interactions',
  'Quantum-chemical': 'Properties derived from quantum mechanics',
  'Fingerprint-based': 'Structural patterns and features',
  'QSAR': 'Quantitative Structure-Activity Relationships',
  'Other': 'Miscellaneous descriptors'
};

function DescriptorsList() {
  const [descriptors, setDescriptors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeCategory, setActiveCategory] = useState('All');

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
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="sort-icon" width="14" height="14" style={{ marginLeft: '4px' }}>
        {sortDirection === 'asc' ? (
          <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
        ) : (
          <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
        )}
      </svg>
    );
  };

  // Function to determine category based on descriptor ID
  const getCategoryForDescriptor = (descriptor) => {
    const id = descriptor.id.toLowerCase();
    
    if (id.includes('atom') || id.includes('bond') || id.includes('weight') || id.includes('count')) {
      return 'Constitutional';
    } else if (id.includes('topo') || id.includes('index') || id.includes('path')) {
      return 'Topological';
    } else if (id.includes('charge') || id.includes('electro') || id.includes('polar')) {
      return 'Electronic';
    } else if (id.includes('3d') || id.includes('shape') || id.includes('volume')) {
      return 'Geometrical';
    } else if (id.includes('fragment') || id.includes('substructure')) {
      return 'Fragment-based';
    } else if (id.includes('finger') || id.includes('maccs') || id.includes('fp')) {
      return 'Fingerprint-based';
    } else if (id.includes('protein') || id.includes('enzyme') || id.includes('receptor')) {
      return 'Protein-related';
    } else if (id.includes('quantum') || id.includes('orbital') || id.includes('energy')) {
      return 'Quantum-chemical';
    } else if (id.includes('qsar') || id.includes('activity') || id.includes('property')) {
      return 'QSAR';
    }
    
    return 'Other';
  };
  
  // Group descriptors by category
  const descriptorsByCategory = {
    'All': descriptors
  };
  
  descriptors.forEach(descriptor => {
    const category = getCategoryForDescriptor(descriptor);
    if (!descriptorsByCategory[category]) {
      descriptorsByCategory[category] = [];
    }
    descriptorsByCategory[category].push(descriptor);
  });

  const filteredAndSortedDescriptors = (activeCategory === 'All' ? descriptors : descriptorsByCategory[activeCategory] || [])
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
    <div className="descriptors-list-card animate-fade-in">
      <div className="section-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
          <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
        </svg>
        <h3>Available CDK Descriptors (v2.11)</h3>
      </div>
      
      <div className="descriptors-info">
        <p>
          The Chemistry Development Kit (CDK) provides {descriptors.length} molecular descriptors
          that can be used to characterize chemical structures. These descriptors are grouped into categories
          based on the properties they measure:
        </p>
        
        <ul className="categories-list">
          {Object.entries(DESCRIPTOR_CATEGORIES).map(([category, description]) => (
            <li key={category} className="category-list-item">
              <strong>{category}</strong>: {description}
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ padding: '16px' }}>
        <div className="descriptors-filter">
          <div className="filter-group search-group">
            <input
              type="text"
              className="search-control"
              placeholder="Search descriptors..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="search-icon">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="select-control"
            >
              <option value="All">All Categories ({descriptors.length})</option>
              {Object.keys(descriptorsByCategory)
                .filter(cat => cat !== 'All')
                .sort()
                .map(category => (
                  <option key={category} value={category}>
                    {category} ({descriptorsByCategory[category].length})
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading-spinner" style={{ width: '40px', height: '40px', margin: '0 auto 16px' }}></div>
            <p>Loading descriptors...</p>
          </div>
        ) : error ? (
          <div className="error-message" style={{ margin: '20px 0' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <p className="form-hint" style={{ margin: '20px 0' }}>
              Found {filteredAndSortedDescriptors.length} descriptors
              {searchTerm && ` matching "${searchTerm}"`}
              {activeCategory !== 'All' && ` in category "${activeCategory}"`}
            </p>

            <table className="descriptors-table" style={{ marginTop: '16px' }}>
              <thead>
                <tr>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('name')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Name {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    style={{cursor: 'pointer'}} 
                    onClick={() => handleSort('id')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Descriptor ID {getSortIcon('id')}
                    </div>
                  </th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedDescriptors.map((descriptor, index) => (
                  <tr key={index}>
                    <td>
                      <div className="descriptor-name">{descriptor.name}</div>
                      <div className="category-badge" style={{ 
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        backgroundColor: 'rgba(0, 97, 171, 0.1)',
                        color: 'var(--color-primary)',
                        marginTop: '4px'
                      }}>
                        {getCategoryForDescriptor(descriptor)}
                      </div>
                    </td>
                    <td>
                      <div className="descriptor-id" style={{ marginTop: 0 }}>{descriptor.id.split('.').pop()}</div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: 'var(--color-gray-500)',
                        marginTop: '4px',
                        fontStyle: 'italic'
                      }}>
                        {descriptor.id}
                      </div>
                    </td>
                    <td>
                      <div className="descriptor-description">
                        {descriptor.description !== descriptor.id 
                          ? descriptor.description 
                          : "Molecular descriptor from CDK"}
                      </div>
                      
                      {descriptor.id.includes("Count") && (
                        <div style={{ 
                          fontSize: '0.75rem',
                          color: 'var(--color-info)',
                          marginTop: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                          </svg>
                          Returns a count of specific molecular features
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default DescriptorsList;