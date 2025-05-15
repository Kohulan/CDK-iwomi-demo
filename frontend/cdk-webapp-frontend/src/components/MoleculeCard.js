import React, { useState } from 'react';

const MoleculeCard = ({ molecule }) => {
  const [hovered, setHovered] = useState(false);
  
  if (!molecule) return null;
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 
        ${hovered 
          ? 'shadow-glass-strong scale-[1.01] border border-pastel-blue/30' 
          : 'shadow-glass border border-transparent'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 right-0 p-3">
        <div className="px-2 py-1 rounded-full bg-pastel-blue/10 text-xs font-medium text-science-blue">
          ID: {molecule.id.substring(0, 8)}...
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Molecule Image */}
          <div className="w-full md:w-2/5 flex items-center justify-center">
            <div className={`rounded-lg overflow-hidden transition-all duration-300 ${hovered ? 'shadow-md animate-float' : ''}`}>
              <img 
                src={`data:image/png;base64,${molecule.imageBase64}`} 
                alt="Molecule structure" 
                className="molecule-structure-image w-full object-contain"
              />
            </div>
          </div>
          
          {/* Molecule Details */}
          <div className="w-full md:w-3/5">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-science-blue mb-1">Molecular Structure</h2>
              <p className="text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                </svg>
                SMILES: {molecule.smiles}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Properties</h3>
              <div className="grid grid-cols-2 gap-3">
                {molecule.descriptors
                  .filter(d => ['AtomCount', 'BondCount', 'MolecularWeight', 'XLogP'].some(term => d.id.includes(term)))
                  .slice(0, 4)
                  .map((descriptor, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xs text-gray-500">{descriptor.name}</span>
                      <span className="font-mono text-sm font-medium">{descriptor.value}</span>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-70'}`}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">MOLFILE Structure Format</h3>
              <div className="bg-gray-800 rounded-md overflow-hidden">
                <pre className="text-xs p-3 text-gray-300 max-h-24 overflow-y-auto custom-scrollbar">
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
