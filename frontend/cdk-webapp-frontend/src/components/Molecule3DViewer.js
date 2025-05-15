import React from 'react';

/**
 * A simplified placeholder for the 3D Molecule Viewer
 * Uses only inline styles to prevent CSS conflicts
 */
const Molecule3DViewer = ({ molfile, smiles }) => {
  return (
    <div style={{
      marginTop: '24px',
      marginBottom: '32px',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        padding: '16px',
        background: 'linear-gradient(135deg, #0061ab 0%, #6e4de1 100%)',
        color: 'white'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '500',
          margin: '0',
          display: 'flex',
          alignItems: 'center'
        }}>
          3D Molecular Structure Viewer
        </h3>
      </div>
      
      <div style={{
        padding: '24px',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#4b5563',
          marginBottom: '16px'
        }}>
          The 3D viewer feature is currently loading or unavailable.
        </p>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          display: 'inline-block',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          color: '#374151'
        }}>
          SMILES: {smiles}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px',
          gap: '8px'
        }}>
          <button style={{
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '9999px',
            padding: '8px 16px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            Stick
          </button>
          <button style={{
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '9999px',
            padding: '8px 16px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            Ball & Stick
          </button>
          <button style={{
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '9999px',
            padding: '8px 16px',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            Surface
          </button>
        </div>
      </div>
    </div>
  );
};

export default Molecule3DViewer;