import React, { useState } from 'react';

/**
 * Simplified MoleculeCard with minimal styling to prevent conflicts
 */
const MoleculeCard = ({ molecule }) => {
  const [hovered, setHovered] = useState(false);
  
  if (!molecule) return null;
  
  // Extract key properties for quick display
  const quickProperties = molecule.descriptors
    .filter(d => ['AtomCount', 'BondCount', 'MolecularWeight', 'XLogP'].some(term => d.id.includes(term)))
    .slice(0, 4);

  return (
    <div 
      className="rounded-xl bg-white shadow-sm p-6 mb-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: '12px', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      {/* Molecule ID Badge */}
      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
        <div style={{ 
          padding: '4px 8px', 
          borderRadius: '9999px', 
          backgroundColor: 'rgba(163, 217, 255, 0.1)', 
          fontSize: '0.75rem',
          color: '#0061ab'
        }}>
          ID: {molecule.id.substring(0, 8)}...
        </div>
      </div>
      
      <div style={{ padding: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Molecule Image */}
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: hovered ? '0 8px 16px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              <img 
                src={`data:image/png;base64,${molecule.imageBase64}`} 
                alt="Molecule structure" 
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                  transition: 'transform 0.3s ease',
                  transform: hovered ? 'scale(1.02)' : 'scale(1)'
                }}
              />
            </div>
          </div>
          
          {/* Molecule Details */}
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: '#0061ab', 
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '8px' }}>Molecular Structure</span>
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'rgb(107, 114, 128)',
                display: 'flex',
                alignItems: 'center'
              }}>
                SMILES: <span style={{ fontFamily: 'monospace', marginLeft: '4px' }}>{molecule.smiles}</span>
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '16px' 
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>
                Quick Properties
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {quickProperties.map((descriptor, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgb(107, 114, 128)' }}>{descriptor.name}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: '500' }}>{descriptor.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* MOLFILE Preview */}
            <div style={{ opacity: hovered ? '1' : '0.7', transition: 'opacity 0.3s ease' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>
                MOLFILE Structure Format
              </h3>
              <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
                <pre style={{ 
                  fontSize: '0.75rem', 
                  padding: '12px', 
                  color: '#d1d5db',
                  maxHeight: '96px', 
                  overflowY: 'auto',
                  margin: 0
                }}>
                  {molecule.molfile}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoleculeCard;