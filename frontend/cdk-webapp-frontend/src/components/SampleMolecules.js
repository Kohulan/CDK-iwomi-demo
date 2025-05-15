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
  
  // Group molecules by category
  const moleculesByCategory = {};
  sampleMolecules.forEach(mol => {
    if (!moleculesByCategory[mol.category]) {
      moleculesByCategory[mol.category] = [];
    }
    moleculesByCategory[mol.category].push(mol);
  });

  return (
    <div className="sample-molecules mb-6 rounded-xl bg-white/80 backdrop-blur-sm p-4 shadow-glass">
      <h3 className="text-lg font-semibold text-science-blue mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pastel-purple" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        Sample Molecules
      </h3>
      
      <div className="space-y-4">
        {Object.entries(moleculesByCategory).map(([category, molecules]) => (
          <div key={category} className="mb-4">
            <div className="text-sm font-medium text-gray-500 mb-2">{category}:</div>
            <div className="flex flex-wrap gap-2">
              {molecules.map((mol, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredMolecule(mol)}
                  onMouseLeave={() => setHoveredMolecule(null)}
                >
                  <button
                    onClick={() => onSelectMolecule(mol.smiles)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 
                      ${hoveredMolecule === mol 
                        ? 'bg-science-gradient text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {mol.name}
                  </button>
                  
                  {hoveredMolecule === mol && (
                    <div className="absolute z-10 w-60 bg-white rounded-lg shadow-xl p-3 text-left top-full mt-1 left-0 border border-gray-100 animate-appear">
                      <div className="text-sm font-semibold text-science-blue">{mol.name}</div>
                      <div className="text-xs font-mono text-gray-500 mt-1">{mol.smiles}</div>
                      <div className="text-xs text-gray-600 mt-2">{mol.description}</div>
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