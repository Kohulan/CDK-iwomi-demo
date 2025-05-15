import React from 'react';

const DescriptorsDisplay = ({ descriptors, category, searchTerm, sortBy, sortDir }) => {
  if (!descriptors || descriptors.length === 0) {
    return (
      <div className="no-descriptors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="no-descriptors-icon">
          <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
        </svg>
        <p>No descriptors found. Analyze a molecule to view its descriptors.</p>
      </div>
    );
  }

  // Filter by category
  let filteredDescriptors = descriptors;
  if (category !== 'All') {
    filteredDescriptors = descriptors.filter(d => d.category === category);
  }

  // Filter by search term
  if (searchTerm) {
    const search = searchTerm.toLowerCase();
    filteredDescriptors = filteredDescriptors.filter(
      d => d.name.toLowerCase().includes(search) || 
           d.id.toLowerCase().includes(search) || 
           d.value?.toString().toLowerCase().includes(search) ||
           d.description?.toLowerCase().includes(search)
    );
  }

  // Sort descriptors
  filteredDescriptors = [...filteredDescriptors].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'value') {
      // Try to sort numerically if possible
      const aNum = parseFloat(a.value);
      const bNum = parseFloat(b.value);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        comparison = aNum - bNum;
      } else {
        comparison = String(a.value).localeCompare(String(b.value));
      }
    } else if (sortBy === 'category') {
      comparison = (a.category || '').localeCompare(b.category || '');
    }
    
    return sortDir === 'asc' ? comparison : -comparison;
  });

  // Group by category for display
  const descriptorsByCategory = {};
  filteredDescriptors.forEach(d => {
    const cat = d.category || 'Other';
    if (!descriptorsByCategory[cat]) {
      descriptorsByCategory[cat] = [];
    }
    descriptorsByCategory[cat].push(d);
  });

  return (
    <div className="descriptors-content">
      {filteredDescriptors.length === 0 ? (
        <div className="no-descriptors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="no-descriptors-icon">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>
          <p>No descriptors found matching your search criteria.</p>
        </div>
      ) : (
        <div className="descriptors-by-category">
          {Object.entries(descriptorsByCategory).map(([category, descriptors]) => (
            <div key={category} className="category-section">
              <div className="category-header">
                <div className="category-name">
                  <span className="category-dot"></span>
                  {category}
                  <span className="category-count">({descriptors.length})</span>
                </div>
              </div>
              
              <table className="descriptors-table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Descriptor</th>
                    <th style={{ width: '20%' }}>Value</th>
                    <th style={{ width: '50%' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {descriptors.map((descriptor, index) => (
                    <tr key={index}>
                      <td>
                        <div className="descriptor-name">{descriptor.name}</div>
                        <span className="descriptor-id">{descriptor.id.split('.').pop()}</span>
                      </td>
                      <td>
                        <div className="descriptor-value">{descriptor.value}</div>
                      </td>
                      <td>
                        <div className="descriptor-description">
                          {descriptor.description !== descriptor.id 
                            ? descriptor.description 
                            : "Molecular descriptor from CDK"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DescriptorsDisplay;