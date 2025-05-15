import React from 'react';

/**
 * Simplified Hero Section with inline styles to prevent CSS conflicts
 */
const HeroSection = ({ onAnalyzeClick }) => {
  return (
    <div style={{
      marginBottom: '48px',
      padding: '32px 16px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '9999px',
          marginBottom: '16px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0061ab 0%, #6e4de1 100%)',
            padding: '12px',
            borderRadius: '9999px',
            color: 'white'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
          </div>
        </div>
        
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: '700',
          color: '#0061ab',
          marginBottom: '16px'
        }}>
          Molecular Structure Analyzer
        </h1>
        
        <p style={{
          fontSize: '1.125rem',
          color: '#4b5563',
          maxWidth: '42rem',
          margin: '0 auto 32px auto'
        }}>
          Analyze chemical structures, visualize molecules in 2D/3D, and explore molecular properties using the Chemistry Development Kit (CDK).
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '100%',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#0061ab',
              marginBottom: '8px'
            }}>
              Molecule Visualization
            </h3>
            <p style={{
              color: '#4b5563'
            }}>
              View chemical structures in both 2D and 3D representations with multiple visualization styles.
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '100%',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#0061ab',
              marginBottom: '8px'
            }}>
              Property Calculation
            </h3>
            <p style={{
              color: '#4b5563'
            }}>
              Calculate over 40 molecular descriptors including physical properties, topological indices, and more.
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '100%',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#0061ab',
              marginBottom: '8px'
            }}>
              Structure Analysis
            </h3>
            <p style={{
              color: '#4b5563'
            }}>
              Convert between SMILES notation and other formats like MDL Molfiles for use in other chemical software.
            </p>
          </div>
        </div>
        
        <button 
          onClick={onAnalyzeClick}
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #0061ab 0%, #6e4de1 100%)',
            color: 'white',
            fontWeight: '500',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 12px rgba(110, 77, 225, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Start Analyzing Molecules
        </button>
        
        <p style={{
          marginTop: '16px',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          Powered by Chemistry Development Kit (CDK) v2.11
        </p>
      </div>
    </div>
  );
};

export default HeroSection;