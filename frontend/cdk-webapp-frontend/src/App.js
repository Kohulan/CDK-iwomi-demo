import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SampleMolecules from './components/SampleMolecules';
import DescriptorsList from './components/DescriptorsList';
import Header from './components/Header';
import Footer from './components/Footer';
import MoleculeCard from './components/MoleculeCard';
import DescriptorsDisplay from './components/DescriptorsDisplay';
import HeroSection from './components/HeroSection';
import Molecule3DViewer from './components/Molecule3DViewer';

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
  const [showInputSection, setShowInputSection] = useState(false);

  // Check if API is available on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Try to ping the backend API
        await axios.get(`${API_BASE_URL}/molecules/health`, { timeout: 3000 });
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
  }, []);

  // Handle scroll to input section when hero CTA is clicked
  const handleAnalyzeClick = () => {
    setShowInputSection(true);
    // Use setTimeout to ensure the state update has happened
    setTimeout(() => {
      const inputSection = document.querySelector('.molecule-input-section');
      if (inputSection) {
        inputSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Function to fetch molecule data from API
  const fetchMolecule = async (smilesInput) => {
    const smilesString = smilesInput || smiles;
    if (!smilesString.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${API_BASE_URL}/molecules/parse`, { smiles: smilesString });
      
      // Add category information to each descriptor for better organization
      if (response.data && response.data.descriptors) {
        response.data.descriptors = response.data.descriptors.map(descriptor => ({
          ...descriptor,
          category: getDescriptorCategory(descriptor)
        }));
      }
      
      setMolecule(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error analyzing molecule:', err);
      setError('Failed to analyze molecule. Please check your SMILES notation and try again.');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
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
    fetchMolecule(smilesNotation);
  };

  return (
    <div className="app-container">
      {/* Background elements */}
      <div className="bg-gradient"></div>
      <div className="bg-pattern"></div>
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'molecule' && (
          <div className="molecule-tab-content">
            {!molecule && !showInputSection ? (
              <HeroSection onAnalyzeClick={handleAnalyzeClick} />
            ) : (
              <>
                <div className="page-header animate-fade-in">
                  <h1>Molecular Structure Analyzer</h1>
                  <p>Analyze molecules and calculate chemical descriptors using the Chemistry Development Kit (CDK)</p>
                </div>
                
                <div className="molecule-input-section animate-fade-in-up">
                  <SampleMolecules onSelectMolecule={handleSampleMoleculeSelect} />
                  
                  <div className="smiles-input-card">
                    <div className="card-header">
                      <div className="card-header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                          <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                        </svg>
                      </div>
                      <h2>Enter SMILES Notation</h2>
                    </div>
                    
                    {!apiAvailable && (
                      <div className="api-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                          <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                        </svg>
                        <p>Backend API is not available. Please ensure the CDK backend service is running.</p>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="smiles-form">
                      <div className="form-group">
                        <label htmlFor="smiles">SMILES Notation</label>
                        <textarea
                          id="smiles"
                          rows={3}
                          className="form-control"
                          placeholder="Enter SMILES notation (e.g., CC(=O)OC1=CC=CC=C1C(=O)O for Aspirin)"
                          value={smiles}
                          onChange={handleSmilesChange}
                          disabled={loading || !apiAvailable}
                        ></textarea>
                        <p className="form-hint">
                          SMILES (Simplified Molecular-Input Line-Entry System) is a specification for describing the structure of chemical molecules.
                        </p>
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          type="submit" 
                          className={`btn btn-primary ${loading || !apiAvailable ? 'btn-disabled' : ''}`}
                          disabled={loading || !apiAvailable}
                        >
                          {loading ? (
                            <>
                              <span className="loading-spinner"></span>
                              <span>Processing...</span>
                            </>
                          ) : (
                            'Analyze Molecule'
                          )}
                        </button>
                      </div>
                    </form>
                    
                    {error && (
                      <div className="error-message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                        <p>{error}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {molecule && (
                  <div className="molecule-results animate-fade-in-up">
                    <MoleculeCard molecule={molecule} />
                    
                    <Molecule3DViewer 
                      molfile={molecule.molfile} 
                      smiles={molecule.smiles} 
                    />
                    
                    <div className="molecular-descriptors">
                      <div className="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                          <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                        </svg>
                        <h3>Molecular Descriptors</h3>
                      </div>
                      
                      <div className="descriptors-filter">
                        <div className="filter-group">
                          <label>Category:</label>
                          <select
                            value={descriptorCategory}
                            onChange={(e) => setDescriptorCategory(e.target.value)}
                            className="select-control"
                          >
                            <option value="All">All Categories</option>
                            {Object.keys(DESCRIPTOR_CATEGORIES).map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="filter-group search-group">
                          <input
                            type="text"
                            className="search-control"
                            placeholder="Search descriptors..."
                            value={descriptorSearchTerm}
                            onChange={(e) => setDescriptorSearchTerm(e.target.value)}
                          />
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="search-icon">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        
                        <div className="filter-group">
                          <label>Sort by:</label>
                          <select
                            value={descriptorSortBy}
                            onChange={(e) => setDescriptorSortBy(e.target.value)}
                            className="select-control"
                          >
                            <option value="name">Name</option>
                            <option value="value">Value</option>
                            <option value="category">Category</option>
                          </select>
                          
                          <button
                            className="sort-direction-btn"
                            onClick={() => setDescriptorSortDir(prev => prev === 'asc' ? 'desc' : 'asc')}
                            title={descriptorSortDir === 'asc' ? 'Ascending' : 'Descending'}
                          >
                            {descriptorSortDir === 'asc' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                                <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
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
                )}
              </>
            )}
          </div>
        )}
        
        {activeTab === 'descriptors' && (
          <div className="descriptors-tab-content animate-fade-in">
            <DescriptorsList />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;