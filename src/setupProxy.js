require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const backend = process.env.BACKEND;
module.exports = function(app) {
  // Proxy for /local
  app.use(
    '/local', // Match any route that starts with /local
    createProxyMiddleware({
      target: `http://${backend}:3001`, // The target server
      changeOrigin: true,
      pathRewrite: (path, req) => {
        // Remove the /local prefix and return the rest of the path
        return path.replace(/^\/local/, '');
      },
    })
  );

  // Proxy for /metalApi
  app.use(
    '/metalApi', // Match any route that starts with /metalApi
    createProxyMiddleware({
      target: 'https://metal-api.dev', // The target server
      changeOrigin: true,
      pathRewrite: (path, req) => {
        // Remove the /metalApi prefix and return the rest of the path
        return path.replace(/^\/metalApi/, '');
      },
    })
  );
};

