const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/local', // Match any route that starts with /local
    createProxyMiddleware({
      target: 'http://localhost:3001', // The target server
      changeOrigin: true,
      pathRewrite: (path, req) => {
        // Remove the /local prefix and return the rest of the path
        return path.replace(/^\/local/, '');
      },
    })
  );
};
