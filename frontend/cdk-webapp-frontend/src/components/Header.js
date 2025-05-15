import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="w-full py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-science-gradient flex items-center justify-center shadow-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027c.76-1.406 2.746-2.227 4.233-2.227 1.763 0 3.273-.383 4.231-1.431 1.271-.836 1.771-.935 2.398-.835.789.145 1.288 1.252 1.288 2.384 0 1.887-1.454 3.51-4.051 3.51-1.772 0-2.666.096-3.241.531-.645.489-.759 1.442-.685 2.671.036.446.099.944.185 1.347.118.548.2.996.2 1.296 0 .858-.47 1.17-1.588 1.17-.874 0-1.508-.209-1.904-.958-.363-.684-.532-1.558-.55-2.421-.019-.937.113-1.897.237-2.688.097-.619.162-1.286.066-1.657-.1-.386-.279-.764-.693-.984-.284-.152-.739-.212-1.18-.212-.277 0-.54.028-.773.076" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-science-blue">
                MoleculeViz<span className="text-science-purple">.</span>
              </h1>
              <p className="text-xs text-gray-500">Powered by CDK v2.11</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-full shadow-sm">
            <button 
              onClick={() => setActiveTab('molecule')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'molecule' 
                  ? 'bg-science-gradient text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Analyze
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('descriptors')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'descriptors' 
                  ? 'bg-science-gradient text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Descriptors
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
