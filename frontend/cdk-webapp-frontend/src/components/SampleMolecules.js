import React, { useState } from 'react';

const sampleMolecules = [
  // Common medications
  {
    name: 'Aspirin',
    smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
    category: 'Common Drugs',
    description: 'Pain reliever and anti-inflammatory'
  },
  {
    name: 'Caffeine',
    smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
    category: 'Common Drugs',
    description: 'Stimulant found in coffee and tea'
  },
  {
    name: 'Ibuprofen',
    smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
    category: 'Common Drugs',
    description: 'Non-steroidal anti-inflammatory drug'
  },
  {
    name: 'Paracetamol',
    smiles: 'CC(=O)NC1=CC=C(C=C1)O',
    category: 'Common Drugs',
    description: 'Pain and fever reducer'
  },
  
  // Complex structures - good for testing descriptors
  {
    name: 'Taxol',
    smiles: 'CC(=O)O[C@@H]1C(=O)[C@H]2[C@@H]3C(=O)[C@H](OC(=O)C)[C@@]4(CO[C@@H]4C[C@@H]3[C@@]2(C)C=C1C)OC(=O)c1ccccc1',
    category: 'Complex',
    description: 'Anticancer drug with complex ring structure'
  },
  {
    name: 'Cholesterol',
    smiles: 'CC(C)CCCC(C)C1CCC2C3CC=C4CC(O)CCC4(C)C3CCC12C',
    category: 'Complex',
    description: 'Sterol lipid with multiple rings'
  },
  
  // Aromatic compounds
  {
    name: 'Benzene',
    smiles: 'c1ccccc1',
    category: 'Aromatic',
    description: 'Simple aromatic ring'
  },
  {
    name: 'Naphthalene',
    smiles: 'c1ccc2ccccc2c1',
    category: 'Aromatic',
    description: 'Fused aromatic rings'
  },
  
  // Heterocyclic compounds
  {
    name: 'Pyridine',
    smiles: 'c1ccncc1',
    category: 'Heterocyclic',
    description: 'Six-membered ring with nitrogen'
  },
  {
    name: 'Imidazole',
    smiles: 'c1cnc[nH]1',
    category: 'Heterocyclic',
    description: 'Five-membered ring with two nitrogens'
  }
];

function SampleMolecules({ onSelectMolecule }) {
  const [hoveredMolecule, setHoveredMolecule] = useState(null);
  const [selectedMolecule, setSelectedMolecule] = useState(null);
  
  // Group molecules by category
  const moleculesByCategory = {};
  sampleMolecules.forEach(mol => {
    if (!moleculesByCategory[mol.category]) {
      moleculesByCategory[mol.category] = [];
    }
    moleculesByCategory[mol.category].push(mol);
  });
  
  const handleSelect = (molecule) => {
    setSelectedMolecule(molecule);
    onSelectMolecule(molecule.smiles);
  };

  return (
    <div className="sample-molecules">
      <div className="card-header">
        <div className="card-header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 1 5.337 15c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25S8.336 11.25 7.3 11.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401a.656.656 0 0 1-.659-.663 47.703 47.703 0 0 1 .333-4.684.75.75 0 0 1 .728-.627c1.945-.08 3.901-.277 5.85-.584.31-.048.562.269.562.578Z" />
          </svg>
        </div>
        <h2>Sample Molecules</h2>
      </div>
      
      <div style={{ padding: '16px' }}>
        <p className="form-hint" style={{ marginBottom: '16px' }}>
          Select a sample molecule to quickly analyze its structure and properties.
        </p>
        
        {Object.entries(moleculesByCategory).map(([category, molecules]) => (
          <div key={category} className="sample-category">
            <div className="sample-category-title">{category}:</div>
            <div className="sample-molecules-grid">
              {molecules.map((molecule, index) => (
                <div 
                  key={index}
                  className="molecule-chip"
                  onMouseEnter={() => setHoveredMolecule(molecule)}
                  onMouseLeave={() => setHoveredMolecule(null)}
                >
                  <button
                    onClick={() => handleSelect(molecule)}
                    className={`molecule-chip-btn ${selectedMolecule === molecule ? 'active' : ''}`}
                  >
                    {molecule.name}
                  </button>
                  
                  {hoveredMolecule === molecule && (
                    <div className="molecule-tooltip">
                      <div className="tooltip-title">{molecule.name}</div>
                      <div className="tooltip-smiles">{molecule.smiles}</div>
                      <div className="tooltip-description">{molecule.description}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SampleMolecules;