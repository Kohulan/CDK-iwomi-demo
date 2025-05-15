import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SampleMolecules from './components/SampleMolecules';
import DescriptorsList from './components/DescriptorsList';
import Header from './components/Header';
import Footer from './components/Footer';
import MoleculeCard from './components/MoleculeCard';
import DescriptorsDisplay from './components/DescriptorsDisplay';
import ParticlesBackground from './components/ParticlesBackground';

// Get backend URL from environment variable or use API proxy for local development
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '/api';

// Descriptor categories for grouping
const DESCRIPTOR_CATEGORIES = {
  "Constitutional": ["AtomCount", "BondCount", "AromBondCount", "RotatableBondsCount", "MolecularWeight", "FractionalCSP3", "HeavyAtomCount", "XLogP"],
  "Topological": ["WienerNumbers", "ZagrebIndex", "TPSADescriptor", "MomentOfInertia", "PetitjeanNumber", "KappaShapeIndices"],
  "Electronic": ["IPMolecularLearning", "AtomHybridizationDescriptor", "ElectronDensity"],
  "Geometrical": ["MomentOfInertia", "WHIM", "CPSA", "GravitationalIndex"],
  "Fragment": ["KierHallSmarts", "MACCSFingerprinter", "SubstructureFingerprinter"], 
  "Quantum": ["QEDWeighted", "ProtonTautomerGenerator"],
  "Others": []
};

// Function to determine descriptor category
const getDescriptorCategory = (descriptor) => {
  const id = descriptor.id.split('.').pop();
  
  for (const [category, descriptors] of Object.entries(DESCRIPTOR_CATEGORIES)) {
    if (descriptors.some(desc => id.includes(desc))) {
      return category;
    }
  }
  return "Others";
};

function App() {
  const [smiles, setSmiles] = useState('');
  const [molecule, setMolecule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiAvailable, setApiAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('molecule');
  const [descriptorSearchTerm, setDescriptorSearchTerm] = useState('');
  const [descriptorCategory, setDescriptorCategory] = useState('All');
  const [descriptorSortBy, setDescriptorSortBy] = useState('name');
  const [descriptorSortDir, setDescriptorSortDir] = useState('asc');

  // Check if API is available on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Try to ping the backend API
        await axios.get(`${API_BASE_URL}/molecules/health`, { timeout: 3000 });
        if (!apiAvailable) {
          console.log('Backend API is now available');
        }
        setApiAvailable(true);
      } catch (err) {
        console.error('API health check failed:', err);
        setApiAvailable(false);
      }
    };
    
    checkApiStatus();
    // Periodically check API availability
    const interval = setInterval(checkApiStatus, 10000);
    return () => clearInterval(interval);
  }, [apiAvailable]);

  // Function to fetch molecule data from API
  const fetchMolecule = async () => {
    if (!smiles.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${API_BASE_URL}/molecules/parse`, { smiles });
      
      // Add category information to each descriptor for better organization
      if (response.data && response.data.descriptors) {
        response.data.descriptors = response.data.descriptors.map(descriptor => ({
          ...descriptor,
          category: getDescriptorCategory(descriptor)
        }));
      }
      
      setMolecule(response.data);
    } catch (err) {
      console.error('Error analyzing molecule:', err);
      setError('Failed to analyze molecule. Please check your SMILES notation and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!smiles.trim()) {
      setError('Please enter a SMILES string');
      return;
    }

    fetchMolecule();
  };

  // Function to handle SMILES input change
  const handleSmilesChange = (e) => {
    setSmiles(e.target.value);
    setError('');
  };
  
  // Function to handle sample molecule selection
  const handleSampleMoleculeSelect = (smilesNotation) => {
    setSmiles(smilesNotation);
    setError('');
    
    // Use setTimeout to ensure the state update happens before fetchMolecule is called
    setTimeout(() => {
      fetchMolecule();
    }, 0);
  };

  // Function to render molecule details
  const renderMoleculeDetails = () => {
    if (!molecule) return null;
    
    return (
      <div className="mt-8">
        <MoleculeCard molecule={molecule} />
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-science-blue mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pastel-purple" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            Molecular Descriptors
          </h3>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-glass p-4">
            <div className="mb-4 flex flex-wrap gap-3">
              {/* Category filter */}
              <div className="relative inline-block">
                <select
                  className="appearance-none block px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue text-sm"
                  value={descriptorCategory}
                  onChange={(e) => setDescriptorCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {Object.keys(DESCRIPTOR_CATEGORIES).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
              </div>
              
              {/* Search input */}
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue text-sm"
                  placeholder="Search descriptors..."
                  value={descriptorSearchTerm}
                  onChange={(e) => setDescriptorSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Sort controls */}
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort:</span>
                <div className="relative inline-block">
                  <select
                    className="appearance-none block px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue text-sm"
                    value={descriptorSortBy}
                    onChange={(e) => setDescriptorSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="value">Value</option>
                    <option value="category">Category</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <button
                  className="ml-2 p-2 rounded-md border border-gray-300 bg-white shadow-sm hover:bg-gray-50"
                  onClick={() => setDescriptorSortDir(prev => prev === 'asc' ? 'desc' : 'asc')}
                >
                  {descriptorSortDir === 'asc' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <DescriptorsDisplay 
              descriptors={molecule.descriptors}
              category={descriptorCategory}
              searchTerm={descriptorSearchTerm}
              sortBy={descriptorSortBy}
              sortDir={descriptorSortDir}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App min-h-screen flex flex-col custom-scrollbar">
      <ParticlesBackground />
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {activeTab === 'molecule' && (
            <>
              <div className="mx-auto max-w-4xl">
                <div className="mb-6 text-center">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-science-blue mb-2">
                    Molecular Structure Analyzer
                  </h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Analyze molecules and calculate chemical descriptors using the Chemistry Development Kit (CDK). Enter a SMILES notation or select a sample molecule below.
                  </p>
                </div>
                
                <SampleMolecules onSelectMolecule={handleSampleMoleculeSelect} />
                
                <div className="rounded-xl bg-white/80 backdrop-blur-sm p-6 shadow-glass">
                  <h2 className="text-xl font-semibold text-science-blue mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pastel-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Enter SMILES Notation
                  </h2>
                  
                  {!apiAvailable && (
                    <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            Backend API is not available. Please ensure the CDK backend service is running.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="smiles" className="block text-sm font-medium text-gray-700 mb-1">
                        SMILES Notation
                      </label>
                      <textarea
                        id="smiles"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue"
                        placeholder="Enter SMILES notation (e.g., CC(=O)OC1=CC=CC=C1C(=O)O for Aspirin)"
                        value={smiles}
                        onChange={handleSmilesChange}
                        disabled={loading || !apiAvailable}
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500">
                        SMILES (Simplified Molecular-Input Line-Entry System) is a specification for describing the structure of chemical molecules.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <button 
                        type="submit" 
                        className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                          loading || !apiAvailable
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-science-gradient text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                        disabled={loading || !apiAvailable}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          'Analyze Molecule'
                        )}
                      </button>
                    </div>
                  </form>
                  
                  {error && (
                    <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="ml-3 text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {renderMoleculeDetails()}
            </>
          )}
          
          {activeTab === 'descriptors' && (
            <DescriptorsList />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
