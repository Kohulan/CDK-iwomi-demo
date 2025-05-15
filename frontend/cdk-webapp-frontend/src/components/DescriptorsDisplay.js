import React from 'react';

const DescriptorsDisplay = ({ descriptors, category, searchTerm, sortBy, sortDir }) => {
  if (!descriptors || descriptors.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
    <div className="space-y-6">
      {Object.entries(descriptorsByCategory).map(([category, descriptors]) => (
        <div key={category} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-glass p-4 transition-all hover:shadow-glass-strong">
          <h3 className="text-lg font-semibold text-science-blue mb-3 flex items-center">
            <span className="w-3 h-3 rounded-full bg-pastel-purple mr-2"></span>
            {category}
            <span className="ml-2 text-xs font-normal text-gray-500">({descriptors.length})</span>
          </h3>
          
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descriptor
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {descriptors.map((descriptor, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">
                      <div className="text-sm font-medium text-gray-900">{descriptor.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{descriptor.id.split('.').pop()}</div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="text-sm font-mono font-medium">
                        {descriptor.value}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 hidden md:table-cell">
                      {descriptor.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      
      {filteredDescriptors.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>No descriptors found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DescriptorsDisplay;
