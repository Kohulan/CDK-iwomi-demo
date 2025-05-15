import React from 'react';

const HeroSection = ({ onAnalyzeClick }) => {
  return (
    <div className="hero-section animate-fade-in">
      <div className="hero-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 1 5.337 15c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25S8.336 11.25 7.3 11.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401a.656.656 0 0 1-.659-.663 47.703 47.703 0 0 1 .333-4.684.75.75 0 0 1 .728-.627c1.945-.08 3.901-.277 5.85-.584.31-.048.562.269.562.578Z" />
        </svg>
      </div>
      
      <h1 className="hero-title">Molecular Structure Analyzer</h1>
      
      <p className="hero-description">
        Analyze chemical structures, visualize molecules in 2D/3D, and explore molecular properties using the Chemistry Development Kit (CDK).
      </p>
      
      <div className="hero-features">
        <div className="feature-card animate-fade-in-delayed">
          <h3>Molecule Visualization</h3>
          <p>View chemical structures in both 2D and 3D representations with multiple visualization styles.</p>
        </div>
        
        <div className="feature-card animate-fade-in-delayed">
          <h3>Property Calculation</h3>
          <p>Calculate over 40 molecular descriptors including physical properties, topological indices, and more.</p>
        </div>
        
        <div className="feature-card animate-fade-in-delayed">
          <h3>Structure Analysis</h3>
          <p>Convert between SMILES notation and other formats like MDL Molfiles for use in other chemical software.</p>
        </div>
      </div>
      
      <div className="hero-cta">
        <button
          onClick={onAnalyzeClick}
          className="btn-cta"
        >
          Start Analyzing Molecules
        </button>
        <p className="footer-text text-center" style={{ marginTop: '10px' }}>Powered by Chemistry Development Kit (CDK) v2.11</p>
      </div>
    </div>
  );
};

export default HeroSection;