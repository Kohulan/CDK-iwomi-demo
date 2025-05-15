import React from 'react';

const MoleculeCard = ({ molecule }) => {
  if (!molecule) return null;
  
  // Extract key properties for quick display
  const quickProperties = molecule.descriptors
    .filter(d => ['AtomCount', 'BondCount', 'MolecularWeight', 'XLogP'].some(term => d.id.includes(term)))
    .slice(0, 4);

  return (
    <div className="molecule-card">
      <div className="molecule-header">
        <h3 className="molecule-title">Molecular Structure</h3>
        <span className="molecule-badge">ID: {molecule.id.substring(0, 8)}...</span>
      </div>
      
      <div className="molecule-content">
        <div className="molecule-main">
          <div className="molecule-image-container">
            <img
              src={`data:image/png;base64,${molecule.imageBase64}`}
              alt="Molecule structure"
              className="molecule-image"
            />
          </div>
          
          <div className="molecule-details">
            <div className="detail-section">
              <div className="detail-section-title">SMILES Notation</div>
              <div className="smiles-display">{molecule.smiles}</div>
            </div>
            
            <div className="detail-section">
              <div className="detail-section-title">Quick Properties</div>
              <div className="quick-props">
                {quickProperties.map((descriptor, idx) => (
                  <div key={idx} className="quick-prop">
                    <div className="quick-prop-label">{descriptor.name}</div>
                    <div className="quick-prop-value">{descriptor.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="molfile-container">
          <div className="molfile-title">MDL Molfile</div>
          <pre className="molfile-display">{molecule.molfile}</pre>
        </div>
      </div>
    </div>
  );
};

export default MoleculeCard;