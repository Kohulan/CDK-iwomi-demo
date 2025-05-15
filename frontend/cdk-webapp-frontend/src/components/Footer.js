import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 py-8 bg-white/30 backdrop-blur-sm border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-science-blue mb-4">Chemistry Development Kit</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              An open-source Java library for cheminformatics and bioinformatics providing algorithms for chemical structure manipulation, analysis, and visualization.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-science-blue mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://cdk.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-science-purple transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  CDK Official Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/cdk/cdk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-science-purple transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://www.sciencedirect.com/science/article/abs/pii/S1361836916300512" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-science-purple transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  CDK Research Paper
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-science-blue mb-4">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              This web application demonstrates the capabilities of the Chemistry Development Kit for molecular visualization and descriptor calculation.
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} | MoleculeViz by IWOMI Demo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
