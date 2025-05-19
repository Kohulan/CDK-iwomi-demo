const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Get the backend URL from environment variables or use the default for local development
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
  
  console.log('Proxy setup - Using backend URL:', backendUrl);
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: backendUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // no rewrite needed
      },
      onError: (err, req, res) => {
        console.log('Proxy error:', err);
        res.writeHead(502, {
          'Content-Type': 'text/plain',
        });
        res.end('Backend service is not available. Please start the backend server.');
      },
    })
  );
};